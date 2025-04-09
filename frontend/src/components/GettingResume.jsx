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
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


const GettingResume = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const downloadExcel = () => {
    const formattedData = data.map((item) => ({
      Name: item.content?.personal_infos?.name?.first_name || "N/A",
      Address: item.content?.personal_infos?.address?.formatted_location || "N/A",
      Phone: item.content?.personal_infos?.phones?.join(", ") || "N/A",
      Email: item.content?.personal_infos?.mails?.join(", ") || "N/A",
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Resumes");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const dataBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(dataBlob, "resume_data.xlsx");
  };


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
      {!loading && data.length > 0 && (
        <div className="flex justify-end mb-4">
          <button
            onClick={downloadExcel}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
          >
            Download Excel
          </button>
        </div>
      )}

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
