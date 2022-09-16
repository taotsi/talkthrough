import {Editable, Slate, useSlate} from "slate-react"
import React from "react"
import {ToolBarHovering} from "./ToolBarHovering"
import {Grid, Icon, Menu} from "semantic-ui-react"
import {EditingAreaProps, EditorProps} from "../types"
import _ from "lodash"
import {Editor} from "slate"
import IssueCard from "./IssueCard"

export default function EditorRead(props: EditorProps) {
    const {editor, value, renderElement, renderLeaf} = props

    return (
        <Slate editor={editor} value={value}>
            <ToolBarHovering/>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={11}>
                        <ToolBarRead/>
                        <div className="editing_area">
                            <EditingAreaRead
                                // @ts-ignore
                                renderElement={renderElement}
                                renderLeaf={renderLeaf}
                            />
                        </div>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <div className="issues_area">
                            <IssueCard type="同义反复" notes="同义反复"/>
                            <IssueCard type="稻草人" notes="你在树立不存在的攻击对象"/>
                            <IssueCard type="缺少数据" notes="第一句"/>
                            <IssueCard type="缺少数据" notes="第二句"/>
                            <IssueCard type="缺少数据" notes="第三四句有问题"/>
                            <IssueCard type="缺少数据" notes="最后一句有问题"/>
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
