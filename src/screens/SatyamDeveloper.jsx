import React, { useEffect, useState } from "react";
import {
  Search,
  Eye,
  Phone,
  Mail,
  User,
  MessageSquare,
  CheckCircle,
  Clock,
  XCircle,
  Trash2,
  AlertCircle,
} from "lucide-react";
import axios from "axios";

// const baseurl = "http://localhost:3001/api";
const baseurl = "https://api.satyammetroshowstoppers.in/api";

const SatyamDeveloper = () => {
  const [search, setSearch] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, requestId: null, requestName: "" });
  const [alertModal, setAlertModal] = useState({ show: false, type: "success", title: "", message: "" });

  const fetchforms = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseurl}/forms`);

      const formattedData = response.data
        .filter((item) => item.source === "satyammetroshowstoppers.in")
        .map((item) => ({
          id: item._id,
          name: item.name,
          phone: item.mobile || "N/A",
          email: item.email || "N/A",
          message: item.message || "No message provided.",
          date: item.createdAt,
          processedDate: item.updatedAt,
          status: item.status || "in-progress",
        }));

      setRequests(formattedData);
    } catch (error) {
      console.error("Error fetching forms:", error);
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (type, title, message) => {
    setAlertModal({ show: true, type, title, message });
    setTimeout(() => setAlertModal({ show: false, type: "success", title: "", message: "" }), 3000);
  };

  const updateStatus = async (id, newStatus) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === id
          ? {
              ...req,
              status: newStatus,
              processedDate: new Date().toISOString(),
            }
          : req,
      ),
    );

    if (selectedRequest && selectedRequest.id === id) {
      setSelectedRequest((prev) => ({
        ...prev,
        status: newStatus,
        processedDate: new Date().toISOString(),
      }));
    }

    try {
      await axios.patch(`${baseurl}/forms/status/${id}`, { status: newStatus });
    } catch (error) {
      console.error("Failed to update status", error);
      showAlert("error", "Update Failed", "Failed to update status. Reverting changes...");
      fetchforms();
    }
  };

  const handleDeleteClick = (id, name) => {
    setDeleteModal({ show: true, requestId: id, requestName: name });
  };

  const handleDeleteConfirm = async () => {
    try {
      console.log('Attempting to delete ID:', deleteModal.requestId);
      console.log('Delete URL:', `${baseurl}/forms/${deleteModal.requestId}`);
      
      // Make sure we're using the correct MongoDB _id
      const response = await axios.delete(`${baseurl}/forms/${deleteModal.requestId}`);
      console.log('Delete response:', response);
      
      // Remove from local state using the same ID
      setRequests(prev => prev.filter(req => req.id !== deleteModal.requestId));
      if (selectedRequest && selectedRequest.id === deleteModal.requestId) {
        setSelectedRequest(null);
      }
      setDeleteModal({ show: false, requestId: null, requestName: "" });
      showAlert("success", "Success!", "Request deleted successfully!");
    } catch (error) {
      console.error("Failed to delete request", error);
      console.error("Error details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url,
        requestId: deleteModal.requestId
      });
      showAlert("error", "Delete Failed", `Failed to delete request: ${error.response?.status || 'Network Error'}`);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ show: false, requestId: null, requestName: "" });
  };

  useEffect(() => {
    fetchforms();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "in-progress":
        return <Clock className="w-4 h-4 text-blue-400" />;
      case "contacted":
        return <Phone className="w-4 h-4 text-orange-400" />;
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400";
      case "in-progress":
        return "bg-blue-500/20 text-blue-400";
      case "contacted":
        return "bg-orange-500/20 text-orange-400";
      case "cancelled":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-slate-500/20 text-slate-400";
    }
  };

  const filteredRequests = requests
    .filter((request) => {
      const matchesSearch =
        request.name.toLowerCase().includes(search.toLowerCase()) ||
        request.email.toLowerCase().includes(search.toLowerCase()) ||
        request.phone.includes(search);
      const matchesStatus =
        statusFilter === "all" || request.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // latest first

  const MessageModal = ({ request, onClose }) => {
    if (!request) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 border border-slate-700 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4">
          <div className="p-4 lg:p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg lg:text-xl font-semibold text-white">
                Request Details
              </h3>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-300 text-2xl p-1"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Name
                  </label>
                  <p className="text-white text-sm lg:text-base break-words">
                    {request.name}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Phone
                  </label>
                  <p className="text-white text-sm lg:text-base break-all">
                    {request.phone}
                  </p>
                </div>
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Email
                  </label>
                  <p className="text-white text-sm lg:text-base break-all">
                    {request.email}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Message
                </label>
                <div className="bg-slate-700/50 p-3 lg:p-4 rounded-lg">
                  <p className="text-white leading-relaxed text-sm lg:text-base">
                    {request.message}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Status
                  </label>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(request.status)}
                    <select
                      value={request.status}
                      onChange={(e) => updateStatus(request.id, e.target.value)}
                      className="bg-slate-900 border border-slate-600 text-xs px-2 py-1 rounded-lg text-white"
                    >
                      <option value="in-progress">In Progress</option>
                      <option value="contacted">Contacted</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">
                    Processed Date
                  </label>
                  <p className="text-white text-sm lg:text-base">
                    {new Date(request.processedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DeleteConfirmModal = () => {
    if (!deleteModal.show) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-slate-800 border border-slate-700 rounded-lg max-w-md w-full mx-4">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Delete Request
                </h3>
                <p className="text-slate-400 text-sm">
                  This action cannot be undone
                </p>
              </div>
            </div>
            
            <p className="text-slate-300 mb-6">
              Are you sure you want to delete the request from{" "}
              <span className="font-semibold text-white">{deleteModal.requestName}</span>?
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={handleDeleteCancel}
                className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AlertModal = () => {
    if (!alertModal.show) return null;

    const getAlertIcon = () => {
      switch (alertModal.type) {
        case "success":
          return <CheckCircle className="w-6 h-6 text-green-400" />;
        case "error":
          return <XCircle className="w-6 h-6 text-red-400" />;
        default:
          return <AlertCircle className="w-6 h-6 text-blue-400" />;
      }
    };

    const getAlertColors = () => {
      switch (alertModal.type) {
        case "success":
          return "bg-green-500/20 border-green-500/50";
        case "error":
          return "bg-red-500/20 border-red-500/50";
        default:
          return "bg-blue-500/20 border-blue-500/50";
      }
    };

    return (
      <div className="fixed top-4 right-4 left-4 sm:left-auto z-50 animate-in slide-in-from-right duration-300">
        <div className={`bg-slate-800 border rounded-lg p-3 sm:p-4 w-full sm:max-w-sm shadow-lg ${getAlertColors()}`}>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              {getAlertIcon()}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-white font-medium text-sm">{alertModal.title}</h4>
              <p className="text-slate-300 text-xs mt-1 break-words">{alertModal.message}</p>
            </div>
            <button
              onClick={() => setAlertModal({ show: false, type: "success", title: "", message: "" })}
              className="text-slate-400 hover:text-slate-300 text-lg flex-shrink-0 ml-2"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 lg:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              All New Requests From Satyam Metro Shows Toppers
            </h1>
            <p className="text-slate-400 text-sm lg:text-base">
              View and manage completed real estate inquiries
            </p>
          </div>
        <a
  href="https://satyammetroshowstoppers.in"
  target="_blank"
  rel="noopener noreferrer"
  className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-lg font-semibold transition-all duration-200 text-sm whitespace-nowrap"
>
  Visit Main Website
</a>

        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 lg:w-5 lg:h-5" />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 lg:pl-10 pr-4 py-2 lg:py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-white placeholder-slate-400 text-sm lg:text-base"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 lg:px-4 py-2 lg:py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-white text-sm lg:text-base"
        >
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="in-progress">In Progress</option>
          <option value="contacted">Contacted</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Requests Grid */}
      <div className="grid gap-4">
        {loading ? (
          <div className="text-center py-12 text-slate-400">
            Loading requests...
          </div>
        ) : (
          filteredRequests.map((request) => (
            <div
              key={request.id}
              className="relative bg-slate-800/50 backdrop-blur border border-slate-700/50 hover:border-blue-500/50 rounded-lg p-4 lg:p-6 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-200"
            >
              {/* Delete button - top right for mobile, bottom right for desktop */}
              <button
                onClick={() => handleDeleteClick(request.id, request.name)}
                className="absolute top-3 right-3 lg:bottom-3 lg:top-auto lg:right-3 p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-lg transition-all duration-200 z-10"
                title="Delete request"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 pr-12 lg:pr-16">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 lg:w-5 lg:h-5 text-slate-400" />
                      <h3 className="text-base lg:text-lg font-semibold text-white">
                        {request.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(request.status)}
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          request.status,
                        )}`}
                      >
                        {request.status.replace("-", " ").toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 mb-4">
                    <div className="flex items-center gap-2 text-slate-400 text-sm lg:text-base">
                      <Phone className="w-3 h-3 lg:w-4 lg:h-4" />
                      <span className="break-all">{request.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-sm lg:text-base">
                      <Mail className="w-3 h-3 lg:w-4 lg:h-4" />
                      <span className="break-all">{request.email}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 mb-4">
                    <MessageSquare className="w-3 h-3 lg:w-4 lg:h-4 text-slate-400 mt-1 flex-shrink-0" />
                    <p className="text-slate-300 line-clamp-2 text-sm lg:text-base">
                      {request.message}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-xs lg:text-sm text-slate-400">
                    <span>
                      Received: {new Date(request.date).toLocaleDateString()}
                    </span>
                    <span>
                      Processed:{" "}
                      {new Date(request.processedDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedRequest(request)}
                  className="flex items-center justify-center gap-2 px-3 lg:px-4 py-2 lg:py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg shadow-blue-500/50 text-sm lg:text-base w-full lg:w-auto lg:ml-4"
                >
                  <Eye className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="lg:inline">View Details</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {!loading && filteredRequests.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-400 mb-2">
            <MessageSquare className="w-12 h-12 mx-auto" />
          </div>
          <p className="text-slate-500">No requests found</p>
        </div>
      )}

      <MessageModal
        request={selectedRequest}
        onClose={() => setSelectedRequest(null)}
      />
      <DeleteConfirmModal />
      <AlertModal />
    </div>
  );
};

export default SatyamDeveloper;
