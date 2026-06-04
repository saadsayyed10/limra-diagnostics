import { registerOBSPatientAPI } from "@/api/patient.api";
import { Badge } from "@/components/ui/badge";
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
import { getToken } from "@clerk/react";
import { PlusCircle, X } from "lucide-react";
import { useState } from "react";

type AddressDetails = {
  localAddress: string;
  pincode: string;
  city: string;
  state: string;
};

const RegisterOBSPatient = ({
  handleFetchAllPatients,
  registerPatientOpen,
  setRegisterPatientOpen,
}: {
  handleFetchAllPatients: () => void;
  registerPatientOpen: boolean;
  setRegisterPatientOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [address, setAddress] = useState<AddressDetails>({
    localAddress: "",
    pincode: "",
    city: "",
    state: "",
  });
  const [husband, setHusband] = useState<string>("");
  const [livingBoys, setLivingBoys] = useState<string[]>([]);
  const [livingGirls, setLivingGirls] = useState<string[]>([]);
  const [aadharNumber, setAadharNumber] = useState<string>("");

  const [boyInput, setBoyInput] = useState("");
  const [girlInput, setGirlInput] = useState("");

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    type: "boys" | "girls",
  ) => {
    // Check if user pressed Enter and ensure they didn't just type empty spaces
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents the dialog form from accidentally submitting!

      if (type === "boys" && boyInput.trim() !== "") {
        setLivingBoys((prev) => [...prev, boyInput.trim()]);
        setBoyInput(""); // Reset the input field
      } else if (type === "girls" && girlInput.trim() !== "") {
        setLivingGirls((prev) => [...prev, girlInput.trim()]);
        setGirlInput(""); // Reset the input field
      }
    }
  };

  const removeAge = (indexToRemove: number, type: "boys" | "girls") => {
    if (type === "boys") {
      setLivingBoys((prev) =>
        prev.filter((_, index) => index !== indexToRemove),
      );
    } else {
      setLivingGirls((prev) =>
        prev.filter((_, index) => index !== indexToRemove),
      );
    }
  };

  const handleRegisterOBSPatient = async () => {
    try {
      const token = await getToken();
      console.log(livingBoys);
      console.log(livingGirls);

      await registerOBSPatientAPI(
        name,
        phone,
        Number(age),
        address,
        husband,
        livingBoys,
        livingGirls,
        aadharNumber,
        token!,
      );
      console.log("Patient Registered");
      handleFetchAllPatients();

      setName("");
      setPhone("");
      setAge("");
      setHusband("");
      setAddress({ localAddress: "", pincode: "", city: "", state: "" });
      setLivingBoys([]);
      setLivingGirls([]);
      setAadharNumber("");

      setRegisterPatientOpen(false);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <Dialog open={registerPatientOpen} onOpenChange={setRegisterPatientOpen}>
      <DialogTrigger asChild>
        <Button>
          Patient <PlusCircle />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Register OBS Patient</DialogTitle>
          <DialogDescription>
            Add OBS patient to database here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        {/* Name */}
        <div className="flex flex-col justify-start items-start w-full gap-y-2">
          <Label>Full Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        {/* Phone */}
        <div className="flex flex-col justify-start items-start w-full gap-y-2">
          <Label>Contact Number</Label>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>

        {/* Age (Fixed Label) */}
        <div className="flex flex-col justify-start items-start w-full gap-y-2">
          <Label>Age</Label>
          <Input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            type="number"
          />
        </div>

        {/* Husband */}
        <div className="flex flex-col justify-start items-start w-full gap-y-2">
          <Label>Husband's Name</Label>
          <Input value={husband} onChange={(e) => setHusband(e.target.value)} />
        </div>

        {/* Nested Address Objects */}
        <div className="flex flex-col justify-start items-start w-full gap-y-2 ">
          <span className="text-sm font-semibold">Address Details</span>

          <div className="flex flex-col justify-start items-start w-full gap-y-1 mt-1">
            <Label className="text-xs">Local Address</Label>
            <Input
              value={address.localAddress}
              onChange={(e) =>
                setAddress((prev) => ({
                  ...prev,
                  localAddress: e.target.value,
                }))
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-2 w-full mt-1">
            <div className="flex flex-col justify-start items-start gap-y-1">
              <Label className="text-xs">Pincode</Label>
              <Input
                value={address.pincode}
                onChange={(e) =>
                  setAddress((prev) => ({
                    ...prev,
                    pincode: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col justify-start items-start gap-y-1">
              <Label className="text-xs">City</Label>
              <Input
                value={address.city}
                onChange={(e) =>
                  setAddress((prev) => ({
                    ...prev,
                    city: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="flex flex-col justify-start items-start w-full gap-y-1 mt-1">
            <Label className="text-xs">State</Label>
            <Input
              value={address.state}
              onChange={(e) =>
                setAddress((prev) => ({
                  ...prev,
                  state: e.target.value,
                }))
              }
            />
          </div>
        </div>

        {/* Living Boys */}
        <div className="flex flex-col justify-start items-start w-full gap-y-2">
          <Label>Living Boys (Ages)</Label>
          <Input
            placeholder="Type age and press Enter..."
            value={boyInput}
            onChange={(e) => setBoyInput(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, "boys")}
          />

          {/* Render added boy ages */}
          <div className="flex flex-wrap gap-1 mt-1">
            {livingBoys.map((age, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="flex items-center gap-x-1"
              >
                {age}
                <X
                  className="w-3 h-3 cursor-pointer text-muted-foreground hover:text-destructive"
                  onClick={() => removeAge(index, "boys")}
                />
              </Badge>
            ))}
          </div>
        </div>

        {/* Living Girls */}
        <div className="flex flex-col justify-start items-start w-full gap-y-2">
          <Label>Living Girls (Ages)</Label>
          <Input
            placeholder="Type age and press Enter..."
            value={girlInput}
            onChange={(e) => setGirlInput(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, "girls")}
          />
          {/* Render added girl ages */}
          <div className="flex flex-wrap gap-1 mt-1">
            {livingGirls.map((age, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="flex items-center gap-x-1"
              >
                {age}
                <X
                  className="w-3 h-3 cursor-pointer text-muted-foreground hover:text-destructive"
                  onClick={() => removeAge(index, "girls")}
                />
              </Badge>
            ))}
          </div>
        </div>

        {/* Aadhar Number */}
        <div className="flex flex-col justify-start items-start w-full gap-y-2">
          <Label>Aadhar Number</Label>
          <Input
            value={aadharNumber}
            onChange={(e) => setAadharNumber(e.target.value)}
            placeholder="0000 0000 0000 0000"
          />
        </div>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleRegisterOBSPatient}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterOBSPatient;
