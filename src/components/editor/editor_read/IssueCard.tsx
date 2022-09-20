import React from "react"
import {Form, Grid, Icon} from "semantic-ui-react"
import {IssueCardProps} from "../types"
import {ISSUE_TYPES} from "../constants"

export default function IssueCard(props: IssueCardProps) {
    const {content, status, handleCollapse, handleDelete, handleEdit, handleSave} = props

    const CollapseButton = <Icon
        // style={{float: "right"}}
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

    const DeleteButton = <Icon basic name="delete"
        // style={{float: "right"}}
                               color="red"
                               onClick={() => {
                                   if (handleDelete) {
                                       handleDelete(props.id)
                                   }
                               }}
    />

    const EditButton = status.editable ?
        <Icon basic name="check"
              color="green"
            // style={{float: "right"}}
              onClick={() => {
                  if (handleSave) {
                      handleSave(props.id)
                  }
              }}
        />
        :
        <Icon basic name="edit"
              color="blue"
            // style={{float: "right"}}
              onClick={() => {
                  if (handleEdit) {
                      handleEdit(props.id)
                  }
              }}
        />


    return (
        <div className="issue_card">
            <div className="issue_card_content"
                 onClick={() => console.log("card clicked")}>
                <div>
                    <Grid divided>
                        <Grid.Row>
                            <Grid.Column width={2}
                                         textAlign="center"
                                         verticalAlign="top"
                            >
                                {CollapseButton}
                                {!status.collapsed && <div>
                                    {EditButton}
                                    {DeleteButton}
                                </div>}
                            </Grid.Column>
                            <Grid.Column width={14}>
                                {
                                    status.editable ?
                                        <Form>
                                            <Form.Group>

                                                <Form.Select
                                                    options={ISSUE_TYPES}
                                                    size="mini"
                                                />
                                            </Form.Group>
                                            {!status.collapsed && <Form.TextArea value={content.notes}/>}
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
