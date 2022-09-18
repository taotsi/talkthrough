import React from "react"
import {Segment} from "semantic-ui-react"
import {IssueCardProps} from "../types"

export default function IssueCard(props: IssueCardProps) {
    const {type, notes, id} = props
    return (
        <Segment>
            <p>issue</p>
            <h4>{type}</h4>
            <p>{notes}</p>
            <p>{id}</p>
        </Segment>
    )
}
