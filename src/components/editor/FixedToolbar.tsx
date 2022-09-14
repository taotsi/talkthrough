import {Dropdown, Icon, Menu} from "semantic-ui-react"
import React from "react"
import {useSlate} from "slate-react"
import {EDITOR_MODE, HEADING_OPTIONS, LIST_TYPES} from "./constants"
import {Editor, Element as SlateElement, Transforms} from "slate"
import {EditorToolbarProps} from "./types"

export default function FixedToolbar(props: EditorToolbarProps) {
    let mode = props.mode
    mode = mode ? mode : EDITOR_MODE.EDIT

    switch (mode) {
        case EDITOR_MODE.EDIT:
            return (
                <Menu icon attached borderless size={"small"}>
                    <HeadingButton/>
                    <MarkButton format="bold" icon="bold"/>
                    <MarkButton format="italic" icon="italic"/>
                    <MarkButton format="underline" icon="underline"/>
                    <MarkButton format="code" icon="code"/>
                    <BlockButton format="block-quote" icon="quote left"/>
                    <BlockButton format="numbered-list" icon="list ol"/>
                    <BlockButton format="bulleted-list" icon="list ul"/>

                    <Menu.Item
                        position="right"
                        onClick={() => {console.log("editor upload button clicked")}}
                    >
                        <Icon name="upload" color="green"/>
                    </Menu.Item>
                </Menu>
            )
        case EDITOR_MODE.READ:
            return (
                <Menu icon attached borderless size={"small"}>
                    <Menu.Item
                        position="right"
                        onClick={() => {console.log("editor download button clicked")}}
                    >
                        <Icon name="download" color="green"/>
                    </Menu.Item>
                </Menu>

            )
        case EDITOR_MODE.DIFF:
            return (
                <Menu icon attached borderless size={"small"}>
                    <MarkButton format="code" icon="code"/>
                </Menu>
            )
        default:
            return <p>参数错误，工具栏渲染失败</p>
    }
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

interface ButtonProps {
    format: string;
    icon: any
}

const MarkButton = ({format, icon}: ButtonProps) => {
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

const BlockButton = ({format, icon}: ButtonProps) => {
    const editor = useSlate()
    return (
        <Menu.Item
            name={format}
            active={isBlockActive(editor, format)}
            onClick={event => {
                event.preventDefault()
                toggleBlock(editor, format)
            }}
        >
            <Icon name={icon}/>
        </Menu.Item>
    )
}

const toggleBlock = (editor: Editor, format: any) => {
    const isActive = isBlockActive(editor, format)
    const isList = LIST_TYPES.includes(format)

    Transforms.unwrapNodes(editor, {
        match: n =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            // @ts-ignore
            LIST_TYPES.includes(n.type),
        split: true
    })
    let newProperties: Partial<SlateElement>

    newProperties = {
        // @ts-ignore
        type: isActive ? "paragraph" : isList ? "list-item" : format
    }

    Transforms.setNodes<SlateElement>(editor, newProperties)

    if (!isActive && isList) {
        const block = {type: format, children: []}
        Transforms.wrapNodes(editor, block)
    }
}
export const toggleMark = (editor: Editor, format: any) => {
    const isActive = isMarkActive(editor, format)
    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}
const getHeading = (editor: Editor) => {
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
    // @ts-ignore
    const type = node[0]["type"]

    let result = "正文"
    for (const option in HEADING_OPTIONS) {
        // @ts-ignore
        if (option["value"] === type) {
            // @ts-ignore
            result = option["text"]
        }
    }
    return result
}

const isBlockActive = (editor: Editor, format: any) => {
    const {selection} = editor
    if (!selection) return false
    const [match] = Array.from(
        Editor.nodes(editor, {
            at: Editor.unhangRange(editor, selection),
            match: n =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                // @ts-ignore
                n["type"] === format
        })
    )

    return !!match
}

const isMarkActive = (editor: Editor, format: any) => {
    const marks = Editor.marks(editor)
    // @ts-ignore
    return marks ? marks[format] === true : false
}