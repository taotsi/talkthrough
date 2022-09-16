import {Segment} from "semantic-ui-react"
import React from "react"

export default function IssueCard({type, notes}: any) {
    return (
        <Segment>
            <h5>{type}</h5>
            <p>{notes}</p>
        </Segment>
    )
}
