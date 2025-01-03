import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import Navbar from "./templates/Navbar";

const GettingResume = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getResumesInfo() {
    try {
      setLoading(true);
      const response = await fetch("https://ats-resume-parser.onrender.com/api/resume");
      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.error("Error fetching resumes info:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getResumesInfo();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white shadow-xl rounded-lg p-6 max-w-6xl w-full transform transition duration-500 hover:scale-105">
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin h-10 w-10 border-4 border-t-4 border-gray-600 rounded-full"></div>
              <p className="ml-4 text-lg font-semibold text-gray-600">Loading your data...</p>
            </div>
          ) : data.length > 0 ? (
            <div className="overflow-x-auto">
              <Table className="w-full border border-gray-300 rounded-lg shadow-md">
                <TableCaption className="text-lg font-semibold text-gray-700 pb-4">
                  A List of Your Resumes Info
                </TableCaption>
                <TableHeader>
                  <TableRow className="bg-blue-100">
                    <TableHead className="px-4 py-3 text-gray-700">Name</TableHead>
                    <TableHead className="px-4 py-3 text-gray-700">Address</TableHead>
                    <TableHead className="px-4 py-3 text-gray-700">Phone No</TableHead>
                    <TableHead className="px-4 py-3 text-gray-700">Email</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item, index) => (
                    <TableRow
                      key={item.id || index}
                      className="even:bg-gray-50 hover:bg-blue-50 transition-all duration-300 ease-in-out"
                    >
                      <TableCell className="px-4 py-2 text-gray-600">
                        {item.extractedData?.[0]?.name?.first_name || "N/A"}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-gray-600">
                        {item.extractedData?.[0]?.address?.formatted_location ||
                          "N/A"}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-gray-600">
                        {item.extractedData?.[0]?.phones || "N/A"}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-gray-600">
                        {item.extractedData?.[0]?.mails || "N/A"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-center text-lg font-semibold text-gray-600 animate-fadeIn">
              No data available.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default GettingResume;
