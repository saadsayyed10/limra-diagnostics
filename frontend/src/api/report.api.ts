import axios from "axios";
import { apiUrl } from "./apiUrl";

export const generateReportAPI = async (
  scanType: string,
  findings: any,
  docxUrl: string,
  patientId: string,
  doctorName: string,
  token: string,
) => {
  return await axios.post(
    `${apiUrl}/report/generate`,
    {
      scanType,
      findings,
      docxUrl,
      patientId,
      doctorName,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const fetchAllReportAPI = async (token: string) => {
  return await axios.get(`${apiUrl}/report/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
