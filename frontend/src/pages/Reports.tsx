import { fetchAllReportAPI } from "@/api/report.api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getToken } from "@clerk/react";
import {
  Loader2,
  MoreHorizontal,
  FileSpreadsheet,
  Hospital,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import GenerateReport from "@/components/custom/Reports/Generate";
import { Link } from "react-router-dom";

interface FetchReports {
  id: string;
  scanType: string;
  docxUrl: string;
  patients: {
    name: string;
    patientType: string;
  };
  doctorName: string;
  createdAt: string;
}

const Reports = () => {
  const [reportData, setReportData] = useState<FetchReports[]>([]);
  const [loading, setLoading] = useState(false);

  const [generateReportOpen, setGenerateReportOpen] = useState<boolean>(false);

  const handleFetchAllReports = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const res = await fetchAllReportAPI(token!);
      if (res?.data?.reports) {
        setReportData(res.data.reports);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchAllReports();
  }, []);

  return (
    <div className="w-full space-y-6 lg:p-6">
      {/* Header Block */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
            Reports
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Access, filter, and download generated clinical scan reports and
            documents.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-zinc-100 px-3 py-1.5 rounded-lg text-sm font-medium text-zinc-700 w-fit self-start sm:self-center">
          <FileSpreadsheet className="w-4 h-4 text-zinc-500" />
          <span>Total Reports: {reportData.length}</span>
        </div>
      </div>

      <div className="flex justify-between items-center w-full">
        <Input placeholder="Search for Reports..." className="w-80" />
        <div className="flex justify-end items-end w-full gap-x-2">
          <GenerateReport
            generateReportOpen={generateReportOpen}
            setGenerateReportOpen={setGenerateReportOpen}
            handleFetchAllReports={handleFetchAllReports}
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl border border-zinc-200/80 shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader className="bg-zinc-50/70 subtle-bottom-border">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-start font-semibold text-zinc-700 py-4 px-6 whitespace-nowrap">
                  Patient Name
                </TableHead>
                <TableHead className="text-center font-semibold text-zinc-700 py-4 px-4 whitespace-nowrap">
                  Type
                </TableHead>
                <TableHead className="text-start font-semibold text-zinc-700 py-4 px-4 whitespace-nowrap">
                  Scan Type
                </TableHead>
                <TableHead className="text-start font-semibold text-zinc-700 py-4 px-4 whitespace-nowrap">
                  Doctor
                </TableHead>
                <TableHead className="text-center font-semibold text-zinc-700 py-4 px-4 whitespace-nowrap">
                  Generated Date
                </TableHead>
                <TableHead className="text-end font-semibold text-zinc-700 py-4 px-6 whitespace-nowrap">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-10 text-zinc-400"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-zinc-500" />
                      <span>Loading reports database...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : reportData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-12 text-zinc-500 font-medium"
                  >
                    No records found
                  </TableCell>
                </TableRow>
              ) : (
                reportData.map((report) => (
                  <TableRow
                    key={report.id}
                    className="hover:bg-zinc-50/50 transition-colors group"
                  >
                    {/* Patient Name */}
                    <TableCell className="py-4 px-6 font-medium text-zinc-900 whitespace-nowrap">
                      {report.patients?.name || "—"}
                    </TableCell>

                    {/* Patient Type */}
                    <TableCell className="py-4 px-4 text-center whitespace-nowrap">
                      {report.patients?.patientType === "OBS" ? (
                        <span className="inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-100">
                          OBS
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700">
                          {report.patients?.patientType || "Regular"}
                        </span>
                      )}
                    </TableCell>

                    {/* Scan Type */}
                    <TableCell className="py-4 px-4 text-zinc-700 font-medium whitespace-nowrap">
                      {report.scanType}
                    </TableCell>

                    {/* Clinic */}
                    <TableCell className="py-4 px-4 text-zinc-600 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Hospital className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{report.doctorName}</span>
                      </div>
                    </TableCell>

                    {/* Date and Time (DD-MM-YY & 12h AM/PM) */}
                    <TableCell className="py-4 px-4 text-center whitespace-nowrap">
                      {report.createdAt ? (
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-zinc-900 font-medium text-sm">
                            {new Date(report.createdAt)
                              .toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "2-digit",
                              })
                              .replace(/\//g, "-")}
                          </span>
                          <span className="text-xs text-zinc-400 mt-0.5 font-normal">
                            {new Date(report.createdAt).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              },
                            )}
                          </span>
                        </div>
                      ) : (
                        <span className="text-zinc-400">—</span>
                      )}
                    </TableCell>

                    {/* Actions Button */}
                    <TableCell className="py-4 px-6 text-end whitespace-nowrap">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-1.5 hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 rounded-lg transition-colors inline-flex items-center justify-center cursor-pointer">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Link to={report.docxUrl}>Export Report</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Attach Dicom</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
