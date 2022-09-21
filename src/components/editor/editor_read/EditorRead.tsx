import {Editable, Slate, useSlate} from "slate-react"
import React, {useState} from "react"
import {ToolBarHovering} from "./ToolBarHovering"
import {Grid, Icon, Menu} from "semantic-ui-react"
import {EditingAreaProps, EditorProps, IssueCardProps} from "../types"
import _ from "lodash"
import {Editor} from "slate"
import IssueCard from "./IssueCard"

const DUMMY_ISSUE_CARD_ID = -1

const findIssueCard = (cards: IssueCardProps[], id: number): [IssueCardProps | null, number] =>  {
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i]
        if (card.id === id) {
            return [card, i]
        }
    }
    return [null, -1]
}

export default function EditorRead(props: EditorProps) {
    const {editor, value, renderElement, renderLeaf} = props
    const [issueCardProps, setIssueCardProps] = useState<IssueCardProps[]>([])
    const [selectedCardId, setSelectedCardId] = useState(DUMMY_ISSUE_CARD_ID)

    const addIssueCard = (ic: IssueCardProps) => {
        return setIssueCardProps((cards: IssueCardProps[]) => [...cards, ic])
    }

    const handleIssueCardCollapse = (id: number) => {
        let cardProps = [...issueCardProps]
        const [card] = findIssueCard(cardProps, id)
        if (card) {
            card.status.collapsed = !card.status.collapsed
        }
        setIssueCardProps(cardProps)
    }

    const handleIssueCardDelete = (id: number) => {
        let cardProps = [...issueCardProps]
        const [card, idx] = findIssueCard(cardProps, id)
        if (card) {
            cardProps.splice(idx, 1)
            if (selectedCardId === id) {
                setSelectedCardId(DUMMY_ISSUE_CARD_ID)
            }
        }
        setIssueCardProps(cardProps)
    }

    const handleIssueCardEdit = (id: number) => {
        let cardProps = [...issueCardProps]
        const [card] = findIssueCard(cardProps, id)
        if (card) {
            card.status.editable = true
            card.status.collapsed = false
        }
        setIssueCardProps(cardProps)
    }

    const handleIssueCardSave = (id: number) => {
        let cardProps = [...issueCardProps]
        const [card] = findIssueCard(cardProps, id)
        if (card) {
            card.status.editable = false
        }
        setIssueCardProps(cardProps)
    }

    const handleSelect = (id: number) => {
        setSelectedCardId(id)
        let cardProps = [...issueCardProps]
        for (let i = 0; i < cardProps.length; i++) {
            const card = cardProps[i]
            if (selectedCardId === id) {
                card.status.selected = false
            } else if (card.id === id) {
                card.status.selected = true
                break
            }
        }
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
