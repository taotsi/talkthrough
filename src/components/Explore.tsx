import React, {useState} from "react"
import {Container, Menu} from "semantic-ui-react"
import ExploreRepositoryItem from "./ExploreRepositoryItem"
import {Outlet} from "react-router-dom"
import ExploreMaterialItem from "./ExploreMaterialItem"
import {EXPLORE_TAB, queryExploreHeaders} from "../api/BackendClient"

export default function Explore() {
    const [tab, setTab] = useState(EXPLORE_TAB.PAPERS)
    const [headers, setHeaders] = useState(queryExploreHeaders(EXPLORE_TAB.PAPERS))
    return (
        <div>
            <Container>
                <Menu pointing secondary>
                    <Menu.Item
                        name={EXPLORE_TAB.PAPERS}
                        active={tab === EXPLORE_TAB.PAPERS}
                        onClick={() => handleItemClick(EXPLORE_TAB.PAPERS, setTab, setHeaders)}
                    />
                    <Menu.Item
                        name={EXPLORE_TAB.MATERIALS}
                        active={tab === EXPLORE_TAB.MATERIALS}
                        onClick={() => handleItemClick(EXPLORE_TAB.MATERIALS, setTab, setHeaders)}
                    />
                </Menu>
                {renderItems(headers, tab)}
            </Container>
            <Outlet/>
        </div>
    )
}

function handleItemClick(tab: string, setTab: any, setHeaders: any) {
    setTab(tab)
    setHeaders(queryExploreHeaders(tab))
}

function renderItems(headers: any[] | undefined, tab: string) {
    let result: any[] = []
    if (headers === undefined) {
        return result
    }
    const n = headers.length
    if (n < 1) {
        return result
    }
    if (tab === EXPLORE_TAB.PAPERS) {
        for (let i = 0; i < n; i++) {
            result.push(<ExploreRepositoryItem header={headers[i]}/>)
        }
    } else if (tab === EXPLORE_TAB.MATERIALS) {
        for (let i = 0; i < n; i++) {
            result.push(<ExploreMaterialItem header={headers[i]}/>)
        }
    }
    return result
}
