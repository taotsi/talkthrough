// @ts-nocheck
import React, { useCallback, useMemo, useState  } from 'react'
import isHotkey from 'is-hotkey'
import {Editable, Slate, useSlate, withReact, ReactEditor} from 'slate-react'
import {createEditor, Editor, Element as SlateElement, Transforms} from 'slate'
import {withHistory} from 'slate-history'
import {Button, Icon} from 'semantic-ui-react'
import { createPortal } from 'react-dom'
import editor_value_example from './examples/editor_value.json'
import './TheEditor.css'

const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']

export default function TheEditor() {
    const renderElement = useCallback(props => <Element {...props} />, [])
    const renderLeaf = useCallback(props => <Leaf {...props} />, [])
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])
    const handleBlur = useCallback(() => ReactEditor.deselect(editor), [editor])

    return (
        <Slate editor={editor} value={editor_value_example}>
            <Button.Group>
                <MarkButton format="bold" icon="bold"/>
                <MarkButton format="italic" icon="italic"/>
                <MarkButton format="underline" icon="underline"/>
                <MarkButton format="code" icon="code"/>

                <BlockButton format="block-quote" icon="quote left"/>
                <BlockButton format="heading-one" icon="heading" label="1"/>
                <BlockButton format="heading-two" icon="heading" label="2"/>
                <BlockButton format="numbered-list" icon="list ol"/>
                <BlockButton format="bulleted-list" icon="list ul"/>

                <BlockButton format="left" icon="align left"/>
                <BlockButton format="center" icon="align center"/>
                <BlockButton format="right" icon="align right"/>
                <BlockButton format="justify" icon="align justify"/>
            </Button.Group>

            <IFrame onBlur={handleBlur}>
            <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder="Enter some rich text…"
                spellCheck
                autoFocus
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
            </IFrame>
        </Slate>
    )
}

const IFrame = ({ children, ...props }) => {
    const [iframeBody, setIframeBody] = useState(null)
    const handleLoad = e => {
        setIframeBody(e.target.contentDocument.body)
    }
    return (
        <iframe title='the_editor' srcDoc={`<!DOCTYPE html>`} {...props} onLoad={handleLoad}>
            {iframeBody && createPortal(children, iframeBody)}
        </iframe>
    )
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
            size='small'
        >
            <Icon name={icon}/>
        </Button>
    )
}
