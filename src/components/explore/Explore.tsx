import React from "react"
import {Container, Table} from "semantic-ui-react"
import ExploreRepositoryItem from "./ExploreRepositoryItem"
import {Outlet, useLocation} from "react-router-dom"
import ExploreMaterialItem from "./ExploreMaterialItem"
import {queryExploreHeaders} from "../../api/BackendClient"
import {EXPLORE_TAB} from "./ExploreNav"
import {constantArrayByKey, pathTail} from "../utils"

export default function Explore() {
    let currentTab = pathTail(useLocation().pathname)
    const validTabs = constantArrayByKey(EXPLORE_TAB, "en")
    if (!validTabs.includes(currentTab)) {
        currentTab = EXPLORE_TAB.PAPERS.en
    }
    const headers = queryExploreHeaders(currentTab)

    return (
        <div>
            <Container>
                <Table basic="very">
                    <Table.Body>
                        {renderItems(headers, currentTab)}
                    </Table.Body>
                </Table>
            </Container>
            <Outlet/>
        </div>
    )
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
    if (tab === EXPLORE_TAB.PAPERS.en) {
        for (let i = 0; i < n; i++) {
            result.push(<ExploreRepositoryItem header={headers[i]}/>)
        }
    } else if (tab === EXPLORE_TAB.MATERIALS.en) {
        for (let i = 0; i < n; i++) {
            result.push(<ExploreMaterialItem header={headers[i]}/>)
        }
    }
    return result
}
