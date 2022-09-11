import React from "react"
import {Container, Table} from "semantic-ui-react"
import ExploreRepositoryItem from "./ExploreRepositoryItem"
import {Outlet} from "react-router-dom"
import ExploreMaterialItem from "./ExploreMaterialItem"
import {queryExploreHeaders} from "../../api/BackendClient"
import {EXPLORE_TAB} from "./ExploreNav"

export default function Explore(props: { tab: any }) {
    const {tab} = props

    const headers = queryExploreHeaders(EXPLORE_TAB.PAPERS)
    return (
        <div>
            <Container>
                <Table basic="very">
                    <Table.Body>
                        {renderItems(headers, tab)}
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
