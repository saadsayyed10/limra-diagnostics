import { ScanType } from "@prisma/client";
import prisma from "../../lib/orm";

export const generateReportService = async (
  scanType: ScanType,
  findings: any,
  docxUrl: string,
  patientId: string,
  doctorName: string,
) => {
  const report = await prisma.reports.create({
    data: {
      scanType,
      findings,
      docxUrl,
      patientId,
      doctorName,
    },
  });

  return report;
};

export const fetchAllReportsService = async () => {
  return await prisma.reports.findMany({
    select: {
      id: true,
      scanType: true,
      docxUrl: true,
      doctorName: true,
      patients: {
        select: {
          name: true,
          patientType: true,
        },
      },
      createdAt: true,
    },
  });
};
