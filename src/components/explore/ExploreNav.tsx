import {Outlet, useLocation} from "react-router-dom"
import {Container, Menu} from "semantic-ui-react"
import React from "react"
import {constantArrayByKey, pathTail} from "../utils"
import TabItem from "../common/TabItem"

export const EXPLORE_TAB = {
    PAPERS: {
        cn: "文章",
        en: "papers",
        route: "papers",
    },
    MATERIALS: {
        cn: "素材",
        en: "materials",
        route: "materials",
    }
}

export default function ExploreNav() {
    let currentTab = pathTail(useLocation().pathname)
    const validTabs = constantArrayByKey(EXPLORE_TAB, "en")
    if (!validTabs.includes(currentTab)) {
        currentTab = EXPLORE_TAB.PAPERS.en
    }

    return (
        <div>
            <Container>
                <Menu pointing secondary>
                    <TabItem currentTab={currentTab} value={EXPLORE_TAB.PAPERS}/>
                    <TabItem currentTab={currentTab} value={EXPLORE_TAB.MATERIALS}/>
                </Menu>
            </Container>
            <Outlet/>
        </div>
    )
}
