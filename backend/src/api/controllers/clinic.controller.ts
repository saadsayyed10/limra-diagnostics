import e, { Request, Response } from "express";
import * as clinicService from "../services/clinic.service";
import { getAuth } from "@clerk/express";

export const syncClinicUserController = async (req: Request, res: Response) => {
  const { clerkId, name, email, profilePicUrl } = req.body;

  const data = { clerkId, name, email, profilePicUrl };
  if (!data) {
    let errorMessage = "Required fields are missing";
    console.log(errorMessage);
    return res.status(400).json({ error: errorMessage });
  }

  try {
    const clinic = await clinicService.syncClinicUserService(
      clerkId,
      name,
      email,
      profilePicUrl,
    );

    res.status(201).json({ message: "Clinic user synced to database", clinic });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const getClinicProfileController = async (
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

    const clinic = await clinicService.getClinicProfileService(userId);
    res.status(200).json({ clinic });
  } catch (error: any) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
};
