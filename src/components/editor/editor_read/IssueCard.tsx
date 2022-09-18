import React from "react"
import {IssueCardProps} from "../types"

export default function IssueCard(props: IssueCardProps) {
    const {type, notes} = props
    return (
        <div className="issue_card">
            <div className="issue_card_content">
                <h4>{"type: " + type}</h4>
                <p>{"notes: " + notes}</p>
            </div>
        </div>
    )
}
