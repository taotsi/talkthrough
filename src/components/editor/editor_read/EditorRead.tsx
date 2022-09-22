import {Editable, Slate, useSlate} from "slate-react"
import React, {useState} from "react"
import {ToolBarHovering} from "./ToolBarHovering"
import {Button, Divider, Grid} from "semantic-ui-react"
import {EditingAreaProps, EditorProps, IssueCardProps} from "../types"
import _ from "lodash"
import {Editor, Transforms} from "slate"
import IssueCard from "./IssueCard"

const findIssueCard = (issues: IssueCardProps[], id: number): [IssueCardProps | null, number] => {
    for (let i = 0; i < issues.length; i++) {
        const card = issues[i]
        if (card.id === id) {
            return [card, i]
        }
    }
    return [null, -1]
}

export default function EditorRead(props: EditorProps) {
    const {editor, value, renderElement, renderLeaf} = props
    const [issueCardProps, setIssueCardProps] = useState<IssueCardProps[]>([])

    const addIssueCard = (ic: IssueCardProps) => {
        return setIssueCardProps((issues: IssueCardProps[]) => [...issues, ic])
    }

    const handleIssueCardCollapse = (id: number) => {
        let issues = [...issueCardProps]
        const [card] = findIssueCard(issues, id)
        if (card) {
            card.status.collapsed = !card.status.collapsed
        }
        setIssueCardProps(issues)
    }

    const handleIssueCardDelete = (id: number) => {
        let issues = [...issueCardProps]
        const [card, idx] = findIssueCard(issues, id)
        if (card) {
            issues.splice(idx, 1)
        }
        setIssueCardProps(issues)
    }

    const handleIssueCardEdit = (id: number) => {
        let issues = [...issueCardProps]
        const [card] = findIssueCard(issues, id)
        if (card) {
            card.status.editable = true
            card.status.collapsed = false
        }
        setIssueCardProps(issues)
    }

    const handleIssueCardSave = (id: number, type: string, notes: string) => {
        let issues = [...issueCardProps]
        const [card] = findIssueCard(issues, id)
        if (card) {
            card.status.editable = false
            card.content.type = type
            card.content.notes = notes
        }
        setIssueCardProps(issues)
    }

    const handleSelect = (id: number) => {
        let issues = [...issueCardProps]
        const [card] = findIssueCard(issues, id)
        if (card !== null) {
            card.status.selected = !card.status.selected
            Transforms.setNodes(
                editor,
                // @ts-ignore
                {selected: card.status.selected},
                {
                    match: n => {
                        return !Editor.isEditor(n)
                            // && SlateText.isText(n)
                            // @ts-ignore
                            && n.issue_id === id
                    },
                    at: []
                }
            )
        }
        setIssueCardProps(issues)
    }

    const unfoldAll = () => {
        let issues = [...issueCardProps]
        for (const issue of issues) {
            issue.status.collapsed = false
        }
        setIssueCardProps(issues)
    }

    const foldAll = () => {
        let issues = [...issueCardProps]
        for (const issue of issues) {
            issue.status.collapsed = true
            issue.status.editable = false
        }
        setIssueCardProps(issues)
    }

    return (
        <Slate editor={editor} value={value}>
            <ToolBarHovering addIssueCard={addIssueCard}/>
            <Grid>
                <Grid.Row verticalAlign="top">
                    <Grid.Column width={10}>
                        {/*<ToolBarRead/>*/}
                        <div className="editing_area">
                            <EditingAreaRead
                                // @ts-ignore
                                renderElement={renderElement}
                                renderLeaf={renderLeaf}
                            />
                        </div>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        {
                            issueCardProps.length > 0
                            && <div>
                                <IssueAreaToolBar
                                    unfoldAll={unfoldAll}
                                    foldAll={foldAll}
                                />
                                <Divider/>
                            </div>
                        }

                        <div className="issues_area">
                            {
                                issueCardProps.map(
                                    (props, index) => {
                                        return <IssueCard content={props.content}
                                                          status={props.status}
                                                          id={props.id}
                                                          handleCollapse={handleIssueCardCollapse}
                                                          handleDelete={handleIssueCardDelete}
                                                          handleEdit={handleIssueCardEdit}
                                                          handleSave={handleIssueCardSave}
                                                          handleSelect={handleSelect}
                                                          key={index}/>
                                    })
                            }
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        </Slate>
    )
}

function IssueAreaToolBar(props: any) {
    return (
        <div>
            <Button
                basic
                compact
                icon="compress"
                size="tiny"
                onClick={() => {
                    props.foldAll()
                }}
            />
            <Button
                basic
                compact
                icon="expand"
                size="tiny"
                onClick={() => {
                    props.unfoldAll()
                }}
            />
            <Button
                basic
                compact
                positive
                floated="right"
                icon="save"
                size="tiny"
                onClick={() => {
                    console.warn("issue area save button clicked")
                }}
            />
        </div>

    )
}

const EditingAreaRead = (props: EditingAreaProps) => {
    const editor = useSlate()
    const onKeyDown = _.curry(onKeyDownRead)(editor)

    return (
        <Editable
            // @ts-ignore
            renderElement={props.renderElement}
            // @ts-ignore
            renderLeaf={props.renderLeaf}
            spellCheck
            autoFocus
            onKeyDown={onKeyDown}
        />
    )
}

const onKeyDownRead = (editor: Editor, event: any) => {
    event.preventDefault()
}
