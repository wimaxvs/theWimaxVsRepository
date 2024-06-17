// /pages/api/drivers.ts
import type { NextApiRequest, NextApiResponse } from "next";
import getAllDrivers from "@/app/actions/getAllDrivers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const allTheDrivers = await getAllDrivers();
    res.status(200).json(allTheDrivers);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
