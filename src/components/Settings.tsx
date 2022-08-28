import React from "react";
import {Outlet} from "react-router-dom";

export default function Settings() {
    return (
        <div>
            settings
            <Outlet/>
        </div>
    )
}