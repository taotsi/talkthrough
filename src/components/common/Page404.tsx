import React from "react"
import {Outlet} from "react-router-dom"

export default function Page404() {
    return (
        <div>
            <img alt="404"
                 src="https://illustatus.herokuapp.com/?title=Oops,%20Page%20not%20found&fill=%234f86ed"/>
            <Outlet/>
        </div>
    )
}