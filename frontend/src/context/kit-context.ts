import { createContext } from "react";
import { Contract, AccountInterface } from "starknet";

// Define the context type
interface KitContextType {
  agrovestContract: Contract | null;
  readAgrovestContract: Contract | null;
  strkContract: Contract | null;
  address: string | undefined;
  account: AccountInterface | undefined;
}

// Create context with proper typing
export const KitContext = createContext<KitContextType>({
  agrovestContract: null,
  readAgrovestContract: null,
  strkContract: null,
  address: undefined,
  account: undefined,
});