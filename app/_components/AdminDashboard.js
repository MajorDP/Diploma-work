import { useState } from "react";
import Link from "next/link";

export const AdminDashboard = ({ currentPlatforms, selectForEdit }) => {
  const [platforms, setPlatforms] = useState(currentPlatforms);

  const handleDelete = async () => {
    //TODO: handle deleting a platform, validate admin again
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex flex-col gap-5">
      <h1 className="text-2xl sm:text-3xl text-center font-bold text-gray-900">
        Current Platforms
      </h1>

      <div className="bg-white rounded-lg shadow overflow-hidden overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Platform Name
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Starting Price
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Gateways
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ease of Use
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {platforms.map((platform, index) => (
              <tr key={platform.id} className="text-sm">
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <a
                    href={`platform/${platform.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {platform.name}
                  </a>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  ${platform.subsFees[0]?.price}/mo
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  {platform.paymentGateways.length} gateways
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      platform.easeOfUse.difficulty === "easy"
                        ? "bg-green-100 text-green-800"
                        : platform.easeOfUse.difficulty === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {platform.easeOfUse.difficulty.charAt(0).toUpperCase() +
                      platform.easeOfUse.difficulty.slice(1)}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    className="text-blue-600 hover:text-blue-900 hover:scale-105 duration-200 p-2"
                    onClick={() => selectForEdit(index)}
                  >
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-900 hover:scale-105 duration-200 p-2">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
