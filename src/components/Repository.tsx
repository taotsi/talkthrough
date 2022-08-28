import {Outlet, useParams} from "react-router-dom";

export default function Repository() {
    const params = useParams()

    return (
        <div>
            {"repo: " + params.repository}
            <Outlet/>
        </div>
    )
}