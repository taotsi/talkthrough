import {EditingAreaProps} from "./types"
import {Editable, useSlate} from "slate-react"
import {EDITOR_MODE, HOTKEYS} from "./constants"
import isHotkey from "is-hotkey"
import {toggleMark} from "./EditorToolbar"
import React from "react"
import _ from "lodash"
import {Editor} from "slate"

export const EditingArea = (props: EditingAreaProps) => {
    const editor = useSlate()
    let mode = props.mode
    mode = mode ? mode : EDITOR_MODE.EDIT
    const onKeyDown = _.curry(handleKeyDown)(mode)(editor)

    return (
        <div className="editing_area">
            <Editable
                // @ts-ignore
                renderElement={props.renderElement}
                // @ts-ignore
                renderLeaf={props.renderLeaf}
                spellCheck
                autoFocus
                onKeyDown={onKeyDown}
            />
        </div>
    )
}

const handleKeyDown = (mode: string, editor: Editor, event: any) => {
    switch (mode) {
        case EDITOR_MODE.EDIT:
            for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event as any)) {
                    event.preventDefault()
                    // @ts-ignore
                    const mark = HOTKEYS[hotkey]
                    toggleMark(editor, mark)
                }
            }
            break
        case EDITOR_MODE.READ:
            event.preventDefault()
            break
        case EDITOR_MODE.DIFF:
            break
    }
}