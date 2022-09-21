import React from "react"
import {Form, Grid, Icon} from "semantic-ui-react"
import {IssueCardProps} from "../types"
import {ISSUE_TYPES} from "../constants"

export default function IssueCard(props: IssueCardProps) {
    const {content, status, handleCollapse, handleDelete, handleEdit, handleSave, handleSelect} = props

    const CollapseButton = <Icon
        circular
        bordered
        size="small"
        name={status.collapsed ? "angle right" : "angle down"}
        onClick={(e: any) => {
            e.stopPropagation()
            if (handleCollapse) {
                handleCollapse(props.id, props.status)
            }
        }}
    />

    const DeleteButton = <Icon
        name="delete"
        color="red"
        size="small"
        bordered
        onClick={(e: any) => {
            e.stopPropagation()
            if (handleDelete) {
                handleDelete(props.id)
            }
        }}
    />

    const EditButton = status.editable ?
        <Icon
            name="check"
            bordered
            size="small"
            color="green"
            onClick={() => {
                if (handleSave) {
                    handleSave(props.id)
                }
            }}
        />
        :
        <Icon
            name="edit"
            bordered
            size="small"
            color="blue"
            onClick={() => {
                if (handleEdit) {
                    handleEdit(props.id)
                }
            }}
        />

    return (
        <div className="issue_card">
            <div className={status.selected ? "issue_card_content_highlight" : "issue_card_content"}
                 onClick={() => {
                     if (handleSelect) {
                         handleSelect(props.id)
                     }
                 }}>
                <div>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column
                                width={2}
                                verticalAlign="top"
                            >
                                {CollapseButton}<br/>
                                {
                                    !status.collapsed
                                    && <div className="issue_card_toolbar">
                                        {EditButton}<br/>
                                        {DeleteButton}
                                    </div>
                                }
                            </Grid.Column>
                            <Grid.Column width={14}>
                                {
                                    status.editable ?
                                        <Form>
                                            <Form.Group>
                                                <Form.Select
                                                    options={ISSUE_TYPES}
                                                />
                                            </Form.Group>
                                            {
                                                !status.collapsed
                                                && <Form.TextArea
                                                    value={content.notes}
                                                />
                                            }
                                        </Form>
                                        :
                                        <div>
                                            <h4>{content.type}</h4>
                                            {!status.collapsed && <p>{content.notes}</p>}
                                        </div>
                                }
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </div>
        </div>
    )
}
