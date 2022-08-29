import {Outlet, useParams, useSearchParams} from "react-router-dom"
import React from "react"

export default function User() {
    const params = useParams()
    const [searchParams,] = useSearchParams()
    return (
        <div>
            user: {params.owner}, tab: {searchParams.get("tab")}
            <Outlet/>
        </div>
    )
}
