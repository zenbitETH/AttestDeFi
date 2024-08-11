import { create } from "zustand";
import scaffoldConfig from "~~/scaffold.config";
import { ChainWithAttributes } from "~~/utils/scaffold-eth";

/**
 * Zustand Store
 *
 * You can add global state to the app using this useGlobalState, to get & set
 * values from anywhere in the app.
 *
 * Think about it as a global useState.
 */

type GlobalState = {
  nativeCurrency: {
    price: number;
    isFetching: boolean;
  };
  setNativeCurrencyPrice: (newNativeCurrencyPriceState: number) => void;
  setIsNativeCurrencyFetching: (newIsNativeCurrencyFetching: boolean) => void;
  targetNetwork: ChainWithAttributes;
  setTargetNetwork: (newTargetNetwork: ChainWithAttributes) => void;
  disperseFormData: {
    baseNetwork: string;
    schemaID: string;
    attesterAddress: string;
    attesterENS: string;
    destinationNetwork: string;
    typeOfReward: string;
    erc20address: string;
  };
  setDisperseFormData: (key: string, newValue: string) => void;
};

export const useGlobalState = create<GlobalState>(set => ({
  nativeCurrency: {
    price: 0,
    isFetching: true,
  },
  disperseFormData: {
    baseNetwork: "",
    schemaID: "",
    attesterAddress: "",
    attesterENS: "",
    destinationNetwork: "",
    typeOfReward: "",
    erc20address: "",
  },
  setDisperseFormData: (key: string, newValue: string): void =>
    set(state => ({ disperseFormData: { ...state.disperseFormData, [key]: newValue } })),
  setNativeCurrencyPrice: (newValue: number): void =>
    set(state => ({ nativeCurrency: { ...state.nativeCurrency, price: newValue } })),
  setIsNativeCurrencyFetching: (newValue: boolean): void =>
    set(state => ({ nativeCurrency: { ...state.nativeCurrency, isFetching: newValue } })),
  targetNetwork: scaffoldConfig.targetNetworks[0],
  setTargetNetwork: (newTargetNetwork: ChainWithAttributes) => set(() => ({ targetNetwork: newTargetNetwork })),
}));
