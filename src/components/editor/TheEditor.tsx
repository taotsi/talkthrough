import React, {useCallback, useMemo} from "react"
import {withReact} from "slate-react"
import {createEditor} from "slate"
import {withHistory} from "slate-history"
import "./styles.css"
import {EDITOR_MODE, EMPTY_TEXT} from "./constants"
import {TheEditorProps} from "./types"
import EditorEdit from "./editor_mode/EditorEdit"
import EditorRead from "./editor_mode/EditorRead"
import EditorDiff from "./editor_mode/EditorDiff"

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
