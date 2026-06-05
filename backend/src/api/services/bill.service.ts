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
    orderBy: {
      patients: {
        name: "asc",
      },
    },
  });
};

export const fetchSingleBillService = async (id: string) => {
  return await prisma.bills.findUnique({
    where: {
      id,
    },
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

export const updateBillService = async (
  id: string,
  scanType: ScanType,
  totalAmount: number,
  dueAmount: number,
  concession: number,
  docxUrl: string,
  patientId: string,
) => {
  return await prisma.bills.update({
    where: {
      id,
    },
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

export const deleteBillService = async (id: string) => {
  return await prisma.bills.delete({
    where: {
      id,
    },
  });
};
