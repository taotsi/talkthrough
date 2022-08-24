import {Outlet} from "react-router-dom";
import React from "react";

export default class Doc extends React.Component {
    render() {
        return (
            <div>
                doc
                <Outlet/>
            </div>
        )
    }
}