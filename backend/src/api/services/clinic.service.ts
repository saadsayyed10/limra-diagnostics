import prisma from "../../lib/orm";

export const syncClinicUserService = async (
  clerkId: string,
  name: string,
  email: string,
  profilePicUrl: string | null,
) => {
  const existing = await prisma.clinic.findUnique({
    where: {
      clerkId,
    },
  });
  if (existing) {
    throw new Error("Clinic user with this account already exists");
  }

  const clinic = await prisma.clinic.create({
    data: {
      clerkId,
      name,
      email,
      profilePicUrl,
    },
  });

  return clinic;
};

export const getClinicProfileService = async (clerkId: string) => {
  const clinic = await prisma.clinic.findUnique({
    where: {
      clerkId,
    },
  });

  if (clinic?.status === false && clinic.type === null) {
    throw new Error("Clinic user account is not approved");
  }

  return clinic;
};
