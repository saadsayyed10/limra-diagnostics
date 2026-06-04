import { getAuth } from "@clerk/express";
import { Request, Response } from "express";

const middlewareCheck = async (req: Request, res: Response) => {
  const { userId } = getAuth(req);
  if (!userId) {
    let errorMessage = "Unauthorized: Please login to perform this activity";
    console.log(errorMessage);
    return res.status(401).json({ error: errorMessage });
  }
};
