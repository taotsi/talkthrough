import {Outlet, useParams} from "react-router-dom"

export default function Material(props: any) {
    const params = useParams()

    return (
        <div>
            {"material: " + params.material}
            <Outlet/>
        </div>
    )
}