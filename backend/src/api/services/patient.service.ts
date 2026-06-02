import { PatientType } from "@prisma/client";
import prisma from "../../lib/orm";

export const registerRegularPatientService = async (
  name: string,
  phone: string,
  age: number,
  address: {
    localAddress: string;
    pincode: string;
    city: string;
    state: string;
  },
) => {
  const existing = await prisma.patients.findUnique({
    where: {
      phone,
    },
  });
  if (existing) {
    throw new Error("Patient account already exists");
  }

  const patient = await prisma.patients.create({
    data: {
      name,
      phone,
      age,
      address,
      patientType: PatientType.REGULAR,
    },
  });

  return patient;
};
