import {Editable, Slate, useSlate} from "slate-react"
import React, {useState} from "react"
import {ToolBarHovering} from "./ToolBarHovering"
import {Grid} from "semantic-ui-react"
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
    const [IssueCardProps, setIssueCardProps] = useState<IssueCardProps[]>([])

    const addIssueCard = (ic: IssueCardProps) => {
        return setIssueCardProps((issues: IssueCardProps[]) => [...issues, ic])
    }

    const handleIssueCardCollapse = (id: number) => {
        let issueProps = [...IssueCardProps]
        const [card] = findIssueCard(issueProps, id)
        if (card) {
            card.status.collapsed = !card.status.collapsed
        }
        setIssueCardProps(issueProps)
    }

    const handleIssueCardDelete = (id: number) => {
        let issueProps = [...IssueCardProps]
        const [card, idx] = findIssueCard(issueProps, id)
        if (card) {
            issueProps.splice(idx, 1)
        }
        setIssueCardProps(issueProps)
    }

    const handleIssueCardEdit = (id: number) => {
        let issueProps = [...IssueCardProps]
        const [card] = findIssueCard(issueProps, id)
        if (card) {
            card.status.editable = true
            card.status.collapsed = false
        }
        setIssueCardProps(issueProps)
    }

    const handleIssueCardSave = (id: number, type: string, notes: string) => {
        let issueProps = [...IssueCardProps]
        const [card] = findIssueCard(issueProps, id)
        if (card) {
            card.status.editable = false
            card.content.type = type
            card.content.notes = notes
        }
        setIssueCardProps(issueProps)
        console.log("props after save: ", issueProps)
    }

    const handleSelect = (id: number) => {
        let issueProps = [...IssueCardProps]
        const [card] = findIssueCard(issueProps, id)
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
        setIssueCardProps(issueProps)
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
                        <div className="issues_area">
                            {
                                IssueCardProps.map(
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

// function ToolBarRead() {
//     return (
//         <Menu icon attached borderless size={"small"}>
//             <Menu.Item
//                 position="right"
//                 onClick={() => {
//                     console.log("editor download button clicked")
//                 }}
//             >
//                 <Icon name="download" color="green"/>
//             </Menu.Item>
//         </Menu>
//     )
// }

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
