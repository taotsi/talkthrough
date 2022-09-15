import {Navigate, Outlet, useParams} from "react-router-dom"
import {Divider, Grid} from "semantic-ui-react"
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
            <Grid centered>
                <Grid.Column width={3}>
                    <h4>发表版本</h4>
                    <span>
                    当文章写的差不多了，可能就想发表。这里会列出你历史上发表的版本
                    </span>
                    <Divider/>
                    <h4>贡献者</h4>
                    <span>
                    对这篇文章有贡献的人在这里列出来
                    </span>
                </Grid.Column>
                <Grid.Column width={12}>
                    <TheEditor mode={EDITOR_MODE.READ} value={repo.text}/>
                </Grid.Column>
            </Grid>
            <Outlet/>
        </div>
    )
}