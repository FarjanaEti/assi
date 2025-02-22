import React from "react";

const Api = () => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">API Documentation and Specification</h1>
      <p className="text-gray-600 mb-6">
        Our REST-based web services allow you to integrate our micro job platform seamlessly into your application. 
        All API access is over HTTPS, and responses are in JSON format.
      </p>

      {/* Current API Table */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">Current</h2>
      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3 border border-gray-300 text-left">Name</th>
              <th className="p-3 border border-gray-300">Version</th>
              <th className="p-3 border border-gray-300">Documentation</th>
              <th className="p-3 border border-gray-300">Specification</th>
              <th className="p-3 border border-gray-300">Change Logs</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className="p-3 border border-gray-300">API</td>
              <td className="p-3 border border-gray-300">2.0.0</td>
              <td className="p-3 border border-gray-300">
                <a href="https://api2docs.microworkers.com/" className="text-blue-500 hover:underline">
                  View Docs
                </a>
              </td>
              <td className="p-3 border border-gray-300">
                <a href="https://ttv.microworkers.com/apidocs2" className="text-blue-500 hover:underline">
                  View Spec
                </a>
              </td>
              <td className="p-3 border border-gray-300">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Change Logs
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Deprecated API Table */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">Deprecated</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-500 text-white">
              <th className="p-3 border border-gray-300 text-left">Name</th>
              <th className="p-3 border border-gray-300">Version</th>
              <th className="p-3 border border-gray-300">Specification</th>
              <th className="p-3 border border-gray-300">Change Logs</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className="p-3 border border-gray-300">TTV API</td>
              <td className="p-3 border border-gray-300">1.0.0</td>
              <td className="p-3 border border-gray-300">
                <a href="https://ttv.microworkers.com/apidocs" className="text-blue-500 hover:underline">
                  View Spec
                </a>
              </td>
              <td className="p-3 border border-gray-300">
                <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">
                  Change Logs
                </button>
              </td>
            </tr>
            <tr className="bg-white">
              <td className="p-3 border border-gray-300">Microworkers API</td>
              <td className="p-3 border border-gray-300">1.0.0</td>
              <td className="p-3 border border-gray-300">
                <a href="https://www.microworkers.com/api.php" className="text-blue-500 hover:underline">
                  View Spec
                </a>
              </td>
              <td className="p-3 border border-gray-300">
                <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">
                  Change Logs
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Api;
