import { createContext, useContext } from "react";

export const StepContext = createContext(0);

export function useStep(): number {
    return useContext(StepContext);
}
