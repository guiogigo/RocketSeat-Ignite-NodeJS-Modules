import { makeFetchNearbyOrgsUseCase } from "@/use-cases/factories/make-fetch-nearby-orgs-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetchNearbyOrgController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const FetchNearbyQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = FetchNearbyQuerySchema.parse(req.query);

  try {
    const fetchNearbyUseCase = makeFetchNearbyOrgsUseCase();
    const { orgs } = await fetchNearbyUseCase.execute({
      orgLatitude: latitude,
      orgLongitude: longitude,
    });

    return res.status(200).send({ orgs });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
}
