import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function App() {
  const [users, setUsers] = useState([]);
  console.log("users::: ", users);
  const [loading, setLoading] = useState(true);

  // Fetch users from API
  const fetchData = async () => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      setUsers(res.data);
    } catch (error) {
      toast.error("Failed to load users!");
    } finally {
      setLoading(false);
    }
  };

  // Fetch users
  useEffect(() => {
    fetchData();
  }, []);

  // Skeleton loading component
  const SkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="py-3 px-4 border">
        <div className="h-4 bg-gray-300 rounded"></div>
      </td>
      <td className="py-3 px-4 border">
        <div className="h-4 bg-gray-300 rounded"></div>
      </td>
      <td className="py-3 px-4 border">
        <div className="h-4 bg-gray-300 rounded"></div>
      </td>
      <td className="py-3 px-4 border">
        <div className="h-4 bg-gray-300 rounded"></div>
      </td>
      <td className="py-3 px-4 border">
        <div className="h-4 bg-gray-300 rounded"></div>
      </td>
      <td className="py-3 px-4 border">
        <div className="h-4 bg-gray-300 rounded"></div>
      </td>
      <td className="py-3 px-4 border">
        <div className="h-4 bg-gray-300 rounded"></div>
      </td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-lg p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-blue-600">
          Users Table
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-600 text-white text-left">
                <th className="py-3 px-2 md:px-4 hidden md:table-cell">ID</th>
                <th className="py-3 px-2 md:px-4">Name</th>
                <th className="py-3 px-2 md:px-4 hidden sm:table-cell">
                  Username
                </th>
                <th className="py-3 px-2 md:px-4">Email</th>
                <th className="py-3 px-2 md:px-4 hidden lg:table-cell">
                  Phone
                </th>
                <th className="py-3 px-2 md:px-4 hidden md:table-cell">
                  Website
                </th>
                <th className="py-3 px-2 md:px-4 hidden xl:table-cell">
                  Company
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <SkeletonRow key={index} />
                ))
              ) : users.length > 0 ? (
                users.map((user, idx) => (
                  <tr
                    key={user.id}
                    className={`${
                      idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-blue-50 transition`}
                  >
                    <td className="py-2 px-2 md:px-4 border hidden md:table-cell">
                      {user.id}
                    </td>
                    <td className="py-2 px-2 md:px-4 border font-medium text-gray-700">
                      {user.name}
                    </td>
                    <td className="py-2 px-2 md:px-4 border hidden sm:table-cell">
                      {user.username}
                    </td>
                    <td className="py-2 px-2 md:px-4 border">
                      <a
                        href={`mailto:${user.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {user.email}
                      </a>
                    </td>
                    <td className="py-2 px-2 md:px-4 border hidden lg:table-cell">
                      {user.phone}
                    </td>
                    <td className="py-2 px-2 md:px-4 border hidden md:table-cell">
                      <a
                        href={`https://${user.website}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline"
                      >
                        {user.website}
                      </a>
                    </td>
                    <td className="py-2 px-2 md:px-4 border hidden xl:table-cell">
                      {user.company.name}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-4 text-gray-500 italic"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
