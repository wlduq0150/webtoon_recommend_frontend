import { Action } from "redux";

export type loginActionType = Action<"login"> & {
    id: number;
};

export type logoutActionType = Action<"logout">;

export type authActionType = loginActionType | logoutActionType;