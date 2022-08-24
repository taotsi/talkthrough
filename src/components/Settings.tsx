import React from "react";
import {Outlet} from "react-router-dom";

export default class Settings extends React.Component {
    render() {
        return (
            <div>
                settings
                <Outlet/>
            </div>
        )
    }
}