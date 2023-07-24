import { createContext } from "react";

export type StateContextType = {
  applicationId: string;
  port: string;
  accountId: string;
};

export const StateContext = createContext<StateContextType>({
  applicationId: "",
  port: "",
  accountId: "",
});

export const StateContextProvider = StateContext.Provider;
