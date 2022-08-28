// @ts-nocheck
import {Outlet, useParams, useSearchParams} from "react-router-dom"
import React from "react"

export default function User() {
    const params = useParams()
    const [searchParams,] = useSearchParams()
    return (
        <div>
            user: {params.user}, tab: {searchParams.get("tab")}
            <Outlet/>
        </div>
    )
}
