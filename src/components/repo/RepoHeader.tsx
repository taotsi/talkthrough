import {Button, Icon, Menu} from "semantic-ui-react"
import {Link, Navigate, Outlet, useLocation, useParams} from "react-router-dom"
import "./Repo.css"
import {queryRepository} from "../../api/BackendClient"
import {constantArrayByKey, pathTail} from "../common/utils"
import TabItem from "./TabItem"

export const REPO_TAB = {
    INDEX: {
        en: "repository",
        route: "",
        cn: "项目",
        icon: "wrench"
    },
    ISSUES: {
        en: "issues",
        route: "issues",
        cn: "质疑",
        icon: "bug"
    },
    PUBLICATION: {
        en: "publication",
        route: "publication",
        cn: "发表",
        icon: "book"
    },
    PULLS: {
        en: "pulls",
        route: "pulls",
        cn: "合并请求",
        icon: "fork"
    },
    SETTINGS: {
        en: "settings",
        route: "settings",
        cn: "设置",
        icon: "setting"
    }
}

export default function RepoHeader() {
    let currentTab = pathTail(useLocation().pathname)
    const params = useParams()
    const repoName = params.repository
    const owner = params.owner
    const repo = queryRepository(params.owner, params.repository)

    if (repo === undefined) {
        return <Navigate to="/404" replace={true}/>
    }

    const validTabs = constantArrayByKey(REPO_TAB, "en")
    if (!validTabs.includes(currentTab)) {
        currentTab = REPO_TAB.INDEX.en
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
                <TabItem value={REPO_TAB.INDEX} currentTab={currentTab}/>
                <TabItem value={REPO_TAB.ISSUES} currentTab={currentTab}/>
                <TabItem value={REPO_TAB.PULLS} currentTab={currentTab}/>
                <TabItem value={REPO_TAB.SETTINGS} currentTab={currentTab}/>
            </Menu>
            <Outlet/>
        </div>
    )
}
