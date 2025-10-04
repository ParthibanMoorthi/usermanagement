import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers, createUserThunk, updateUserThunk, deleteUserThunk } from "../features/users/userThunks";
import { logout } from "../features/auth/authSlice";
import {
  FiLogOut,
  FiSearch,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiTable,
  FiGrid,
  FiTrash2,
  FiEdit2,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import UserModal from "../components/UserModal";
import ConfirmDialog from "../components/ConfirmDialog";
import { toast } from "react-toastify";

export default function UserListPage() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("table");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const usersPerPage = 5;

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  const filteredUsers = list.filter(
    (user) =>
      user.first_name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      user.last_name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
      user.email?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / usersPerPage));
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const fields=[
    { name: "first_name", label: "First Name", required: true },
    { name: "last_name", label: "Last Name", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "profile_image", label: "Profile Image Link", type: "image", required: true },
  ]

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  const openCreate = () => {
    setModalData(null);
    setModalOpen(true);
  };

  const openEdit = (user) => {
    setModalData(user);
    setModalOpen(true);
  };

 const handleSave = async (form) => {
    try {
      if (modalData && modalData.id) {
        await dispatch(updateUserThunk({ id: modalData.id, updates: form })).unwrap();
        toast.success("User updated successfully!");
      } else {
        await dispatch(createUserThunk(form)).unwrap();
        toast.success("User created successfully!");
        setCurrentPage(1);
      }
      dispatch(loadUsers());
      setModalOpen(false);
    } catch (err) {
      toast.error(err || "Operation failed!");
    }
  };

  const confirmDelete = (user) => {
    setDeleteTarget(user);
    setConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await dispatch(deleteUserThunk(deleteTarget.id)).unwrap();
      toast.success("User deleted successfully!");
      setConfirmOpen(false);
      setDeleteTarget(null);
      dispatch(loadUsers());
    } catch (err) {
      toast.error(err || "Failed to delete user!");
    } finally {
      setDeleting(false);
    }
  };

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="min-h-screen bg-[#DEDEDE]">

      <main className="p-4">
        {loading && <p className="text-sm">Loading users...</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="bg-white rounded shadow-sm">
          <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
            <p className="text-lg font-semibold">Users</p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-3 pr-12 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-black"
                />
                {searchTerm && (
                  <button type="button" onClick={() => setSearchTerm("")} className="absolute right-8 top-0 h-full flex items-center px-2 text-gray-400 hover:text-gray-600">
                    <FiX size={16} />
                  </button>
                )}
                <div className="absolute right-0 top-0 h-full flex items-center px-2 border-l border-gray-300">
                  <FiSearch className="text-gray-400" />
                </div>
              </div>

              <button onClick={openCreate} className="px-4 py-2 text-white bg-[#1990FF] text-sm rounded hover:bg-blue-600 transition">
                Create User
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start px-4 pb-2 gap-0 w-full sm:w-auto">
            <button onClick={() => setViewMode("table")} className={`flex items-center justify-center gap-2 px-3 py-1 w-full sm:w-auto rounded-l text-sm font-medium border transition ${viewMode === "table" ? "bg-blue-50 text-[#1990FF] border-[#1990FF] font-semibold" : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"}`}>
              <FiTable size={16} />
              <span className="text-xs sm:text-sm">Table</span>
            </button>

            <button onClick={() => setViewMode("card")} className={`flex items-center justify-center gap-2 px-3 py-1 w-full sm:w-auto rounded-r text-sm font-medium border transition ${viewMode === "card" ? "bg-blue-50 text-[#1990FF] border-[#1990FF] font-semibold" : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"}`}>
              <FiGrid size={16} />
              <span className="text-xs sm:text-sm">Card</span>
            </button>
          </div>

          {viewMode === "table" ? (
            <div className="overflow-x-auto px-2 sm:px-4">
              <table className="min-w-full bg-white text-sm sm:text-base mb-4">
                <thead className="bg-[#FAFAFA] text-left">
                  <tr>
                    <th className="py-2 px-2 text-center"></th>
                    <th className="py-2 px-2 font-medium">Email</th>
                    <th className="py-2 px-2 font-medium">First Name</th>
                    <th className="py-2 px-2 font-medium">Last Name</th>
                    <th className="py-2 px-2 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 border-b border-gray-100">
                      <td className="w-[80px] py-1 px-2">
                        <div className="flex justify-center items-center">
                          <img src={user.avatar} alt={user.first_name} className="w-8 h-8 rounded-full" />
                        </div>
                      </td>
                      <td className="py-2.5 px-2 text-blue-500 break-all">{user.email}</td>
                      <td className="py-2.5 px-2 text-gray-600">{user.first_name}</td>
                      <td className="py-2.5 px-2 text-gray-600">{user.last_name}</td>
                      <td className="py-2.5 px-2 flex flex-wrap items-center gap-2">
                        <button onClick={() => openEdit(user)} className="bg-[#1990ff] text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition w-full sm:w-auto">Edit</button>
                        <button onClick={() => confirmDelete(user)} className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition w-full sm:w-auto">Delete</button>
                      </td>
                    </tr>
                  ))}
                  {currentUsers.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-4 text-gray-500">No users found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-4">
              {currentUsers.map((user) => (
                <div key={user.id} className="relative bg-white border border-gray-200 shadow rounded-lg p-6 flex flex-col items-center text-center hover:shadow-lg transition group">
                  <img src={user.avatar} alt={user.first_name} className="w-16 h-16 rounded-full mb-2" />
                  <h3 className="font-semibold text-gray-800">{user.first_name} {user.last_name}</h3>
                  <p className="text-gray-500 text-sm mb-2">{user.email}</p>

                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => openEdit(user)} className="flex items-center justify-center bg-[#1990ff] text-white h-10 w-10 rounded-full text-sm hover:bg-blue-600 transition">
                      <FiEdit2 size={16} />
                    </button>
                    <button onClick={() => confirmDelete(user)} className="flex items-center justify-center bg-red-500 text-white h-10 w-10 rounded-full text-sm hover:bg-red-600 transition">
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              {currentUsers.length === 0 && <p className="col-span-full text-center text-gray-500 py-4">No users found</p>}
            </div>
          )}
        </div>

        <div className="flex justify-center sm:justify-end px-4 space-x-2 mt-4 flex-wrap">
          <button onClick={handlePrev} disabled={currentPage === 1} className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded text-sm hover:bg-gray-100 disabled:opacity-50">
            <FiChevronLeft />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={`w-8 h-8 flex items-center justify-center bg-white border rounded text-sm ${currentPage === i + 1 ? "border-blue-500 text-blue-500" : " hover:bg-gray-100 border-gray-300 text-black"}`}>
              {i + 1}
            </button>
          ))}
          <button onClick={handleNext} disabled={currentPage === totalPages || totalPages === 0} className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded text-sm hover:bg-gray-100 disabled:opacity-50">
            <FiChevronRight />
          </button>
        </div>
      </main>

        <UserModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          initialData={modalData}
          fields={fields}
        />

       <ConfirmDialog 
       open={confirmOpen} 
       title="Delete User" 
       message={`Are you sure do you want to Delete ${deleteTarget?.first_name} ${deleteTarget?.last_name}?`} 
       onCancel={() => setConfirmOpen(false)} 
       onConfirm={handleDelete} 
       confirming={deleting} 
       />
    </div>
  );
}
