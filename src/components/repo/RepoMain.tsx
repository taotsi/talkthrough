import {Navigate, Outlet, useParams} from "react-router-dom"
import {Container} from "semantic-ui-react"
import {queryRepository} from "../../api/BackendClient"
import TheEditor from "../editor/TheEditor"
import {EDITOR_MODE} from "../editor/constants"

export default function RepoMain() {
    const params = useParams()
    const repo = queryRepository(params.owner, params.repository)
    if (repo === undefined) {
        return <Navigate to="/404" replace={true}/>
    }

    return (
        <div>
            <Container>
                <TheEditor mode={EDITOR_MODE.READ} value={repo.text}/>
            </Container>
            <Outlet/>
        </div>
    )
}