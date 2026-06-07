import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { fetchEveryPatientsAPI } from "@/api/patient.api";
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
import { getToken, useUser } from "@clerk/react";
import { FileText, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { fetchTemplate } from "@/lib/fetch-template";
import { generateReportAPI } from "@/api/report.api";

interface OBSPatients {
  id: string;
  name: string;
  age: number;
}

const GenerateReport = ({
  handleFetchAllReports,
  generateReportOpen,
  setGenerateReportOpen,
}: {
  handleFetchAllReports: () => void;
  generateReportOpen: boolean;
  setGenerateReportOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [patientData, setPatientData] = useState<OBSPatients[]>([]);

  const [scanType, setScanType] = useState<string>("");
  const [patientId, setPatientId] = useState<string>("");

  const [lmp, setLmp] = useState<string>("");
  const [gaLmp, setGaLmp] = useState<string>("");
  const [eddLmp, setEddLmp] = useState<string>("");
  const [gSacMM, setGSacMM] = useState<string>("");
  const [gSacTime, setGSacTime] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useUser();

  const fillTemplate = (
    templateBuffer: ArrayBuffer,
    data: {
      patientName: string;
      patientAge: number;
      doctorName: string;
      lmp: string;
      gaLmp: string;
      eddLmp: string;
      gSacMM: string;
      gSacTime: string;
      createdAt: string;
    },
  ): Blob => {
    const zip = new PizZip(templateBuffer);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: { start: "{", end: "}" },
    });

    doc.render(data);

    const out = doc.getZip().generate({
      type: "blob",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    return out;
  };

  const uploadFilledDoc = async (
    blob: Blob,
    patientId: string,
  ): Promise<string> => {
    const fileName = `reports/${patientId}_${Date.now()}.docx`;

    const { error } = await supabase.storage
      .from("limra_bucket")
      .upload(fileName, blob, {
        contentType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        upsert: false,
      });

    if (error) throw error;

    const { data } = supabase.storage
      .from("limra_bucket")
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const handleGenerateBill = async () => {
    setLoading(true);
    try {
      const token = await getToken();

      const patient = patientData.find((p) => p.id === patientId);

      const templateBuffer = await fetchTemplate(
        "reports/GSAC_and_YSAC_Template.docx",
      );

      const formatDate = (date: string) => {
        if (!date) return "";

        const [year, month, day] = date.split("-");

        return `${day}/${month}/${year}`;
      };

      const filledBlob = fillTemplate(templateBuffer, {
        patientName: patient?.name,
        patientAge: patient?.age,
        doctorName: user?.fullName,
        lmp: formatDate(lmp),
        gaLmp: formatDate(gaLmp),
        eddLmp: formatDate(eddLmp),
        gSacMM,
        gSacTime,
        createdAt: new Date().toLocaleDateString("en-IN"),
      });

      const docxUrl = await uploadFilledDoc(filledBlob, patientId);
      const findings = {
        lmp: formatDate(lmp),
        gaLmp: formatDate(gaLmp),
        eddLmp: formatDate(eddLmp),
        gSacMM,
        gSacTime,
      };

      await generateReportAPI(
        scanType,
        findings,
        docxUrl,
        patient?.id,
        user?.fullName,
        token!,
      );
      handleFetchAllReports();

      setScanType("");
      setPatientId("");
      setLmp("");
      setGaLmp("");
      setEddLmp("");
      setGSacMM("");
      setGSacTime("");

      setGenerateReportOpen(false);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchAllOBSPatients = async () => {
    try {
      const token = await getToken();

      const res = await fetchEveryPatientsAPI(token!);
      setPatientData(res.data.patient);
      console.log(res.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    handleFetchAllOBSPatients();
  }, []);

  return (
    <Dialog open={generateReportOpen} onOpenChange={setGenerateReportOpen}>
      <DialogTrigger asChild>
        <Button>
          Generate Report <FileText />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Generate Report</DialogTitle>
          <DialogDescription>
            Generate report and get document file of the patient here. Click
            save when you&apos;re done.
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
                {patientData.map((obs) => (
                  <SelectItem key={obs.id} value={obs.id}>
                    {obs.name}
                  </SelectItem>
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
                <SelectItem value="TVS">Trans Vaginal Scan</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {scanType === "TVS" && (
          <div className="flex flex-col justify-start items-start w-full gap-y-6">
            {/* Last Menstrual Period */}
            <div className="flex flex-col justify-start items-start w-full gap-y-2">
              <Label>Last Menstrual Period</Label>
              <Input
                value={lmp}
                type="date"
                onChange={(e) => setLmp(e.target.value)}
              />
            </div>

            {/* G.A LMP */}
            <div className="flex flex-col justify-start items-start w-full gap-y-2">
              <Label>G.A LMP</Label>
              <Input
                value={gaLmp}
                type="date"
                onChange={(e) => setGaLmp(e.target.value)}
              />
            </div>

            {/* E.D.D LMP */}
            <div className="flex flex-col justify-start items-start w-full gap-y-2">
              <Label>E.D.D LMP</Label>
              <Input
                value={eddLmp}
                type="date"
                onChange={(e) => setEddLmp(e.target.value)}
              />
            </div>

            {/* G sac Size */}
            <div className="flex flex-col justify-start items-start w-full gap-y-2">
              <Label>G sac Size</Label>
              <Input
                value={gSacMM}
                placeholder="233mm"
                onChange={(e) => setGSacMM(e.target.value)}
              />
            </div>

            {/* G sac Time */}
            <div className="flex flex-col justify-start items-start w-full gap-y-2">
              <Label>G sac Time</Label>
              <Input
                value={gSacTime}
                placeholder="2 weeks 3 days"
                onChange={(e) => setGSacTime(e.target.value)}
              />
            </div>
          </div>
        )}

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleGenerateBill}>
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

export default GenerateReport;
