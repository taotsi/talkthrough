import React from "react"
import {Container, Table} from "semantic-ui-react"
import ExploreItem from "./ExploreItem"
import {Outlet} from "react-router-dom"
import {queryExploreHeaders} from "../../api/BackendClient"

export default function Explore() {
    const headers = queryExploreHeaders()

    return (
        <div>
            <Container>
                <Table basic="very">
                    <Table.Body>
                        {renderItems(headers)}
                    </Table.Body>
                </Table>
            </Container>
            <Outlet/>
        </div>
    )
}

function renderItems(headers: any[] | undefined) {
    let result: any[] = []
    if (headers === undefined) {
        return result
    }
    const n = headers.length
    if (n < 1) {
        return result
    }
    for (let i = 0; i < n; i++) {
        result.push(<ExploreItem header={headers[i]}/>)
    }
    return result
}
