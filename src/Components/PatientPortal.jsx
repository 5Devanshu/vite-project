import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Filter, 
  FileText, 
  User, 
  Mail, 
  DollarSign, 
  Upload, 
  FileUp,
  LogOut
} from 'lucide-react';

// Import the UI components that were missing
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  Button,
  Input,
  Label,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Badge,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui';

// Login Form Component
const LoginForm = ({ onLogin, onSwitchToRegister, loginError }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onLogin(credentials.email, credentials.password);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login to Patient Portal</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      
      <CardContent>
        {loginError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {loginError}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="pt-2">
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button 
                type="button" 
                className="text-blue-600 hover:underline"
                onClick={onSwitchToRegister}
              >
                Register here
              </button>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

// Registration Form Component
const RegisterForm = ({ onRegister, onSwitchToLogin, registerError }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
    
    // Clear password error when user types
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (userData.password !== userData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    // Register user
    await onRegister(userData.name, userData.email, userData.password);
    
    // Switch to login after successful registration
    onSwitchToLogin();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register for Patient Portal</CardTitle>
        <CardDescription>Create an account to submit and track claims</CardDescription>
      </CardHeader>
      
      <CardContent>
        {registerError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {registerError}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              Full Name
            </Label>
            <Input
              id="name"
              name="name"
              value={userData.name}
              onChange={handleChange}
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
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={userData.confirmPassword}
              onChange={handleChange}
              required
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>
          
          <div className="pt-2">
            <Button type="submit" className="w-full">
              Register
            </Button>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button 
                type="button" 
                className="text-blue-600 hover:underline"
                onClick={onSwitchToLogin}
              >
                Login here
              </button>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

const PatientPortal = ({ 
  claims = [],
  isLoading = false,
  error = null,
  isAuthenticated = false,
  user = null,
  onSubmitClaim,
  onLogin,
  onRegister,
  onLogout,
  refreshClaims
}) => {
  // UI states
  const [authView, setAuthView] = useState('login'); // 'login' or 'register'
  const [newClaim, setNewClaim] = useState({
    name: user?.name || '',
    email: user?.email || '',
    claimAmount: '',
    description: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedClaimId, setSelectedClaimId] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Update form data when user changes
  useEffect(() => {
    if (user) {
      setNewClaim(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClaim(prev => ({ ...prev, [name]: value }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  // Submit new claim
  const handleSubmitClaim = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);
    
    try {
      const success = await onSubmitClaim(newClaim, selectedFile);
      
      if (success) {
        // Reset form
        setNewClaim({
          name: user?.name || '',
          email: user?.email || '',
          claimAmount: '',
          description: '',
        });
        setSelectedFile(null);
        setFileName('');
        setSubmitSuccess(true);
      }
    } catch (err) {
      setSubmitError('Failed to submit claim. Please try again.');
    }
  };

  // Get status badge component based on status
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" /> Approved</Badge>;
      case 'Rejected':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" /> Rejected</Badge>;
      case 'Pending':
      default:
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
    }
  };

  // Filter claims based on selected status
  const filteredClaims = statusFilter === 'All' 
    ? claims 
    : claims.filter(claim => claim.status === statusFilter);

  // Get claim details for selected claim
  const selectedClaim = claims.find(claim => claim.id === selectedClaimId);

  // If not authenticated, show login/register forms
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-md mx-auto pt-10">
          <header className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Patient Portal</h1>
            <p className="text-gray-600">Submit and manage your healthcare claims</p>
          </header>
          
          {authView === 'login' ? (
            <LoginForm 
              onLogin={onLogin} 
              onSwitchToRegister={() => setAuthView('register')}
              loginError={error}
            />
          ) : (
            <RegisterForm 
              onRegister={onRegister} 
              onSwitchToLogin={() => setAuthView('login')}
              registerError={error}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Patient Portal</h1>
            <p className="text-gray-600">Submit and manage your healthcare claims</p>
          </div>
          <div className="flex items-center">
            <span className="mr-4">Welcome, {user?.name || 'User'}</span>
            <Button variant="outline" size="sm" onClick={onLogout} className="flex items-center">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </header>

        {error && !submitError && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
            <button 
              className="float-right font-bold"
              onClick={() => refreshClaims()}
            >
              Retry
            </button>
          </div>
        )}

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
                {isLoading ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Loading claims...</p>
                  </div>
                ) : filteredClaims.length > 0 ? (
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
                          <TableCell>${parseFloat(claim.claimAmount).toFixed(2)}</TableCell>
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
                                        <div className="mt-1 font-semibold">${parseFloat(selectedClaim.claimAmount).toFixed(2)}</div>
                                      </div>
                                    </div>
                                    
                                    {selectedClaim.status === 'Approved' && (
                                      <div>
                                        <Label>Approved Amount</Label>
                                        <div className="mt-1 font-semibold text-green-600">
                                          ${parseFloat(selectedClaim.approvedAmount).toFixed(2)}
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
                {submitSuccess && (
                  <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    Claim submitted successfully!
                  </div>
                )}
                
                {submitError && (
                  <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {submitError}
                  </div>
                )}
              
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
                        disabled={!!user}
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
                        disabled={!!user}
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