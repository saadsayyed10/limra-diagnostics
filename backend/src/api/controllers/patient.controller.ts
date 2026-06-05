import { Request, Response } from "express";
import * as patientService from "../services/patient.service";
import { getAuth } from "@clerk/express";
import { PatientType } from "@prisma/client";

export const registerRegularPatientController = async (
  req: Request,
  res: Response,
) => {
  const { name, phone, age, address } = req.body;

  const data = { name, phone, age, address };
  if (!data) {
    let errorMessage = "Required fields are missing";
    console.log(errorMessage);
    return res.status(400).json({ error: errorMessage });
  }

  try {
    const { userId } = getAuth(req);
    if (!userId) {
      let errorMessage =
        "Unauthorized: Please login to register regular patient";
      console.log(errorMessage);
      return res.status(401).json({ error: errorMessage });
    }

    const patient = await patientService.registerRegularPatientService(
      name,
      phone,
      age,
      address,
    );
    res.status(201).json({ message: "Regular patient registered", patient });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const registerOBSPatientController = async (
  req: Request,
  res: Response,
) => {
  const {
    name,
    phone,
    age,
    address,
    husband,
    livingBoys,
    livingGirls,
    aadharNumber,
  } = req.body;

  const data = {
    name,
    phone,
    age,
    address,
    husband,
    livingBoys,
    livingGirls,
    aadharNumber,
  };
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

    const patient = await patientService.registerOBSPatientService(
      name,
      phone,
      age,
      address,
      husband,
      livingBoys,
      livingGirls,
      aadharNumber,
    );
    res.status(201).json({ message: "OBS patient registered", patient });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const fetchAllPatientsController = async (
  req: Request,
  res: Response,
) => {
  const { patientType } = req.query;

  try {
    const { userId } = getAuth(req);
    if (!userId) {
      let errorMessage = "Unauthorized: Invalid token";
      console.log(errorMessage);
      return res.status(401).json({ error: errorMessage });
    }

    const patient = await patientService.fetchAllPatientsService(
      patientType as PatientType,
    );
    res.status(200).json({ total: patient.length, patient });
  } catch (error: any) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
};

export const fetchEveryPatientsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      let errorMessage = "Unauthorized: Invalid token";
      console.log(errorMessage);
      return res.status(401).json({ error: errorMessage });
    }

    const patient = await patientService.fetchEveryPatientsService();
    res.status(200).json({ total: patient.length, patient });
  } catch (error: any) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
};

export const fetchSinglePatientServiceController = async (
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

    const patient = await patientService.fetchSinglePatientService(
      id as string,
    );
    res.status(200).json({ patient });
  } catch (error: any) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
};

export const deletePatientController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const { userId } = getAuth(req);
    if (!userId) {
      let errorMessage = "Unauthorized: Invalid token";
      console.log(errorMessage);
      return res.status(401).json({ error: errorMessage });
    }

    const patient = await patientService.deletePatientService(id as string);
    res.status(204).json({ message: "Deleted patient account", patient });
  } catch (error: any) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
};

export const updatePatientController = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    let errorMessage = "ID not found in params";
    console.log(errorMessage);
    return res.status(400).json({ error: errorMessage });
  }

  const { name, phone, age, address, husband, aadharNumber } = req.body;

  const data = {
    name,
    phone,
    age,
    address,
    husband,
    aadharNumber,
  };
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

    const patient = await patientService.updatePatientService(
      id as string,
      name,
      phone,
      age,
      address,
      husband,
      aadharNumber,
    );
    res.status(200).json({ message: "Patient updated", patient });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};
