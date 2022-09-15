import {Slate} from "slate-react"
import {ToolBarEdit} from "../toolbar/toolbar_fixed"
import React from "react"
import {EditingAreaEdit} from "../editing_area/editing_area"
import {EditorProps} from "../types"

export default function EditorEdit(props: EditorProps) {
    const {editor, value, renderElement, renderLeaf} = props
    return (
        <Slate editor={editor} value={value}>
            <ToolBarEdit/>
            <div className="editing_area">
                <EditingAreaEdit
                    // @ts-ignore
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                />
            </div>
        </Slate>
    )
}