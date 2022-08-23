// @ts-nocheck
import React from 'react'
import isHotkey from 'is-hotkey'
import {Editable, ReactEditor, Slate, useSlate, withReact} from 'slate-react'
import {createEditor, Editor, Element as SlateElement, Transforms} from 'slate'
import {withHistory} from 'slate-history'
import {Button, Divider, Icon, Popup} from 'semantic-ui-react'
import editor_value_example from './editor_value_example.json'

const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']

export class TtEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.renderElement = this.renderElement.bind(this)
        this.renderLeaf = this.renderLeaf.bind(this)
        this.editor = withHistory(withReact(createEditor() as ReactEditor))
    }

    renderElement(props) {
        return <Element {...props}/>
    }

    renderLeaf(props) {
        return <Leaf {...props}/>
    }

    constructEditor() {
        return () => withHistory(withReact(createEditor() as ReactEditor))
    }

    render() {
        return (
            <div>
                <Slate editor={this.editor} value={editor_value_example}>
                    <Button.Group>
                        <MarkButton format="bold" icon="bold"/>
                        <MarkButton format="italic" icon="italic"/>
                        <MarkButton format="underline" icon="underline"/>

                        <BlockButton format="heading-one" icon="heading" label="1"/>
                        <BlockButton format="heading-two" icon="heading" label="2"/>

                        <MarkButton format="code" icon="code"/>
                        <BlockButton format="block-quote" icon="quote right"/>

                        <BlockButton format="numbered-list" icon="list ol"/>
                        <BlockButton format="bulleted-list" icon="list ul"/>

                        <BlockButton format="left" icon="align left"/>
                        <BlockButton format="center" icon="align center"/>
                        <BlockButton format="right" icon="align right"/>
                        <BlockButton format="justify" icon="align justify"/>
                    </Button.Group>

                    <Popup
                        content='提交文章'
                        size='tiny'
                        mouseEnterDelay={500}
                        mouseLeaveDelay={500}
                        trigger={<Button icon='save' color='green' floated='right'/>}
                    />
                    <Popup
                        content='删除文章'
                        size='mini'
                        mouseEnterDelay={500}
                        mouseLeaveDelay={500}
                        trigger={<Button icon='trash' basic color='red' floated='right'/>}
                    />

                    <Divider/>
                    <Editable
                        renderElement={this.renderElement}
                        renderLeaf={this.renderLeaf}
                        placeholder="Enter some rich text…"
                        spellCheck
                        autoFocus
                        onKeyDown={event => {
                            for (const hotkey in HOTKEYS) {
                                if (isHotkey(hotkey, event as any)) {
                                    event.preventDefault()
                                    const mark = HOTKEYS[hotkey]
                                    toggleMark(this.editor, mark)
                                }
                            }
                        }}
                    />
                </Slate>
            </div>
        )
    }
}

const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
    )
    const isList = LIST_TYPES.includes(format)

    Transforms.unwrapNodes(editor, {
        match: n =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            LIST_TYPES.includes(n.type) &&
            !TEXT_ALIGN_TYPES.includes(format),
        split: true,
    })
    let newProperties: Partial<SlateElement>
    if (TEXT_ALIGN_TYPES.includes(format)) {
        newProperties = {
            align: isActive ? undefined : format,
        }
    } else {
        newProperties = {
            type: isActive ? 'paragraph' : isList ? 'list-item' : format,
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

const isBlockActive = (editor, format, blockType = 'type') => {
    const {selection} = editor
    if (!selection) return false

    const [match] = Array.from(
        Editor.nodes(editor, {
            at: Editor.unhangRange(editor, selection),
            match: n =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                n[blockType] === format,
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
        case 'block-quote':
            return (
                <blockquote style={style} {...attributes}>
                    {children}
                </blockquote>
            )
        case 'bulleted-list':
            return (
                <ul style={style} {...attributes}>
                    {children}
                </ul>
            )
        case 'heading-one':
            return (
                <h1 style={style} {...attributes}>
                    {children}
                </h1>
            )
        case 'heading-two':
            return (
                <h2 style={style} {...attributes}>
                    {children}
                </h2>
            )
        case 'list-item':
            return (
                <li style={style} {...attributes}>
                    {children}
                </li>
            )
        case 'numbered-list':
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

const BlockButton = ({format, icon, label}) => {
    const editor = useSlate()
    return (
        <Button
            basic
            active={isBlockActive(
                editor,
                format,
                TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
            )}
            onClick={event => {
                event.preventDefault()
                toggleBlock(editor, format)
            }}
            icon
        >
            <Icon name={icon}/>
            {label}
        </Button>
    )
}

const MarkButton = ({format, icon}) => {
    const editor = useSlate()
    return (
        <Button
            basic
            active={isMarkActive(editor, format)}
            onClick={event => {
                event.preventDefault()
                toggleMark(editor, format)
            }}
            icon
        >
            <Icon name={icon}/>
        </Button>
    )
}
