/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  84532: {
    Disperse: {
      address: "0xb9B09413Ca88a523a61Bc3A85Ff04B3c04E0aFE8",
      abi: [
        {
          inputs: [
            {
              internalType: "address[]",
              name: "recipients",
              type: "address[]",
            },
            {
              internalType: "uint256[]",
              name: "values",
              type: "uint256[]",
            },
          ],
          name: "disperseEther",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "contract IERC20",
              name: "tokenAddress",
              type: "address",
            },
            {
              internalType: "address payable[]",
              name: "recipients",
              type: "address[]",
            },
            {
              internalType: "uint256[]",
              name: "values",
              type: "uint256[]",
            },
          ],
          name: "disperseToken",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      inheritedFunctions: {},
    },
  },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;
