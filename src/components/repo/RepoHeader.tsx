import {Button, Icon, Menu} from "semantic-ui-react"
import {Link, Navigate, Outlet, useParams} from "react-router-dom"
import "../../styles/Repo.css"
import {queryRepository} from "../../api/BackendClient"
import React, {useState} from "react"

export const REPO_TAB_MATERIALS = "materials"
export const REPO_TAB_ISSUES = "issues"
export const REPO_TAB_PUBLICATION = "publication"
export const REPO_TAB_PULLS = "pulls"
export const REPO_TAB_SETTINGS = "settings"

export const REPO_TAB = {
    MATERIALS: "materials",
    ISSUES: "issues",
    PUBLICATION: "publication",
    PULLS: "pulls",
    SETTINGS: "settings"
}

export default function RepoHeader() {
    const params = useParams()
    const [currentTab, setCurrentTab] = useState("index")

    const repoName = params.repository
    const owner = params.owner
    const repo = queryRepository(params.owner, params.repository)

    if (repo === undefined) {
        return <Navigate to="/404" replace={true}/>
    }

    return (
        <div>
            <div className="repo_header_container">
                <div className="repo_header">
                    <Icon name="book"/>
                    <Link to={"/" + owner}>{owner}</Link>
                    <strong>{" / "}</strong>
                    <Link to={"/" + owner + "/" + repoName}><strong>{repoName}</strong></Link>

                    <Button basic floated="right">
                        <Icon name="star"/>
                        {"Star "}{repo.stars}
                    </Button>
                </div>
            </div>

            <Menu secondary pointing>
                <TabItem tab={""} icon="" name="项目" currentTab={currentTab} setCurrentTab={setCurrentTab}/>
                <TabItem tab={REPO_TAB_PUBLICATION} icon="" name="发表" currentTab={currentTab}
                         setCurrentTab={setCurrentTab}/>
                <TabItem tab={REPO_TAB_MATERIALS} icon="" name="素材" currentTab={currentTab}
                         setCurrentTab={setCurrentTab}/>
                <TabItem tab={REPO_TAB_ISSUES} icon="question" name="质疑" currentTab={currentTab}
                         setCurrentTab={setCurrentTab}/>
                <TabItem tab={REPO_TAB_PULLS} icon="fork" name="合并请求" currentTab={currentTab}
                         setCurrentTab={setCurrentTab}/>
                <TabItem tab={REPO_TAB_SETTINGS} icon="setting" name="设置" currentTab={currentTab}
                         setCurrentTab={setCurrentTab}/>
            </Menu>
            <Outlet/>
        </div>
    )
}

const TabItem = (props: any) => {
    return (
        <Menu.Item
            as={Link} to={props.tab}
            active={props.tab === props.currentTab}
            onClick={() => {
                props.setCurrentTab(props.tab)
            }}
        >
            <Icon name={props.icon}/>
            {props.name}
        </Menu.Item>
    )
}
