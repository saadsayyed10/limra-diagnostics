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

export const fetchAllBillsService = async () => {
  return await prisma.bills.findMany({
    select: {
      id: true,
      scanType: true,
      totalAmount: true,
      dueAmount: true,
      concession: true,
      docxUrl: true,
      createdAt: true,
      patients: {
        select: {
          id: true,
          name: true,
          phone: true,
          patientType: true,
        },
      },
    },
  });
};
