import { Link } from "react-router-dom";

export default function UserCard({ user }) {
  return (
    <div className="border rounded p-4 shadow-sm hover:shadow-md transition duration-200">
      <img src={user.avatar} alt={user.first_name} className="w-16 h-16 rounded-full mb-2" />
      <h3 className="font-semibold">{user.first_name} {user.last_name}</h3>
      <p className="text-sm text-gray-500">{user.email}</p>
      <Link to={`/users/${user.id}`} className="text-blue-500 text-sm mt-2 inline-block">View Details</Link>
    </div>
  );
}
