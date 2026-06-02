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

export const registerOBSPatientService = async (
  name: string,
  phone: string,
  age: number,
  address: {
    localAddress: string;
    pincode: string;
    city: string;
    state: string;
  },
  husband: string,
  livingBoys: [
    {
      age: "";
    },
  ],
  livingGirls: [
    {
      age: "";
    },
  ],
  aadharNumber: string,
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
      patientType: PatientType.OBS,
      husband,
      livingBoys,
      livingGirls,
      aadharNumber,
    },
  });

  if (!livingBoys) {
    livingBoys = [
      {
        age: "",
      },
    ];
  }

  if (!livingGirls) {
    livingGirls = [
      {
        age: "",
      },
    ];
  }

  return patient;
};
