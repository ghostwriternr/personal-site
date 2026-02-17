import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";

export interface SlideAction {
    id: string;
    label: ReactNode;
    onClick: () => void;
}

interface SlideActionsContextValue {
    actions: SlideAction[];
    setActions: (actions: SlideAction[]) => void;
}

export const SlideActionsContext = createContext<SlideActionsContextValue>({
    actions: [],
    setActions: () => {},
});

export function useSlideActions(actions: SlideAction[]): void {
    const { setActions } = useContext(SlideActionsContext);

    useEffect(() => {
        setActions(actions);
        return () => setActions([]);
    });
}

export function useSlideActionsProvider() {
    const [actions, setActions] = useState<SlideAction[]>([]);
    return { actions, setActions };
}
