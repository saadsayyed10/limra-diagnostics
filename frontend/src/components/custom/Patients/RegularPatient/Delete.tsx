import { deletePatientAPI } from "@/api/patient.api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getToken } from "@clerk/react";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const DeleteRegularPatient = ({
  deletePatientOpen,
  setDeletePatientOpen,
  id,
  handleFetchAllPatients,
}: {
  deletePatientOpen: boolean;
  setDeletePatientOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  handleFetchAllPatients: () => void;
}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const token = await getToken();

      await deletePatientAPI(id, token!);
      handleFetchAllPatients();

      setDeletePatientOpen(false);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={deletePatientOpen} onOpenChange={setDeletePatientOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete Regular
            Patient account from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} variant="destructive">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteRegularPatient;
