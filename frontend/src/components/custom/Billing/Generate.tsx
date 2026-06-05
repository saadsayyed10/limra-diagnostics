import { generateBillAPI } from "@/api/bill.api";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getToken } from "@clerk/react";
import { FileText, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface OBSPatients {
  id: string;
  name: string;
}

const GenerateBill = ({
  handleFetchAllBills,
  generateBillOpen,
  setGenerateBillOpen,
}: {
  handleFetchAllBills: () => void;
  generateBillOpen: boolean;
  setGenerateBillOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [obsPatientData, setObsPatientData] = useState<OBSPatients[]>([]);

  const [scanType, setScanType] = useState<string>("");
  const [patientId, setPatientId] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<string>("");
  const [concession, setConcession] = useState<string>("");
  const [dueAmount, setDueAmount] = useState<string>("");
  const [docxUrl, setDocxUrl] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const handleRegisterRegularPatient = async () => {
    setLoading(true);
    try {
      const token = await getToken();

      await generateBillAPI(
        scanType,
        Number(totalAmount),
        Number(dueAmount),
        Number(concession),
        docxUrl,
        patientId,
        token!,
      );
      handleFetchAllBills();

      setScanType("");
      setPatientId("");
      setTotalAmount("");
      setDueAmount("");
      setConcession("");
      setDocxUrl("");

      setGenerateBillOpen(false);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchAllOBSPatients = async () => {
    try {
      const token = await getToken();

      const res = await fetchAllPatientsAPI(token!, "OBS");
      setObsPatientData(res.data.patient);
      console.log(res.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    handleFetchAllOBSPatients();
  }, [obsPatientData]);

  return (
    <Dialog open={generateBillOpen} onOpenChange={setGenerateBillOpen}>
      <DialogTrigger asChild>
        <Button>
          Generate Bill <FileText />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Generate Bill</DialogTitle>
          <DialogDescription>
            Generate bill and get document file of the patient here. Click save
            when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        {/* Patient */}
        <div className="flex flex-col justify-start items-start w-full gap-y-2">
          <Label>Select Patient</Label>
          <Select value={patientId} onValueChange={setPatientId}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Showing all OBS patients</SelectLabel>
                {obsPatientData.map((obs) => (
                  <SelectItem value={obs.id}>{obs.name}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Scan type */}
        <div className="flex flex-col justify-start items-start w-full gap-y-2">
          <Label>Select Scan type</Label>
          <Select value={scanType} onValueChange={setScanType}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Scan Types</SelectLabel>
                <SelectItem value="ABDOMEN">Abdomen</SelectItem>
                <SelectItem value="PELVIS">Pelvis</SelectItem>
                <SelectItem value="CHEST">Chest</SelectItem>
                <SelectItem value="OBS">OBS USG</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Total Amount */}
        <div className="flex flex-col justify-start items-start w-full gap-y-2">
          <Label>Total Amount</Label>
          <Input
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
          />
        </div>

        {/* Concession */}
        <div className="flex flex-col justify-start items-start w-full gap-y-2">
          <Label>Concession</Label>
          <Input
            value={concession}
            onChange={(e) => setConcession(e.target.value)}
          />
        </div>

        {/* Due Amount */}
        <div className="flex flex-col justify-start items-start w-full gap-y-2">
          <Label>Due Amount</Label>
          <Input
            value={dueAmount}
            onChange={(e) => setDueAmount(e.target.value)}
          />
        </div>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleRegisterRegularPatient}>
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Save changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateBill;
