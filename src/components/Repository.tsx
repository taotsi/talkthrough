import {Outlet, useParams} from "react-router-dom";

export default function Repository(props: any) {
    const params = useParams()

    return (
        <div>
            {"repo: " + params.repository}
            <Outlet/>
        </div>
    )
}