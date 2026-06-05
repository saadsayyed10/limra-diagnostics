import { fetchAllBillsAPI } from "@/api/bill.api";
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
  Receipt,
  User,
  TextSearch,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import DeleteBill from "@/components/custom/Billing/Delete";
import GenerateBill from "@/components/custom/Billing/Generate";

interface Bills {
  id: string;
  scanType: string;
  totalAmount: number;
  dueAmount: number;
  concession: number;
  docxUrl: string;
  patients: {
    name: string;
    patientType: string;
  };
  createdAt: string;
}

const Billing = () => {
  const [billingData, setBillingData] = useState<Bills[]>([]);
  const [loading, setLoading] = useState(false);

  const [billId, setBillId] = useState<string>("");

  const [deleteBillOpen, setDeleteBillOpen] = useState<boolean>(false);
  const [generateBillOpen, setGenerateBillOpen] = useState<boolean>(false);

  const handleFetchAllBills = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const res = await fetchAllBillsAPI(token!);
      if (res?.data?.bills) {
        setBillingData(res.data.bills);
      }
      console.log(res.data.bills);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchAllBills();
  }, []);

  return (
    <div className="w-full space-y-6 lg:p-6">
      {/* Header Block */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
            Billing Records
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Track invoices, scan charges, concessions, and outstanding due
            amounts.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-zinc-100 px-3 py-1.5 rounded-lg text-sm font-medium text-zinc-700 w-fit self-start sm:self-center">
          <Receipt className="w-4 h-4 text-zinc-500" />
          <span>Total Invoices: {billingData.length}</span>
        </div>
      </div>

      <div className="flex justify-between items-center w-full">
        <Input placeholder="Search for Patients..." className="w-80" />

        <GenerateBill
          generateBillOpen={generateBillOpen}
          setGenerateBillOpen={setGenerateBillOpen}
          handleFetchAllBills={handleFetchAllBills}
        />
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl border border-zinc-200/80 shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader className="bg-zinc-50/70 subtle-bottom-border">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-start font-semibold text-zinc-700 py-4 px-4 whitespace-nowrap">
                  Patient
                </TableHead>
                <TableHead className="text-start font-semibold text-zinc-700 py-4 px-6 whitespace-nowrap">
                  Scan Type
                </TableHead>
                <TableHead className="text-center font-semibold text-zinc-700 py-4 px-4 whitespace-nowrap">
                  Total Amount
                </TableHead>
                <TableHead className="text-center font-semibold text-zinc-700 py-4 px-4 whitespace-nowrap">
                  Concession
                </TableHead>
                <TableHead className="text-center font-semibold text-zinc-700 py-4 px-4 whitespace-nowrap">
                  Due Amount
                </TableHead>
                <TableHead className="text-center font-semibold text-zinc-700 py-4 px-4 whitespace-nowrap">
                  Date
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
                      <span>Loading billing database...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : billingData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-12 text-zinc-500 font-medium"
                  >
                    No records found
                  </TableCell>
                </TableRow>
              ) : (
                billingData.map((bill, index) => (
                  <TableRow
                    key={bill.id + index}
                    className="hover:bg-zinc-50/50 transition-colors group"
                  >
                    {/* Patient */}
                    <TableCell className="py-4 px-4 text-zinc-900 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{bill.patients.name}</span>
                      </div>
                    </TableCell>

                    {/* Scan Type */}
                    <TableCell className="py-4 px-6 font-medium text-zinc-900 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <TextSearch className="w-4 h-4 text-zinc-400 shrink-0" />
                        <span>{bill.scanType}</span>
                      </div>
                    </TableCell>

                    {/* Total Amount */}
                    <TableCell className="py-4 px-4 text-center whitespace-nowrap text-zinc-700 font-medium">
                      ₹{bill.totalAmount.toLocaleString()}
                    </TableCell>

                    {/* Concession */}
                    <TableCell className="py-4 px-4 text-center whitespace-nowrap">
                      {bill.concession > 0 ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                          ₹{bill.concession}
                        </span>
                      ) : (
                        <span className="text-zinc-400">—</span>
                      )}
                    </TableCell>

                    {/* Due Amount */}
                    <TableCell className="py-4 px-4 text-center whitespace-nowrap">
                      {bill.dueAmount > 0 ? (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-100">
                          ₹{bill.dueAmount.toLocaleString()}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700">
                          Paid
                        </span>
                      )}
                    </TableCell>

                    {/* Date and Time */}
                    <TableCell className="py-4 px-4 text-center whitespace-nowrap text-zinc-700 font-medium">
                      {bill.createdAt ? (
                        <div className="flex flex-col items-center justify-center">
                          <span className="text-zinc-900 font-medium">
                            {new Date(bill.createdAt)
                              .toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "2-digit",
                              })
                              .replace(/\//g, "-")}
                          </span>
                          <span className="text-xs text-zinc-400 mt-0.5 font-normal">
                            {new Date(bill.createdAt).toLocaleTimeString(
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
                          <DropdownMenuItem>Export Bill</DropdownMenuItem>
                          <DropdownMenuItem>Update Bill</DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setBillId(bill.id);
                              setDeleteBillOpen(true);
                            }}
                          >
                            Delete Bill
                          </DropdownMenuItem>
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
      <DeleteBill
        deleteBillOpen={deleteBillOpen}
        setDeleteBillOpen={setDeleteBillOpen}
        id={billId}
        handleFetchAllBills={handleFetchAllBills}
      />
    </div>
  );
};

export default Billing;
