import React, {createContext, useReducer} from "react";

export const adminContext = createContext({
    adminState: {admin: "", session: ""}, setAdminState: () => {
    },
});

function adminReducer(state, action) {
    const {type} = action;

    switch (type) {
        case "setAdminState":
            const admin = action.payload;
            if (admin) {
                localStorage.setItem("admin", JSON.stringify(admin));
                return admin;
            } else {
                localStorage.removeItem("admin");
                return {};
            }

        default:
            return state;
    }
}

export default function AdminProvider({children}) {
    const [adminState, dispatch] = useReducer(adminReducer, JSON.parse(localStorage.getItem("admin")));

    function setAdminState(admin) {
        dispatch({
            type: "setAdminState", payload: admin,
        });
    }
    const value = {adminState, setAdminState};
    return <adminContext.Provider value={value}>{children}</adminContext.Provider>;
}
