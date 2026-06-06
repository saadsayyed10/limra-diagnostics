import { ScanType } from "@prisma/client";
import prisma from "../../lib/orm";

export const generateReportService = async (
  scanType: ScanType,
  findings: any,
  docxUrl: string,
  patientId: string,
  doctorId: string,
) => {
  const report = await prisma.reports.create({
    data: {
      scanType,
      findings,
      docxUrl,
      patientId,
      doctorId,
    },
  });

  return report;
};

export const fetchAllReports = async () => {
  return await prisma.reports.findMany();
};
