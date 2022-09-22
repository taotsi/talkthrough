import React, {useCallback, useMemo} from "react"
import {withReact} from "slate-react"
import {createEditor} from "slate"
import {withHistory} from "slate-history"
import "./styles.css"
import {EDITOR_MODE, EMPTY_TEXT} from "./constants"
import {TheEditorProps} from "./types"
import EditorEdit from "./editor_edit/EditorEdit"
import EditorRead from "./editor_read/EditorRead"
import EditorDiff from "./editor_diff/EditorDiff"
import Leaf from "./Leaf"
import {Element} from "../Element"

export default function TheEditor(props: TheEditorProps) {
    // @ts-ignore
    const renderElement = useCallback(props => <Element {...props} />, [])
    // @ts-ignore
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    // @ts-ignore
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])

    const value = props.value === undefined ? EMPTY_TEXT : props.value
    const mode = props.mode === undefined ? EDITOR_MODE.EDIT : props.mode

    switch (mode) {
        case EDITOR_MODE.EDIT:
            return (
                <EditorEdit
                    editor={editor}
                    value={value}
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                />
            )
        case EDITOR_MODE.READ:
            return (
                <EditorRead
                    editor={editor}
                    value={value}
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                />
            )
        case EDITOR_MODE.DIFF:
            return (
                <EditorDiff
                    editor={editor}
                    value={value}
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                />
            )
        default:
            return <p>{"wrong mode of the editor, mode: " + mode}</p>
    }
}
