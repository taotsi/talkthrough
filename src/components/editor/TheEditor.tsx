import React, {useCallback, useMemo} from "react"
import isHotkey from "is-hotkey"
import {Editable, Slate, withReact} from "slate-react"
import {createEditor} from "slate"
import {withHistory} from "slate-history"
import "./styles.css"
import {EDITOR_MODE, EMPTY_TEXT, HOTKEYS} from "./constants"
import EditorToolbar, {toggleMark} from "./EditorToolbar"
import {EditingAreaProps, TheEditorProps} from "./types"

export default function TheEditor(props: TheEditorProps) {
    // @ts-ignore
    const renderElement = useCallback(props => <Element {...props} />, [])
    // @ts-ignore
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    // @ts-ignore
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])

    const value = props.value === undefined ? EMPTY_TEXT : props.value
    const mode = props.mode === undefined ? EDITOR_MODE.EDIT : props.mode

    return (
        <Slate
            editor={editor}
            value={value}
        >
            <EditorToolbar
                mode={mode}
            />
            <EditingArea
                // @ts-ignore
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                editor={editor}
            />
        </Slate>
    )
}

const EditingArea = (props: EditingAreaProps) => {
    const editor = props.editor

    return (
        <div className="editing_area">
            <Editable
                // @ts-ignore
                renderElement={props.renderElement}
                // @ts-ignore
                renderLeaf={props.renderLeaf}
                placeholder="..."
                spellCheck
                autoFocus
                onKeyDown={event => {
                    console.log(event)
                    for (const hotkey in HOTKEYS) {
                        if (isHotkey(hotkey, event as any)) {
                            event.preventDefault()
                            // @ts-ignore
                            const mark = HOTKEYS[hotkey]
                            toggleMark(editor, mark)
                        }
                    }
                }}
            />
        </div>
    )
}

const Element = ({attributes, children, element}: any) => {
    const style = {textAlign: element.align}
    switch (element.type) {
        case "block-quote":
            return (
                <blockquote style={style} {...attributes}>
                    {children}
                </blockquote>
            )
        case "bulleted-list":
            return (
                <ul style={style} {...attributes}>
                    {children}
                </ul>
            )
        case "heading-one":
            return (
                <h1 style={style} {...attributes}>
                    {children}
                </h1>
            )
        case "heading-two":
            return (
                <h2 style={style} {...attributes}>
                    {children}
                </h2>
            )
        case "heading-three":
            return (
                <h3 style={style} {...attributes}>
                    {children}
                </h3>
            )
        case "heading-four":
            return (
                <h4 style={style} {...attributes}>
                    {children}
                </h4>
            )
        case "list-item":
            return (
                <li style={style} {...attributes}>
                    {children}
                </li>
            )
        case "numbered-list":
            return (
                <ol style={style} {...attributes}>
                    {children}
                </ol>
            )
        default:
            return (
                <p style={style} {...attributes}>
                    {children}
                </p>
            )
    }
}

const Leaf = ({attributes, children, leaf}: any) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>
    }

    if (leaf.code) {
        children = <code>{children}</code>
    }

    if (leaf.italic) {
        children = <em>{children}</em>
    }

    if (leaf.underline) {
        children = <u>{children}</u>
    }

    return <span {...attributes}>{children}</span>
}
