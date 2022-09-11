// @ts-nocheck
import React, {useCallback, useMemo} from "react"
import isHotkey from "is-hotkey"
import {Editable, Slate, useSlate, withReact} from "slate-react"
import {createEditor, Editor, Element as SlateElement, Transforms} from "slate"
import {withHistory} from "slate-history"
import {Icon, Menu, Dropdown} from "semantic-ui-react"
import editor_value_example from "../api/mocked_values/editor_value.json"
import "../styles/TheEditor.css"

const HOTKEYS = {
    "mod+b": "bold",
    "mod+i": "italic",
    "mod+u": "underline",
    "mod+`": "code"
}

const LIST_TYPES = ["numbered-list", "bulleted-list"]
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"]

const HEADING_OPTIONS = [
    {
        key: "text",
        text: "正文",
        value: "text"
    },
    {
        key: "h1",
        text: "一级标题",
        value: "heading-one"
    },
    {
        key: "h2",
        text: "二级标题",
        value: "heading-two"
    },
    {
        key: "h3",
        text: "三级标题",
        value: "heading-three"
    },
    {
        key: "h4",
        text: "四级标题",
        value: "heading-four"
    }
]

export default function TheEditor(props) {
    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])
    const {readOnly} = props

    return (
        <Slate
            editor={editor}
            value={editor_value_example}
        >
            <Menu icon attached borderless size={"tiny"}>
                <HeadingButton/>
                <MarkButton format="bold" icon="bold"/>
                <MarkButton format="italic" icon="italic"/>
                <MarkButton format="underline" icon="underline"/>
                <MarkButton format="code" icon="code"/>
                <BlockButton format="block-quote" icon="quote left"/>
                <BlockButton format="numbered-list" icon="list ol"/>
                <BlockButton format="bulleted-list" icon="list ul"/>
            </Menu>

            <div class="editing_area">
                <Editable
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    placeholder="说些什么吧..."
                    spellCheck
                    autoFocus
                    readOnly={readOnly === undefined ? false : readOnly}
                    onKeyDown={event => {
                        for (const hotkey in HOTKEYS) {
                            if (isHotkey(hotkey, event as any)) {
                                event.preventDefault()
                                const mark = HOTKEYS[hotkey]
                                toggleMark(editor, mark)
                            }
                        }
                    }}
                />
            </div>
        </Slate>
    )
}

const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
    )
    const isList = LIST_TYPES.includes(format)

    Transforms.unwrapNodes(editor, {
        match: n =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            LIST_TYPES.includes(n.type) &&
            !TEXT_ALIGN_TYPES.includes(format),
        split: true
    })
    let newProperties: Partial<SlateElement>
    if (TEXT_ALIGN_TYPES.includes(format)) {
        newProperties = {
            align: isActive ? undefined : format
        }
    } else {
        newProperties = {
            type: isActive ? "paragraph" : isList ? "list-item" : format
        }
    }
    Transforms.setNodes<SlateElement>(editor, newProperties)

    if (!isActive && isList) {
        const block = {type: format, children: []}
        Transforms.wrapNodes(editor, block)
    }
}

const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format)
    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}

const getHeading = (editor) => {
    console.log("getHeading")
    const {selection} = editor
    if (!selection) {
        return "正文"
    }
    const [node] = Array.from(
        Editor.nodes(editor, {
            at: Editor.unhangRange(editor, selection),
            match: n =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n)
        })
    )
    const type = node[0]["type"]

    let result = "正文"
    for (let i = 0; i < HEADING_OPTIONS.length; i++) {
        const option = HEADING_OPTIONS[i]
        if (option["value"] === type) {
            result = option["text"]
        }
    }
    return result
}

const isBlockActive = (editor, format, blockType = "type") => {
    const {selection} = editor
    if (!selection) return false
    const [match] = Array.from(
        Editor.nodes(editor, {
            at: Editor.unhangRange(editor, selection),
            match: n =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                n[blockType] === format
        })
    )

    return !!match
}

const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
}

const Element = ({attributes, children, element}) => {
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

const Leaf = ({attributes, children, leaf}) => {
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

const HeadingButton = () => {
    const editor = useSlate()

    return (
        <Dropdown
            item
            className="heading_dropdown"
            options={HEADING_OPTIONS}
            text={getHeading(editor)}
            onChange={(event, props) => {
                event.preventDefault()
                toggleBlock(editor, props.value)
            }}
        />
    )
}

const MarkButton = ({format, icon}) => {
    const editor = useSlate()
    return (
        <Menu.Item
            name={format}
            active={isMarkActive(editor, format)}
            onClick={event => {
                event.preventDefault()
                toggleMark(editor, format)
            }}
        >
            <Icon name={icon}/>
        </Menu.Item>
    )
}

const BlockButton = ({format, icon}) => {
    const editor = useSlate()
    return (
        <Menu.Item
            name={format}
            active={isBlockActive(
                editor,
                format,
                TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
            )}
            onClick={event => {
                event.preventDefault()
                toggleBlock(editor, format)
            }}
        >
            <Icon name={icon}/>
        </Menu.Item>
    )
}
