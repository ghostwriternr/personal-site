import React from "react";

export type Page = "code" | "poetry" | "work" | "about";
interface PageContextType {
    state: Page;
    dispatch: (page: Page) => void;
}

const PageContext = React.createContext<PageContextType>({} as PageContextType);

function PageProvider({ children }) {
    const [state, dispatch] = React.useState<Page>("code");
    const value = { state, dispatch };

    return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
}

function usePage() {
    const context = React.useContext(PageContext);
    return context;
}

export { PageProvider, usePage };
