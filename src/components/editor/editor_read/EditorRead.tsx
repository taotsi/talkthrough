import {Editable, Slate, useSlate} from "slate-react"
import React, {useState} from "react"
import {ToolBarHovering} from "./ToolBarHovering"
import {Button, Divider, Grid} from "semantic-ui-react"
import {EditingAreaProps, EditorProps, IssueCardProps} from "../types"
import _ from "lodash"
import {Editor, Text as SlateText, Transforms} from "slate"
import IssueCard from "./IssueCard"

export default function EditorRead(props: EditorProps) {
    const {editor, value, renderElement, renderLeaf} = props
    const [issueCardProps, setIssueCardProps] = useState<IssueCardProps[]>([])

    const addIssueCard = (ic: IssueCardProps) => {
        return setIssueCardProps((issues: IssueCardProps[]) => [...issues, ic])
    }

    const collapseIssueCard = (id: number) => {
        const [temp, idx] = findIssueCard(issueCardProps, id)
        if (temp === null) {
            return
        }
        let issues = [...issueCardProps]
        const issue = issues[idx]
        issue.status.collapsed = !issue.status.collapsed
        setIssueCardProps(issues)
    }

    const deleteIssueCard = (id: number) => {
        const [temp, idx] = findIssueCard(issueCardProps, id)
        if (temp === null) {
            return
        }
        let issues = [...issueCardProps]
        issues.splice(idx, 1)
        setIssueCardProps(issues)
    }

    const setIssueCardEditMode = (id: number) => {
        const [temp, idx] = findIssueCard(issueCardProps, id)
        if (temp === null) {
            return
        }
        let issues = [...issueCardProps]
        const issue = issues[idx]
        issue.status.editable = true
        issue.status.collapsed = false
        setIssueCardProps(issues)
    }

    const setIssueCardSaveMode = (id: number, type: string, notes: string) => {

        const [temp, idx] = findIssueCard(issueCardProps, id)
        if (temp === null) {
            return
        }
        let issues = [...issueCardProps]
        const issue = issues[idx]
        issue.status.editable = false
        issue.content.type = type
        issue.content.notes = notes
        setIssueCardProps(issues)
    }

    const toggleIssueCardSelect = (id: number) => {
        const [temp, idx] = findIssueCard(issueCardProps, id)
        if (temp === null) {
            return
        }
        let issues = [...issueCardProps]
        const issue = issues[idx]
        issue.status.selected = !issue.status.selected

        Transforms.setNodes(
            editor,
            // @ts-ignore
            {selected: issue.status.selected},
            {
                match: n => {
                    return !!(!Editor.isEditor(n)
                        && SlateText.isText(n)
                        && "issues" in n
                        // @ts-ignore
                        && n.issues.includes(id))

                },
                at: []
            }
        )
        setIssueCardProps(issues)
        console.log(editor.children[0])
    }

    const unfoldAllIssueCards = () => {
        let issues = [...issueCardProps]
        for (const issue of issues) {
            issue.status.collapsed = false
        }
        setIssueCardProps(issues)
    }

    const foldAllIssueCards = () => {
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
                                    unfoldAll={unfoldAllIssueCards}
                                    foldAll={foldAllIssueCards}
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
                                                          handleCollapse={collapseIssueCard}
                                                          handleDelete={deleteIssueCard}
                                                          handleEdit={setIssueCardEditMode}
                                                          handleSave={setIssueCardSaveMode}
                                                          handleSelect={toggleIssueCardSelect}
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

const findIssueCard = (issues: IssueCardProps[], id: number): [IssueCardProps | null, number] => {
    for (let i = 0; i < issues.length; i++) {
        const issue = issues[i]
        if (issue.id === id) {
            return [issue, i]
        }
    }
    return [null, -1]
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
                icon="upload"
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
