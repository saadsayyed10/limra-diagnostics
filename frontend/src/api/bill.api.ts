import axios from "axios";
import { apiUrl } from "./apiUrl";

export const generateBillAPI = async (
  scanType: string,
  totalAmount: number,
  dueAmount: number,
  concession: number,
  docxUrl: string,
  patientId: string,
  token: string,
) => {
  return await axios.post(
    `${apiUrl}/bill/generate`,
    {
      scanType,
      totalAmount,
      dueAmount,
      concession,
      docxUrl,
      patientId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const fetchAllBillsAPI = async (token: string) => {
  return await axios.get(`${apiUrl}/bill/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchSingleBillAPI = async (id: string, token: string) => {
  return await axios.get(`${apiUrl}/bill/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateBillAPI = async (
  id: string,
  scanType: string,
  totalAmount: number,
  dueAmount: number,
  concession: number,
  docxUrl: string,
  patientId: string,
  token: string,
) => {
  return await axios.put(
    `${apiUrl}/bill/update/${id}`,
    {
      scanType,
      totalAmount,
      dueAmount,
      concession,
      docxUrl,
      patientId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const deleteBillAPI = async (id: string, token: string) => {
  return await axios.delete(`${apiUrl}/bill/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
