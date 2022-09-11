import {Button, Icon, Menu} from "semantic-ui-react"
import {Link, Navigate, Outlet, Router, useParams} from "react-router-dom"
import "../../styles/Repo.css"
import {queryRepository} from "../../api/BackendClient"
import React, {useState} from "react"

export const REPO_TAB = {
    INDEX: {
        en: "repository",
        route: "",
        cn: "项目"
    },
    MATERIALS: {
        en: "materials",
        route: "materials",
        cn: "素材"
    },
    ISSUES: {
        en: "issues",
        route: "issues",
        cn: "质疑"
    },
    PUBLICATION: {
        en: "publication",
        route: "publication",
        cn: "发表"
    },
    PULLS: {
        en: "pulls",
        route: "pulls",
        cn: "合并请求"
    },
    SETTINGS: {
        en: "settings",
        route: "settings",
        cn: "设置"
    }
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
                <TabItem tab={REPO_TAB.INDEX.en} icon="wrench" name="项目" route={REPO_TAB.INDEX.route}
                         currentTab={currentTab} setCurrentTab={setCurrentTab}/>
                <TabItem tab={REPO_TAB.PUBLICATION.en} icon="book" name={REPO_TAB.PUBLICATION.cn} route={REPO_TAB.PUBLICATION.route}
                         currentTab={currentTab} setCurrentTab={setCurrentTab}/>
                <TabItem tab={REPO_TAB.MATERIALS.en} icon="lightbulb" name={REPO_TAB.MATERIALS.cn} route={REPO_TAB.MATERIALS.route}
                         currentTab={currentTab} setCurrentTab={setCurrentTab}/>
                <TabItem tab={REPO_TAB.ISSUES.en} icon="bug" name={REPO_TAB.ISSUES.cn} route={REPO_TAB.ISSUES.route}
                         currentTab={currentTab} setCurrentTab={setCurrentTab}/>
                <TabItem tab={REPO_TAB.PULLS.en} icon="fork" name={REPO_TAB.PULLS.cn} route={REPO_TAB.PULLS.route}
                         currentTab={currentTab} setCurrentTab={setCurrentTab}/>
                <TabItem tab={REPO_TAB.SETTINGS.en} icon="setting" name={REPO_TAB.SETTINGS.cn} route={REPO_TAB.SETTINGS.route}
                         currentTab={currentTab} setCurrentTab={setCurrentTab}/>
            </Menu>
            <Outlet/>
        </div>
    )
}

const TabItem = (props: any) => {
    return (
        <Menu.Item
            as={Link} to={props.route}
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
