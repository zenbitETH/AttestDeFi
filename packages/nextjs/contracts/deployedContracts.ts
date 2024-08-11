/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  919: {
    Disperse: {
      address: "0x29F1109FAE13c7a356b36b3Be4eF65045f5F5D40",
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
  8453: {
    Disperse: {
      address: "0xA7210b419372222429f2A692B253BAeb50AEa12a",
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
  31337: {
    Disperse: {
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
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
