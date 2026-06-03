import { fetchAllPatientsAPI } from "@/api/patient.api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getToken } from "@clerk/react";
import {
  MoreHorizontal,
  Users,
  MapPin,
  Phone,
  Calendar,
  Filter,
  PlusCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface OBSPatient {
  id: string;
  name: string;
  phone: string;
  age: number;
  address: {
    localAddress: string;
    pincode: string;
    city: string;
    state: string;
  };
  husband: string;
  livingBoys: [
    {
      age: "";
    },
  ];
  livingGirls: [
    {
      age: "";
    },
  ];
  aadharNumber: string;
}

const OBSPatients = () => {
  const [obsData, setObsData] = useState<OBSPatient[] | []>([]);
  const [loading, setLoading] = useState(true);

  const handleFetchAllPatients = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const res = await fetchAllPatientsAPI(token!, "OBS");
      setObsData(res.data.patient);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchAllPatients();
  }, []);

  return (
    <div className="w-full space-y-6 lg:p-6">
      {/* Header Block */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
            OBS Patients
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Manage and view comprehensive records of obstetric patients.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-zinc-100 px-3 py-1.5 rounded-lg text-sm font-medium text-zinc-700 w-fit self-start sm:self-center">
          <Users className="w-4 h-4 text-zinc-500" />
          <span>Total Records: {obsData.length}</span>
        </div>
      </div>

      <div className="flex justify-between items-center w-full">
        <Input placeholder="Search for OBS Patients..." className="w-80" />
        <div className="flex justify-end items-end w-full gap-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>Filter Patient Type</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Link to={"/patients/obs"}>Obstetric</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to={"/patients/regular"}>Regular</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                Patient <PlusCircle />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Register OBS Patient</DialogTitle>
                <DialogDescription>
                  Add OBS patient to database here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>

              {/* Name */}
              <div className="flex flex-col justify-start items-start w-full gap-y-2">
                <Label>Full Name</Label>
                <Input />
              </div>

              {/* Phone */}
              <div className="flex flex-col justify-start items-start w-full gap-y-2">
                <Label>Contact Number</Label>
                <Input />
              </div>

              {/* Age (Fixed Label) */}
              <div className="flex flex-col justify-start items-start w-full gap-y-2">
                <Label>Age</Label>
                <Input type="number" />
              </div>

              {/* Husband */}
              <div className="flex flex-col justify-start items-start w-full gap-y-2">
                <Label>Husband's Name</Label>
                <Input />
              </div>

              {/* Nested Address Objects */}
              <div className="flex flex-col justify-start items-start w-full gap-y-2 ">
                <span className="text-sm font-semibold">Address Details</span>

                <div className="flex flex-col justify-start items-start w-full gap-y-1 mt-1">
                  <Label className="text-xs">Local Address</Label>
                  <Input />
                </div>

                <div className="grid grid-cols-2 gap-2 w-full mt-1">
                  <div className="flex flex-col justify-start items-start gap-y-1">
                    <Label className="text-xs">Pincode</Label>
                    <Input />
                  </div>
                  <div className="flex flex-col justify-start items-start gap-y-1">
                    <Label className="text-xs">City</Label>
                    <Input />
                  </div>
                </div>

                <div className="flex flex-col justify-start items-start w-full gap-y-1 mt-1">
                  <Label className="text-xs">State</Label>
                  <Input />
                </div>
              </div>

              {/* Living Boys */}
              <div className="flex flex-col justify-start items-start w-full gap-y-2">
                <Label>Living Boys (Ages)</Label>
                <Input placeholder="e.g., 10 years old" />
              </div>

              {/* Living Girls */}
              <div className="flex flex-col justify-start items-start w-full gap-y-2">
                <Label>Living Girls (Ages)</Label>
                <Input placeholder="e.g., 36 months old" />
              </div>

              {/* Aadhar Number */}
              <div className="flex flex-col justify-start items-start w-full gap-y-2">
                <Label>Aadhar Number</Label>
                <Input placeholder="0000 0000 0000 0000" />
              </div>

              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl border border-zinc-200/80 shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader className="bg-zinc-50/70 subtle-bottom-border">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-start font-semibold text-zinc-700 py-4 px-6 whitespace-nowrap">
                  Name
                </TableHead>
                <TableHead className="text-start font-semibold text-zinc-700 py-4 px-4 whitespace-nowrap">
                  Husband
                </TableHead>
                <TableHead className="text-center font-semibold text-zinc-700 py-4 px-4 whitespace-nowrap">
                  Living Offspring
                </TableHead>
                <TableHead className="text-center font-semibold text-zinc-700 py-4 px-4 whitespace-nowrap">
                  Age
                </TableHead>
                <TableHead className="text-start font-semibold text-zinc-700 py-4 px-4 whitespace-nowrap">
                  Contact Details
                </TableHead>
                <TableHead className="text-start font-semibold text-zinc-700 py-4 px-4 whitespace-nowrap">
                  Aadhar Number
                </TableHead>
                <TableHead className="text-start font-semibold text-zinc-700 py-4 px-4 whitespace-nowrap">
                  Address
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
                    colSpan={8}
                    className="text-center py-10 text-zinc-400"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin" />
                      <span>Loading patient database...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : obsData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-12 text-zinc-500 font-medium"
                  >
                    No records found
                  </TableCell>
                </TableRow>
              ) : (
                obsData.map((obs) => (
                  <TableRow
                    key={obs.id}
                    className="hover:bg-zinc-50/50 transition-colors group"
                  >
                    {/* Name */}
                    <TableCell className="py-4 px-6 font-medium text-zinc-900 whitespace-nowrap">
                      {obs.name}
                    </TableCell>

                    {/* Husband */}
                    <TableCell className="py-4 px-4 text-zinc-600 whitespace-nowrap">
                      {obs.husband || "—"}
                    </TableCell>

                    {/* Living Offspring Summary */}
                    <TableCell className="py-4 px-4 text-center whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                        Boys: {obs.livingBoys?.length || 0}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-pink-50 text-pink-700 border border-pink-100 ml-2">
                        Girls: {obs.livingGirls?.length || 0}
                      </span>
                    </TableCell>

                    {/* Age */}
                    <TableCell className="py-4 px-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5 text-zinc-700">
                        <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{obs.age} yrs</span>
                      </div>
                    </TableCell>

                    {/* Contact */}
                    <TableCell className="py-4 px-4 text-zinc-600 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{obs.phone}</span>
                      </div>
                    </TableCell>

                    {/* National Identity Tracking */}
                    <TableCell className="py-4 px-4 font-mono text-xs tracking-wider text-zinc-500 whitespace-nowrap">
                      {obs.aadharNumber || "—"}
                    </TableCell>

                    {/* Address */}
                    <TableCell className="py-4 px-4 text-zinc-600 max-w-60">
                      <div className="flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-zinc-400 mt-0.5 shrink-0" />
                        <span
                          className="truncate block"
                          title={`${obs.address.localAddress}, ${obs.address.city} - ${obs.address.pincode}, ${obs.address.state}`}
                        >
                          {obs.address.localAddress}
                        </span>
                      </div>
                    </TableCell>

                    {/* Actions Button */}
                    <TableCell className="py-4 px-6 text-end whitespace-nowrap">
                      <button className="p-1.5 hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 rounded-lg transition-colors inline-flex items-center justify-center">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
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

export default OBSPatients;
