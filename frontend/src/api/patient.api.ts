import axios from "axios";
import { apiUrl } from "./apiUrl";

export const registerRegularPatientAPI = async (
  name: string,
  phone: string,
  age: number,
  address: {
    localAddress: string;
    pincode: string;
    city: string;
    state: string;
  },
  token: string,
) => {
  return await axios.post(
    `${apiUrl}/patient/register/regular`,
    {
      name,
      phone,
      age,
      address,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const registerOBSPatientAPI = async (
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
  token: string,
) => {
  return await axios.post(
    `${apiUrl}/patient/register/obs`,
    {
      name,
      phone,
      age,
      address,
      husband,
      livingBoys,
      livingGirls,
      aadharNumber,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const fetchAllPatientsAPI = async (
  token: string,
  patientType: "REGULAR" | "OBS",
) => {
  return axios.get(`${apiUrl}/patient/all?patientType=${patientType}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deletePatientAPI = async (id: string, token: string) => {
  return axios.delete(`${apiUrl}/patient/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updatePatientAPI = async (
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
  token: string,
) => {
  return await axios.post(
    `${apiUrl}/patient/update/${id}`,
    {
      name,
      phone,
      age,
      address,
      husband,
      livingBoys,
      livingGirls,
      aadharNumber,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
