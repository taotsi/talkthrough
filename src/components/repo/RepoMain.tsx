import {Navigate, Outlet, useParams} from "react-router-dom"
import {Container} from "semantic-ui-react"
import {queryRepository} from "../../api/BackendClient"
import TheEditor from "../TheEditor"

export default function RepoMain() {
    const params = useParams()
    const repo = queryRepository(params.owner, params.repository)
    if (repo === undefined) {
        return <Navigate to="/404" replace={true} />
    }
    console.log("repo main")

    return (
        <div>
            <Container text>
                <TheEditor readOnly={true} text={repo.text}></TheEditor>
            </Container>
            <Outlet/>
        </div>
    )
}