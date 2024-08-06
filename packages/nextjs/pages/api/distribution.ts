import type { NextApiRequest, NextApiResponse } from "next";
import {
  createDistribution,
  getAllDistributions,
  getDistributionByDatabaseId,
} from "~~/lib/actions/distribution.actions";

// Define a type for the response data
type ResponseData = {
  message: string;
  data?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === "GET") {
    try {
      const id = req.query.id as string;

      if (id) {
        const result = await getDistributionByDatabaseId(id);
        res.status(200).json({ data: result, message: "Get distribution data successfully" });
      } else {
        const result = await getAllDistributions();
        res.status(200).json({ data: result, message: "Get distributions data successfully" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    try {
      const result = await createDistribution(req.body);

      res.status(200).json({ data: result, message: "Distribution created successfully" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
