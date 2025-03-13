import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Filter, 
  Calendar,
  Download,
  DollarSign,
  ChevronDown,
  ArrowUpDown
} from 'lucide-react';
const InsurerPortal = () => {
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
      document: 'hospital_receipt.pdf',
      policyNumber: 'POL-123456'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      claimAmount: 450.00,
      description: 'Dental checkup and cavity filling.',
      status: 'Pending',
      submissionDate: '2025-03-01',
      approvedAmount: null,
      insurerComments: null,
      document: 'dental_receipt.pdf',
      policyNumber: 'POL-789012'
    },
    {
      id: '3',
      name: 'Michael Smith',
      email: 'michael@example.com',
      claimAmount: 800.00,
      description: 'Eye examination and new prescription glasses.',
      status: 'Rejected',
      submissionDate: '2025-01-20',
      approvedAmount: 0,
      insurerComments: 'Not covered under current policy.',
      document: 'vision_receipt.pdf',
      policyNumber: 'POL-345678'
    },
    {
      id: '4',
      name: 'Emily Wilson',
      email: 'emily@example.com',
      claimAmount: 3500.00,
      description: 'Emergency appendectomy surgery and hospital stay.',
      status: 'Pending',
      submissionDate: '2025-03-10',
      approvedAmount: null,
      insurerComments: null,
      document: 'surgery_invoice.pdf',
      policyNumber: 'POL-567890'
    },
    {
      id: '5',
      name: 'David Brown',
      email: 'david@example.com',
      claimAmount: 175.00,
      description: 'Physical therapy session for shoulder injury.',
      status: 'Pending',
      submissionDate: '2025-03-08',
      approvedAmount: null,
      insurerComments: null,
      document: 'therapy_receipt.pdf',
      policyNumber: 'POL-901234'
    }
  ]);

  // States for filtering and reviewing
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [amountFilter, setAmountFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showReviewSheet, setShowReviewSheet] = useState(false);
  const [selectedClaimId, setSelectedClaimId] = useState(null);
  
  // State for review form
  const [reviewForm, setReviewForm] = useState({
    status: 'Pending',
    approvedAmount: '',
    insurerComments: ''
  });
  
  // State for sorting
  const [sortBy, setSortBy] = useState('submissionDate');
  const [sortDirection, setSortDirection] = useState('desc');

  // Handle selecting a claim for review
  const handleSelectClaim = (claimId) => {
    const claim = claims.find(c => c.id === claimId);
    setSelectedClaimId(claimId);
    setReviewForm({
      status: claim.status,
      approvedAmount: claim.approvedAmount || '',
      insurerComments: claim.insurerComments || ''
    });
    setShowReviewSheet(true);
  };

  // Handle review form changes
  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewForm({
      ...reviewForm,
      [name]: value
    });
  };

  // Handle status change in review
  const handleStatusChange = (value) => {
    setReviewForm({
      ...reviewForm,
      status: value
    });
  };

  // Handle submit review
  const handleSubmitReview = () => {
    const updatedClaims = claims.map(claim => {
      if (claim.id === selectedClaimId) {
        return {
          ...claim,
          status: reviewForm.status,
          approvedAmount: reviewForm.status === 'Approved' 
            ? parseFloat(reviewForm.approvedAmount) || 0 
            : null,
          insurerComments: reviewForm.insurerComments
        };
      }
      return claim;
    });
    
    setClaims(updatedClaims);
    setShowReviewSheet(false);
    
    // Show success message (could use a toast notification here)
    alert('Claim updated successfully!');
  };

  // Handle sorting
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  // Get status badge component based on status
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return <span className="bg-green-500 text-white px-2 py-1 rounded">Approved</span>;
      case 'Rejected':
        return <span className="bg-red-500 text-white px-2 py-1 rounded">Rejected</span>;
      case 'Pending':
      default:
        return <span className="bg-yellow-500 text-white px-2 py-1 rounded">Pending</span>;
    }
  };

  // Apply all filters and sorting
  const filteredAndSortedClaims = [...claims]
    // Apply status filter
    .filter(claim => statusFilter === 'All' || claim.status === statusFilter)
    // Apply date filter
    .filter(claim => {
      if (dateFilter === 'All') return true;
      const today = new Date();
      const claimDate = new Date(claim.submissionDate);
      const diffTime = Math.abs(today - claimDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      switch (dateFilter) {
        case 'Last7Days':
          return diffDays <= 7;
        case 'Last30Days':
          return diffDays <= 30;
        case 'Last90Days':
          return diffDays <= 90;
        default:
          return true;
      }
    })
    // Apply amount filter
    .filter(claim => {
      if (amountFilter === 'All') return true;
      
      switch (amountFilter) {
        case 'Under500':
          return claim.claimAmount < 500;
        case '500to1000':
          return claim.claimAmount >= 500 && claim.claimAmount <= 1000;
        case 'Over1000':
          return claim.claimAmount > 1000;
        default:
          return true;
      }
    })
    // Apply search query
    .filter(claim => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        claim.name.toLowerCase().includes(query) ||
        claim.email.toLowerCase().includes(query) ||
        claim.description.toLowerCase().includes(query) ||
        claim.policyNumber.toLowerCase().includes(query)
      );
    })
    // Apply sorting
    .sort((a, b) => {
      let comparison = 0;
      
      if (sortBy === 'submissionDate') {
        comparison = new Date(a.submissionDate) - new Date(b.submissionDate);
      } else if (sortBy === 'claimAmount') {
        comparison = a.claimAmount - b.claimAmount;
      } else if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });

  // Get selected claim
  const selectedClaim = claims.find(claim => claim.id === selectedClaimId);
  
  // Calculate statistics
  const stats = {
    totalClaims: claims.length,
    pendingClaims: claims.filter(claim => claim.status === 'Pending').length,
    approvedClaims: claims.filter(claim => claim.status === 'Approved').length,
    rejectedClaims: claims.filter(claim => claim.status === 'Rejected').length,
    totalAmount: claims.reduce((total, claim) => total + claim.claimAmount, 0),
    approvedAmount: claims
      .filter(claim => claim.status === 'Approved')
      .reduce((total, claim) => total + (claim.approvedAmount || 0), 0)
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Insurer Dashboard</h1>
          <p className="text-gray-600">Review and manage patient healthcare claims</p>
        </header>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="claims">Claims Management</TabsTrigger>
          </TabsList>
          
          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white shadow-lg rounded-lg p-4">
                <h3 className="text-lg font-semibold">Total Claims</h3>
                <div className="text-3xl font-bold">{stats.totalClaims}</div>
                <div className="flex mt-2 space-x-2">
                  <span className="bg-yellow-500 text-white px-2 py-1 rounded">{stats.pendingClaims} Pending</span>
                  <span className="bg-green-500 text-white px-2 py-1 rounded">{stats.approvedClaims} Approved</span>
                  <span className="bg-red-500 text-white px-2 py-1 rounded">{stats.rejectedClaims} Rejected</span>
                </div>
              </div>
              
              <div className="bg-white shadow-lg rounded-lg p-4">
                <h3 className="text-lg font-semibold">Total Claimed Amount</h3>
                <div className="text-3xl font-bold">${stats.totalAmount.toFixed(2)}</div>
                <div className="text-sm text-gray-500 mt-2">
                  Across all submitted claims
                </div>
              </div>
              
              <div className="bg-white shadow-lg rounded-lg p-4">
                <h3 className="text-lg font-semibold">Approved Amount</h3>
                <div className="text-3xl font-bold">${stats.approvedAmount.toFixed(2)}</div>
                <div className="text-sm text-gray-500 mt-2">
                  {((stats.approvedAmount / stats.totalAmount) * 100).toFixed(1)}% of total claimed
                </div>
              </div>
            </div>
            
            <div className="bg-white shadow-lg rounded-lg p-4">
              <h3 className="text-lg font-semibold">Recent Claims</h3>
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <th className="p-2">Patient</th>
                      <th className="p-2">Date</th>
                      <th className="p-2">Amount</th>
                      <th className="p-2">Status</th>
                      <th className="p-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {claims
                      .filter(claim => claim.status === 'Pending')
                      .sort((a, b) => new Date(b.submissionDate) - new Date(a.submissionDate))
                      .slice(0, 5)
                      .map((claim) => (
                        <tr key={claim.id}>
                          <td className="p-2 font-medium">{claim.name}</td>
                          <td className="p-2">{claim.submissionDate}</td>
                          <td className="p-2">${claim.claimAmount.toFixed(2)}</td>
                          <td className="p-2">{getStatusBadge(claim.status)}</td>
                          <td className="p-2">
                            <button 
                              className="bg-blue-500 text-white px-4 py-2 rounded-sm"
                              onClick={() => handleSelectClaim(claim.id)}
                            >
                              Review
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          
          {/* Claims Management Tab */}
          <TabsContent value="claims">
            <div className="mb-6 grid grid-cols-1 gap-6">
              <div className="bg-white shadow-lg rounded-lg p-4">
                <h3 className="text-lg font-semibold">Filter Claims</h3>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-4">
                    <label htmlFor="search">Search</label>
                    <div className="relative mt-1">
                      <Search className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
                      <input 
                        id="search" 
                        placeholder="Search by name, email, policy..." 
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="status-filter">Status</label>
                    <select 
                      value={statusFilter} 
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="All">All Statuses</option>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-3">
                    <label htmlFor="date-filter">Submission Date</label>
                    <select 
                      value={dateFilter} 
                      onChange={(e) => setDateFilter(e.target.value)}
                    >
                      <option value="All">All Time</option>
                      <option value="Last7Days">Last 7 Days</option>
                      <option value="Last30Days">Last 30 Days</option>
                      <option value="Last90Days">Last 90 Days</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-3">
                    <label htmlFor="amount-filter">Claim Amount</label>
                    <select 
                      value={amountFilter} 
                      onChange={(e) => setAmountFilter(e.target.value)}
                    >
                      <option value="All">All Amounts</option>
                      <option value="Under500">Under $500</option>
                      <option value="500to1000">$500 - $1000</option>
                      <option value="Over1000">Over $1000</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white shadow-lg rounded-lg p-4">
              <h3 className="text-lg font-semibold">Claims List</h3>
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <th className="p-2 cursor-pointer" onClick={() => handleSort('name')}>
                        Patient
                        {sortBy === 'name' && (
                          <ArrowUpDown className={`ml-2 h-4 w-4 inline ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
                        )}
                      </th>
                      <th className="p-2">Policy Number</th>
                      <th className="p-2 cursor-pointer" onClick={() => handleSort('submissionDate')}>
                        Date
                        {sortBy === 'submissionDate' && (
                          <ArrowUpDown className={`ml-2 h-4 w-4 inline ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
                        )}
                      </th>
                      <th className="p-2 cursor-pointer" onClick={() => handleSort('claimAmount')}>
                        Amount
                        {sortBy === 'claimAmount' && (
                          <ArrowUpDown className={`ml-2 h-4 w-4 inline ${sortDirection === 'asc' ? 'rotate-180' : ''}`} />
                        )}
                      </th>
                      <th className="p-2">Status</th>
                      <th className="p-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAndSortedClaims.map((claim) => (
                      <tr key={claim.id}>
                        <td className="p-2 font-medium">{claim.name}</td>
                        <td className="p-2">{claim.policyNumber}</td>
                        <td className="p-2">{claim.submissionDate}</td>
                        <td className="p-2">${claim.claimAmount.toFixed(2)}</td>
                        <td className="p-2">{getStatusBadge(claim.status)}</td>
                        <td className="p-2">
                          <button 
                            className="bg-blue-500 text-white px-4 py-2 rounded-sm"
                            onClick={() => handleSelectClaim(claim.id)}
                          >
                            Review
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InsurerPortal;