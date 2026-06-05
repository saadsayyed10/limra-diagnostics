import { Request, Response } from "express";
import * as billService from "../services/bill.service";
import { getAuth } from "@clerk/express";

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
    const { userId } = getAuth(req);
    if (!userId) {
      let errorMessage = "Unauthorized: Invalid token";
      console.log(errorMessage);
      return res.status(401).json({ error: errorMessage });
    }

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

export const fetchAllBillsController = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      let errorMessage = "Unauthorized: Invalid token";
      console.log(errorMessage);
      return res.status(401).json({ error: errorMessage });
    }

    const bills = await billService.fetchAllBillsService();
    res.status(200).json({ total: bills.length, bills });
  } catch (error: any) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
};

export const fetchSingleBillController = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params;

  try {
    const { userId } = getAuth(req);
    if (!userId) {
      let errorMessage = "Unauthorized: Invalid token";
      console.log(errorMessage);
      return res.status(401).json({ error: errorMessage });
    }

    const bill = await billService.fetchSingleBillService(id as string);
    res.status(200).json({ bill });
  } catch (error: any) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
};

export const updateBillController = async (req: Request, res: Response) => {
  const { id } = req.params;

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
    const { userId } = getAuth(req);
    if (!userId) {
      let errorMessage = "Unauthorized: Invalid token";
      console.log(errorMessage);
      return res.status(401).json({ error: errorMessage });
    }

    const bill = await billService.updateBillService(
      id as string,
      scanType,
      totalAmount,
      dueAmount,
      concession,
      docxUrl,
      patientId,
    );
    res.status(200).json({ message: "Bill updated", bill });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const deleteBillController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const { userId } = getAuth(req);
    if (!userId) {
      let errorMessage = "Unauthorized: Invalid token";
      console.log(errorMessage);
      return res.status(401).json({ error: errorMessage });
    }

    const bill = await billService.deleteBillService(id as string);
    res.status(204).json({ bill });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};
