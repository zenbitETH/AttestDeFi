"use client";

import { gql, useQuery } from "@apollo/client";

export default function Disperse() {
  const GET_ATTESTATIONS = gql`
    query Attestations {
      attestations(
        where: {
          schemaId: { equals: "0xddc12d29e4863e857d1b6429f2afd4bf3d687110bbb425e730b87d5f1efcda5a" }
          attester: { equals: "0xe2A45CA9Ec5780FC389FBD8991980397b8B470AF" }
        }
      ) {
        id
        attester
        recipient
        schemaId
      }
    }
  `;

  const { data, error, loading } = useQuery(GET_ATTESTATIONS);

  console.log({ data, loading, error });
  // Subgraph maybe not yet configured
  if (error) {
    return <>error</>;
  }
  return <div>page</div>;
}
