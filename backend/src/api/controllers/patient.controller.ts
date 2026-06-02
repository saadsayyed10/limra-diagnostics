import { Request, Response } from "express";
import * as patientService from "../services/patient.service";
import { getAuth } from "@clerk/express";

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
