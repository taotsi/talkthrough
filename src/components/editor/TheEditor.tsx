import React, {useCallback, useMemo} from "react"
import {Slate, withReact} from "slate-react"
import {createEditor} from "slate"
import {withHistory} from "slate-history"
import "./styles.css"
import {EDITOR_MODE, EMPTY_TEXT} from "./constants"
import FixedToolbar from "./FixedToolbar"
import {TheEditorProps} from "./types"
import {EditingArea} from "./EditingArea"
import HoveringToolbar from "./HoveringToolBar"

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
        <Slate editor={editor} value={value}>
            <FixedToolbar mode={mode}/>
            {mode === EDITOR_MODE.READ && <HoveringToolbar/>}
            <EditingArea
                // @ts-ignore
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                mode={mode}
            />
        </Slate>
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
