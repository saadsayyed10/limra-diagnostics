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
  livingBoys: string[],
  livingGirls: string[],
  aadharNumber: string,
  lastMenstural: string,
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
      lastMenstural,
    },
  });

  return patient;
};

export const fetchAllPatientsService = async (patientType: PatientType) => {
  return await prisma.patients.findMany({
    where: {
      patientType,
    },
    orderBy: {
      name: "asc",
    },
  });
};

export const fetchEveryPatientsService = async () => {
  return await prisma.patients.findMany({
    orderBy: {
      name: "asc",
    },
  });
};

export const fetchSinglePatientService = async (id: string) => {
  return await prisma.patients.findUnique({
    where: {
      id,
    },
  });
};

export const updatePatientService = async (
  id: string,
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
  aadharNumber: string,
) => {
  const patient = await prisma.patients.update({
    where: {
      id,
    },
    data: {
      name,
      phone,
      age,
      address,
      husband,
      aadharNumber,
    },
  });

  return patient;
};

export const deletePatientService = async (id: string) => {
  return await prisma.patients.delete({
    where: {
      id,
    },
  });
};
