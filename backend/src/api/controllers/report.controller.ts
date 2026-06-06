import { Request, Response } from "express";
import * as reportService from "../services/report.service";
import { getAuth } from "@clerk/express";

export const generateReportController = async (req: Request, res: Response) => {
  const { scanType, findings, docxUrl, patientId } = req.body;

  const data = { scanType, findings, docxUrl, patientId };
  if (!data) {
    let errorMessage = "Required fields are missing";
    console.log(errorMessage);
    return res.status(400).json({ error: errorMessage });
  }

  try {
    const { userId } = getAuth(req);
    if (!userId) {
      let errorMessage = "Unauthorized: Please login to register obs patient";
      console.log(errorMessage);
      return res.status(401).json({ error: errorMessage });
    }

    const report = await reportService.generateReportService(
      scanType,
      findings,
      docxUrl,
      patientId,
      userId,
    );
    res.status(201).json({ message: "Report generated", report });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};
