import { ScanType } from "@prisma/client";
import prisma from "../../lib/orm";

export const generateBillService = async (
  scanType: ScanType,
  totalAmount: number,
  dueAmount: number,
  concession: number,
  docxUrl: string,
  patientId: string,
) => {
  return await prisma.bills.create({
    data: {
      scanType,
      totalAmount,
      dueAmount,
      concession,
      docxUrl,
      patientId,
    },
  });
};
