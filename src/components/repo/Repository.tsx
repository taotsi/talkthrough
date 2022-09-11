import {Outlet, useParams} from "react-router-dom"
import {Container} from "semantic-ui-react"
import RepoHeader from "./RepoHeader"
import RepoTab from "./RepoTab"
import {queryRepository} from "../../api/BackendClient"
import Page404 from "../Page404"
import TheEditor from "../TheEditor"

export default function Repository() {
    const params = useParams()
    const repo = queryRepository(params.owner, params.repository)
    if (repo === undefined) {
        return <Page404/>
    }

    return (
        <div>
            <RepoHeader stars={repo.stars} owner={repo.owner}/>
            <RepoTab/>
            <Container text>
                <TheEditor readOnly={true} text={repo.text}></TheEditor>
            </Container>
            <Outlet/>
        </div>
    )
}