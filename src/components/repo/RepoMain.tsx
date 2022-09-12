import {Navigate, Outlet, useParams} from "react-router-dom"
import {Divider, Grid} from "semantic-ui-react"
import {queryRepository} from "../../api/BackendClient"
import TheEditor from "../editor/TheEditor"
import {EDITOR_MODE} from "../editor/constants"
import HoveringMenuExample from "../editor/HoverMenuExample"

export default function RepoMain() {
    const params = useParams()
    const repo = queryRepository(params.owner, params.repository)
    if (repo === undefined) {
        return <Navigate to="/404" replace={true}/>
    }

    return (
        <div>
            <Grid centered>
                <Grid.Column width={2}>
                    <h4>About</h4>
                    关于这个项目，这篇文章，都有些什么想说的，就写在这里
                    <Divider/>
                    <h4>发表</h4>
                    当文章写的差不多了，可能就想发表。这里会列出你历史上发表的版本
                    <Divider/>
                    <h4>贡献者</h4>
                    对这篇文章有贡献的人在这里列出来
                </Grid.Column>
                <Grid.Column width={9}>
                    <TheEditor mode={EDITOR_MODE.READ} value={repo.text}/>
                    {/*<HoveringMenuExample/>*/}
                </Grid.Column>
                <Grid.Column width={4}>
                    <h4>最近评论</h4>
                    最近的质疑和合并请求可能会放在这里，但也不一定。可能会把这个功能合并进编辑器里。可能会加一个评论功能，但是想想似乎也不是特别有必要
                </Grid.Column>
            </Grid>
            <Outlet/>
        </div>
    )
}