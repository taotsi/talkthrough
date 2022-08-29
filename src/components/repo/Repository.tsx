import {Outlet, useParams} from "react-router-dom"
import {Container, Icon, Menu} from "semantic-ui-react"
import RepoHeader from "./RepoHeader"
import {queryRepository} from "../../api/BackendClient"
import Page404 from "../Page404"

export default function Repository() {
    const params = useParams()
    const repo = queryRepository(params.owner, params.repository)
    if (repo === undefined) {
        return <Page404/>
    }

    return (
        <div>
            <RepoHeader stars={repo.stars} owner={repo.owner}/>
            <Container>
                <Menu secondary pointing>
                    <Menu.Item>
                        <Icon name="wrench"/>项目
                    </Menu.Item>
                    <Menu.Item>
                        <Icon name="book"/>发表
                    </Menu.Item>
                    <Menu.Item>
                        <Icon name="lightbulb"/>质疑
                    </Menu.Item>
                    <Menu.Item>
                        <Icon name="fork"/>合并请求
                    </Menu.Item>
                    <Menu.Item>
                        <Icon name="setting"/>设置
                    </Menu.Item>
                </Menu>

                {"repo: " + params.repository}
            </Container>
            <Outlet/>
        </div>
    )
}