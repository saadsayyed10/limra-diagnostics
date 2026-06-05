import { deleteBillAPI } from "@/api/bill.api";
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

const DeleteBill = ({
  deleteBillOpen,
  setDeleteBillOpen,
  id,
  handleFetchAllBills,
}: {
  deleteBillOpen: boolean;
  setDeleteBillOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  handleFetchAllBills: () => void;
}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const token = await getToken();

      await deleteBillAPI(id, token!);
      handleFetchAllBills();

      setDeleteBillOpen(false);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={deleteBillOpen} onOpenChange={setDeleteBillOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            particular bill from our servers.
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

export default DeleteBill;
