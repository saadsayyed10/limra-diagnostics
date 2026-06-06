import { Request, Response } from "express";
import * as reportService from "../services/report.service";

export const generateReportController = async (req: Request, res: Response) => {
  const { scanType, findings, docxUrl, patientId, doctorId } = req.body;

  const data = { scanType, findings, docxUrl, patientId, doctorId };
  if (!data) {
    let errorMessage = "Required fields are missing";
    console.log(errorMessage);
    return res.status(400).json({ error: errorMessage });
  }

  try {
    const report = await reportService.generateReportService(
      scanType,
      findings,
      docxUrl,
      patientId,
      doctorId,
    );
    res.status(201).json({ message: "Report generated", report });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};
