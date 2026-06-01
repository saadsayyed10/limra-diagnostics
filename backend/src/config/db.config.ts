import prisma from "../lib/orm";

export const connectToDB = async () => {
  try {
    prisma.$connect();

    console.log("Connected to PostgreSQL DB");
  } catch (error: any) {
    console.log(`Error connecting to PostgreSQL DB `, error.message);
  }
};
