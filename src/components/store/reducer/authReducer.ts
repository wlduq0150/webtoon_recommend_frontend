import { authActionType } from "../action/authAction";
import { authState } from "../state/authState";

const initialUserState = {
    id: -1
};

export const authReducer = (state: authState = initialUserState, action: authActionType) => {
    switch (action.type) {
        case "login":
            return { id: action.id };
        case "logout":
            return { id: -1 };

    }

    return state;
}