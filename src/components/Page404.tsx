import React from "react";
import {Segment} from 'semantic-ui-react';
import {Outlet} from "react-router-dom";

export default function Page404() {
    return (
        <div>
            <Segment textAlign='center'>
                <h1>页面不存在</h1>
            </Segment>
            <Outlet/>
        </div>
    )
}