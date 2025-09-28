import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function UserDetailPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(`https://reqres.in/api/users/${id}`);
        setUser(response.data.data);
      } catch (err) {
        setError("Failed to fetch user details");
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [id]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!user) return <p className="p-4">User not found</p>;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <Link to="/users" className="text-blue-500 mb-4 inline-block">&larr; Back to Users</Link>
      <div className="bg-white p-6 rounded shadow-md max-w-md">
        <img src={user.avatar} alt={user.first_name} className="w-24 h-24 rounded-full mb-4" />
        <h2 className="text-xl font-bold">{user.first_name} {user.last_name}</h2>
        <p className="text-gray-600">{user.email}</p>
      </div>
    </div>
  );
}
