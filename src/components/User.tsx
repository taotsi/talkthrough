// @ts-nocheck
import {Outlet, useParams, useSearchParams} from "react-router-dom";
import React from "react";

export default function User() {
    const params = useParams()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [searchParams, _] = useSearchParams();
    return (
        <div>
            user: {params.user}, tab: {searchParams.get('tab')}
            <Outlet/>
        </div>
    )
}
