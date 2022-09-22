import React, {useState} from "react"
import {Form, Grid, Icon, Select} from "semantic-ui-react"
import {IssueCardProps} from "../types"
import {ISSUE_TYPES} from "../constants"

export default function IssueCard(props: IssueCardProps) {
    const {content, status, handleCollapse, handleDelete, handleEdit, handleSave, handleSelect} = props
    const [mouseOver, setMouseOver] = useState(false)

    const CollapseButton = <Icon
        circular
        bordered
        size="small"
        style={{float: "left"}}
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
        style={{float: "right"}}
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
            style={{float: "right"}}
            color="green"
            onClick={(e: any) => {
                e.stopPropagation()
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
            style={{float: "right"}}
            color="blue"
            onClick={(e: any) => {
                e.stopPropagation()
                if (handleEdit) {
                    handleEdit(props.id)
                }
            }}
        />

    const LocateButton = <Icon
        name="crosshairs"
        bordered
        size="small"
        style={{float: "right"}}
        floated={"right"}
        onClick={(e: any) => {
            e.stopPropagation()
            console.log("locate button clicked")
        }}
    />

    return (
        <div className="issue_card">
            <div className={status.selected ? "issue_card_content_highlight" : "issue_card_content"}
                 onClick={() => {
                     if (handleSelect) {
                         handleSelect(props.id)
                     }
                 }}
                 onMouseEnter={() => setMouseOver(true)}
                 onMouseLeave={() => setMouseOver(false)}
            >
                <div>
                    <Grid>
                        <Grid.Row verticalAlign="middle">
                            <Grid.Column width={2}>
                                {CollapseButton}
                            </Grid.Column>
                            <Grid.Column width={7}>
                                {
                                    status.editable ?
                                        <Form>
                                            <Select options={ISSUE_TYPES}/>
                                        </Form>
                                        :
                                        <div>
                                            <h4>{content.type}</h4>
                                        </div>
                                }
                            </Grid.Column>
                            <Grid.Column width={7} floated="right">
                                {
                                    mouseOver
                                    && <div>
                                        {LocateButton}
                                        {EditButton}
                                        {DeleteButton}
                                    </div>
                                }
                            </Grid.Column>
                        </Grid.Row>
                        {
                            !status.collapsed &&
                            (
                                status.editable ?
                                    <Grid.Row>
                                        <Grid.Column>
                                            <Form>
                                                <Form.TextArea
                                                    onClick={(e: any) => {
                                                        e.stopPropagation()
                                                    }}
                                                    value={content.notes}
                                                />
                                            </Form>
                                        </Grid.Column>
                                    </Grid.Row>
                                    :
                                    <Grid.Row>
                                        <Grid.Column>
                                            <p>{content.notes}</p>
                                        </Grid.Column>
                                    </Grid.Row>
                            )
                        }
                    </Grid>
                </div>
            </div>
        </div>
    )
}
