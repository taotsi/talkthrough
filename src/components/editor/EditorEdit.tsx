import {Slate} from "slate-react"
import FixedToolbar from "./FixedToolbar"
import {EditingArea} from "./EditingArea"
import React from "react"

export default function EditorEdit(props: any) {
    const {editor, value, mode, renderElement, renderLeaf} = props
    return (
        <Slate editor={editor} value={value}>
            <FixedToolbar mode={mode}/>
            <EditingArea
                // @ts-ignore
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                mode={mode}
            />
        </Slate>
    )
}