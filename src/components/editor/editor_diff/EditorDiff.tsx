import React from "react"
import {Editable, Slate, useSlate} from "slate-react"
import {EditingAreaProps, EditorProps} from "../types"
import {Grid, Icon, Menu} from "semantic-ui-react"
import _ from "lodash"
import {Editor} from "slate"

export default function EditorDiff(props: EditorProps) {
    const {editor, value, renderElement, renderLeaf} = props

    return (
        <Slate editor={editor} value={value}>
            <ToolBarDiff/>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <div className="editing_area">
                            <EditingAreaDiff
                                // @ts-ignore
                                renderElement={renderElement}
                                renderLeaf={renderLeaf}
                            />
                        </div>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <div className="editing_area">
                            <EditingAreaDiff
                                // @ts-ignore
                                renderElement={renderElement}
                                renderLeaf={renderLeaf}
                            />
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>


        </Slate>
    )
}

const ToolBarDiff = () => {
    return (
        <Menu icon attached borderless size={"small"}>
            <Menu.Item
                position="right"
                onClick={() => {
                    console.warn("editor upload button clicked")
                }}
            >
                <Icon name="upload" color="green"/>
            </Menu.Item>
        </Menu>
    )
}

const EditingAreaDiff = (props: EditingAreaProps) => {
    const editor = useSlate()
    const onKeyDown = _.curry(onKeyDownDiff)(editor)

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

const onKeyDownDiff = (editor: Editor, event: any) => {

}
