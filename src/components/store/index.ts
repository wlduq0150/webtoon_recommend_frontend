import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducer/authReducer";
import { useMemo } from "react";

const initializeStore = () => {
    const store = configureStore({ reducer: authReducer });
    return store;
};

export function useStore() {
    const store = useMemo(() => { return initializeStore() }, []);
    return store;
}