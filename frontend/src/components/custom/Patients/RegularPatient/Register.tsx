import { registerRegularPatientAPI } from "@/api/patient.api";
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
import { PlusCircle } from "lucide-react";
import { useState } from "react";

type AddressDetails = {
  localAddress: string;
  pincode: string;
  city: string;
  state: string;
};

const RegisterRegularPatient = ({
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

  const handleRegisterRegularPatient = async () => {
    try {
      const token = await getToken();

      await registerRegularPatientAPI(
        name,
        phone,
        Number(age),
        address,
        token!,
      );
      console.log("Patient Registered");
      handleFetchAllPatients();

      setName("");
      setPhone("");
      setAge("");
      setAddress({ localAddress: "", pincode: "", city: "", state: "" });

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
          <DialogTitle>Register Regular Patient</DialogTitle>
          <DialogDescription>
            Add regular patient to database here. Click save when you&apos;re
            done.
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

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleRegisterRegularPatient}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterRegularPatient;
