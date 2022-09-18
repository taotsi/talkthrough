import {Editable, Slate, useSlate} from "slate-react"
import React, {useState} from "react"
import {ToolBarHovering} from "./ToolBarHovering"
import {Grid, Icon, Menu} from "semantic-ui-react"
import {EditingAreaProps, EditorProps, IssueCardProps} from "../types"
import _ from "lodash"
import {Editor} from "slate"
import IssueCard from "./IssueCard"

export default function EditorRead(props: EditorProps) {
    const {editor, value, renderElement, renderLeaf} = props
    const [issueCardProps, setIssueCardProps] = useState<IssueCardProps[]>([])

    const addIssueCard = (ic: IssueCardProps) => {
        return setIssueCardProps((cards: IssueCardProps[]) => [...cards, ic])
    }

    const handleIssueCardCollapse = (id: number) => {
        let cardProps = [...issueCardProps]
        for (let i = 0; i < cardProps.length; i++) {
            const card = cardProps[i]
            if (card.id === id) {
                card.status.collapsed = !card.status.collapsed
                break
            }
        }
        setIssueCardProps(cardProps)
    }

    const handleIssueCardDelete = (id: number) => {
        let cardProps = [...issueCardProps]
        for (let i = 0; i < cardProps.length; i++) {
            const card = cardProps[i]
            if (card.id === id) {
                cardProps.splice(i, 1)
                break
            }
        }
        setIssueCardProps(cardProps)
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
                                issueCardProps.map(
                                    (props, index) => {
                                        return <IssueCard content={props.content}
                                                          status={props.status}
                                                          id={props.id}
                                                          handleCollapse={handleIssueCardCollapse}
                                                          handleDelete={handleIssueCardDelete}
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

export function ToolBarRead() {
    return (
        <Menu icon attached borderless size={"small"}>
            <Menu.Item
                position="right"
                onClick={() => {
                    console.log("editor download button clicked")
                }}
            >
                <Icon name="download" color="green"/>
            </Menu.Item>
        </Menu>
    )
}

export const EditingAreaRead = (props: EditingAreaProps) => {
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
