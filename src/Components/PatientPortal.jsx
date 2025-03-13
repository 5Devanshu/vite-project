import React, { useState } from 'react';
const PatientPortal = () => {
  // Mock data for claims
  const [claims, setClaims] = useState([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      claimAmount: 1250.00,
      description: 'Hospital visit for flu symptoms and prescribed medication.',
      status: 'Approved',
      submissionDate: '2025-02-15',
      approvedAmount: 1000.00,
      insurerComments: 'Approved with partial coverage due to policy limits.',
      document: 'hospital_receipt.pdf'
    },
    {
      id: '2',
      name: 'John Doe',
      email: 'john@example.com',
      claimAmount: 450.00,
      description: 'Dental checkup and cavity filling.',
      status: 'Pending',
      submissionDate: '2025-03-01',
      approvedAmount: null,
      insurerComments: null,
      document: 'dental_receipt.pdf'
    },
    {
      id: '3',
      name: 'John Doe',
      email: 'john@example.com',
      claimAmount: 800.00,
      description: 'Eye examination and new prescription glasses.',
      status: 'Rejected',
      submissionDate: '2025-01-20',
      approvedAmount: 0,
      insurerComments: 'Not covered under current policy.',
      document: 'vision_receipt.pdf'
    }
  ]);

  // State for new claim form
  const [newClaim, setNewClaim] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    claimAmount: '',
    description: '',
    document: null
  });

  // State for file upload
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');

  // State for claim filters
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedClaimId, setSelectedClaimId] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClaim({
      ...newClaim,
      [name]: value
    });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  // Submit new claim
  const handleSubmitClaim = (e) => {
    e.preventDefault();
    
    // Create new claim object
    const claim = {
      id: (claims.length + 1).toString(),
      ...newClaim,
      claimAmount: parseFloat(newClaim.claimAmount),
      status: 'Pending',
      submissionDate: new Date().toISOString().split('T')[0],
      approvedAmount: null,
      insurerComments: null,
      document: fileName || 'No document'
    };
    
    // Add to claims list
    setClaims([...claims, claim]);
    
    // Reset form
    setNewClaim({
      name: 'John Doe',
      email: 'john@example.com',
      claimAmount: '',
      description: '',
      document: null
    });
    setSelectedFile(null);
    setFileName('');
    
    // Show success message (could use a toast notification here)
    alert('Claim submitted successfully!');
  };

  // Get status badge component based on status
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" /> Approved</Badge>;
      case 'Rejected':
        return <Badge className="bg-red-500"><XCircle className="w-3 h-3 mr-1" /> Rejected</Badge>;
      case 'Pending':
      default:
        return <Badge className="bg-yellow-500"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
    }
  };

  // Filter claims based on selected status
  const filteredClaims = statusFilter === 'All' 
    ? claims 
    : claims.filter(claim => claim.status === statusFilter);

  // Get claim details for selected claim
  const selectedClaim = claims.find(claim => claim.id === selectedClaimId);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Patient Portal</h1>
          <p className="text-gray-600">Submit and manage your healthcare claims</p>
        </header>

        <Tabs defaultValue="claims" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="claims">My Claims</TabsTrigger>
            <TabsTrigger value="submit">Submit New Claim</TabsTrigger>
          </TabsList>
          
          {/* Claims Dashboard Tab */}
          <TabsContent value="claims">
            <Card>
              <CardHeader>
                <CardTitle>My Claims</CardTitle>
                <CardDescription>View and track all your submitted claims</CardDescription>
                
                <div className="flex items-center space-x-4 mt-4">
                  <Label htmlFor="statusFilter" className="flex items-center">
                    <Filter className="w-4 h-4 mr-2" />
                    Status:
                  </Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>

              <CardContent>
                {filteredClaims.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Document</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredClaims.map((claim) => (
                        <TableRow key={claim.id}>
                          <TableCell className="font-medium">{claim.submissionDate}</TableCell>
                          <TableCell>${claim.claimAmount.toFixed(2)}</TableCell>
                          <TableCell>{getStatusBadge(claim.status)}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" className="flex items-center">
                              <FileText className="w-4 h-4 mr-1" />
                              {claim.document}
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setSelectedClaimId(claim.id)}
                                >
                                  View Details
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                  <DialogTitle>Claim Details</DialogTitle>
                                  <DialogDescription>
                                    Submitted on {claim.submissionDate}
                                  </DialogDescription>
                                </DialogHeader>
                                {selectedClaim && (
                                  <div className="space-y-4 mt-2">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label>Status</Label>
                                        <div className="mt-1">{getStatusBadge(selectedClaim.status)}</div>
                                      </div>
                                      <div>
                                        <Label>Claim Amount</Label>
                                        <div className="mt-1 font-semibold">${selectedClaim.claimAmount.toFixed(2)}</div>
                                      </div>
                                    </div>
                                    
                                    {selectedClaim.status === 'Approved' && (
                                      <div>
                                        <Label>Approved Amount</Label>
                                        <div className="mt-1 font-semibold text-green-600">
                                          ${selectedClaim.approvedAmount.toFixed(2)}
                                        </div>
                                      </div>
                                    )}
                                    
                                    <div>
                                      <Label>Description</Label>
                                      <div className="mt-1 text-gray-700">{selectedClaim.description}</div>
                                    </div>
                                    
                                    {selectedClaim.insurerComments && (
                                      <div>
                                        <Label>Insurer Comments</Label>
                                        <div className="mt-1 text-gray-700 p-2 bg-gray-50 rounded border">
                                          {selectedClaim.insurerComments}
                                        </div>
                                      </div>
                                    )}
                                    
                                    <div>
                                      <Label>Uploaded Document</Label>
                                      <Button variant="outline" className="mt-1 w-full flex items-center justify-center" size="sm">
                                        <FileText className="w-4 h-4 mr-2" />
                                        Download {selectedClaim.document}
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No claims found with the selected filter.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Submit New Claim Tab */}
          <TabsContent value="submit">
            <Card>
              <CardHeader>
                <CardTitle>Submit a New Claim</CardTitle>
                <CardDescription>Fill out the form below to submit a new healthcare claim</CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmitClaim} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={newClaim.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={newClaim.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="claimAmount" className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Claim Amount
                    </Label>
                    <Input
                      id="claimAmount"
                      name="claimAmount"
                      type="number"
                      step="0.01"
                      min="0"
                      value={newClaim.claimAmount}
                      onChange={handleInputChange}
                      placeholder="Enter claim amount"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description" className="flex items-center">
                      <FileText className="w-4 h-4 mr-2" />
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={newClaim.description}
                      onChange={handleInputChange}
                      placeholder="Describe the healthcare service or treatment"
                      rows={4}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="document" className="flex items-center">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Receipt or Prescription
                    </Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                      <input
                        id="document"
                        name="document"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                      <label htmlFor="document" className="cursor-pointer">
                        <FileUp className="w-8 h-8 mx-auto text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">
                          {fileName ? fileName : 'Click to upload or drag and drop'}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          PDF, JPG, or PNG (Max 5MB)
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="mt-4"
                          onClick={() => document.getElementById('document').click()}
                        >
                          Select File
                        </Button>
                      </label>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Button type="submit" className="w-full md:w-auto">
                      Submit Claim
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientPortal;