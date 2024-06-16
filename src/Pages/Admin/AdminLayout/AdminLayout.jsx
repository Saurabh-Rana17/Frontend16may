import {Divider, Link, Toolbar} from "@mui/material";
import {grey} from "@mui/material/colors";
import React, {useContext, useEffect} from "react";
import {NavLink, Outlet, useNavigate} from "react-router-dom";
import {userContext} from "../../../store/UserProvider";
import {checkAdmin} from "../../../utility/checkAdmin";
import {adminContext} from "../../../store/AdminProvider";

export default function AdminLayout() {
    const navigate = useNavigate();
    const sections = [{title: "Manage Hotel", url: "managehotel"}, {
        title: "Manage Homestay", url: "managehomestay"
    }, {title: "Manage Tour", url: "managetour"}, {title: "Manage TourPackage", url: "managetourpackage"},];
    const {adminState, setAdminState} = useContext(adminContext);
    useEffect(() => {
        (async () => {

            const isAdmin = await checkAdmin(adminState);
            if (isAdmin === false) {
                // set admin context to null
                setAdminState({});
                navigate("/");
            } else {
                setTimeout(()=>{}, 3600)
            }
        })();
    }, [navigate, adminState]);

    return (<>
        <Toolbar
            component="nav"
            variant="dense"
            sx={{justifyContent: "flex-start", overflowX: "auto"}}
        >
            {sections.map((section) => (<Link
                color="inherit"
                component={NavLink}
                style={({isActive}) => {
                    return {
                        fontWeight: isActive ? "bold" : "",
                        backgroundColor: isActive ? grey[700] : "",
                        borderRadius: "7px",
                        color: isActive ? "white" : "",
                    };
                }}
                noWrap
                key={section.title}
                variant="body2"
                to={section.url}
                sx={{
                    p: 1, mr: {
                        xs: "1rem", sm: "2rem",
                    }, flexShrink: 0, backgroundColor: grey[50], ":hover": {
                        backgroundColor: grey[500],
                    },
                }}
            >
                {section.title}
            </Link>))}
        </Toolbar>
        <Divider/>
        <Outlet/>
    </>);
}
