import { connectToDatabase } from "../database";
import Distribution from "../database/models/distribution.model";
import { handleError } from "../utils";

interface CreateDistribution {
  distribution_name: string;
  distribution_date: string;
  distribution_mode: string;
  custom_token_address: string;
}

export async function createDistribution(body: CreateDistribution) {
  try {
    await connectToDatabase();
    const result = await Distribution.create({
      name: body.distribution_name,
      date: new Date(body.distribution_date).getTime(),
      mode: body.distribution_mode,
      erc20: body.custom_token_address || "",
    });

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    handleError(error);
  }
}

export async function getDistributionByDatabaseId(id: string) {
  try {
    await connectToDatabase();

    const result = await Distribution.findById(id);

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    handleError(error);
  }
}

export async function getAllDistributions() {
  try {
    await connectToDatabase();

    const result = await Distribution.find();

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    handleError(error);
  }
}
