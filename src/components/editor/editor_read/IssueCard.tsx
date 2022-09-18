import React from "react"
import {Icon} from "semantic-ui-react"
import {IssueCardProps} from "../types"

export default function IssueCard(props: IssueCardProps) {
    const {content, status, handleCollapse, handleDelete} = props

    return (
        <div className="issue_card">
            <div className="issue_card_content">
                <div>
                    <Icon
                        basic floated="left"
                        circular
                        bordered
                        size="small"
                        name={status.collapsed ? "angle right" : "angle down"}
                        onClick={() => {
                            if (handleCollapse) {
                                handleCollapse(props.id, props.status)
                            }
                        }}
                    />
                    <span>{"type: " + content.type}</span>
                    <Icon basic floated="right" name="delete"
                          style={{float: "right"}}
                          color="red"
                          onClick={() => {
                              if (handleDelete) {
                                  handleDelete(props.id)
                              }
                          }}
                    />
                </div>

                {!status.collapsed && <p>{"notes: " + content.notes}</p>}
            </div>
        </div>
    )
}
