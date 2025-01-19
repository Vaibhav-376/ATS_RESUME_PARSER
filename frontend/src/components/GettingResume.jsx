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
      const response = await fetch("http://localhost:3000/api/resume");
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
        <div className="bg-white shadow-xl rounded-lg p-6 max-w-6xl w-full">
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin h-10 w-10 border-4 border-t-4 border-gray-600 rounded-full"></div>
              <p className="ml-4 text-lg font-semibold text-gray-600">
                Loading your data...
              </p>
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
                      key={item._id || index}
                      className="even:bg-gray-50 hover:bg-blue-50 transition-all duration-300 ease-in-out"
                    >
                      <TableCell className="px-4 py-2 text-gray-600">
                        {item.content?.personal_infos?.name?.first_name || "N/A"}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-gray-600">
                        {item.content?.personal_infos?.address?.formatted_location || "N/A"}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-gray-600">
                        {item.content?.personal_infos?.phones?.length ? item.content.personal_infos.phones.join(", ") : "N/A"}
                      </TableCell>
                      <TableCell className="px-4 py-2 text-gray-600">
                        {item.content?.personal_infos?.mails?.length ? item.content.personal_infos.mails.join(", ") : "N/A"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>

              </Table>
            </div>
          ) : (
            <p className="text-center text-lg font-semibold text-gray-600">
              No data available.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default GettingResume;
