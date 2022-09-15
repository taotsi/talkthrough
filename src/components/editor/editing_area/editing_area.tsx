import {EditingAreaProps} from "../types"
import {Editable, useSlate} from "slate-react"
import {HOTKEYS} from "../constants"
import isHotkey from "is-hotkey"
import {toggleMark} from "../toolbar/toolbar_fixed"
import React from "react"
import _ from "lodash"
import {Editor} from "slate"

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

export const EditingAreaEdit = (props: EditingAreaProps) => {
    const editor = useSlate()
    const onKeyDown = _.curry(onKeyDownEdit)(editor)

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

export const EditingAreaDiff = (props: EditingAreaProps) => {
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

const onKeyDownRead = (editor: Editor, event: any) => {
    event.preventDefault()
}

const onKeyDownEdit = (editor: Editor, event: any) => {
    for (const hotkey in HOTKEYS) {
        if (isHotkey(hotkey, event as any)) {
            event.preventDefault()
            // @ts-ignore
            const mark = HOTKEYS[hotkey]
            toggleMark(editor, mark)
        }
    }
}

const onKeyDownDiff = (editor: Editor, event: any) => {

}
