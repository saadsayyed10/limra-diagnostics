import { Request, Response } from "express";
import * as billService from "../services/bill.service";

export const generateBillController = async (req: Request, res: Response) => {
  const { scanType, totalAmount, dueAmount, concession, docxUrl, patientId } =
    req.body;

  const data = {
    scanType,
    totalAmount,
    dueAmount,
    concession,
    docxUrl,
    patientId,
  };
  if (!data) {
    const errorMessage = "Required fields are missing";
    console.log(errorMessage);
    return res.status(400).json({ error: errorMessage });
  }

  try {
    const bill = await billService.generateBillService(
      scanType,
      totalAmount,
      dueAmount,
      concession,
      docxUrl,
      patientId,
    );
    res.status(201).json({ message: "Bill generated", bill });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};
