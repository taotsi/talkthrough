// @ts-ignore
import React, {useEffect, useMemo, useRef} from "react"
import {Editable, Slate, useFocused, useSlate, withReact} from "slate-react"
import {createEditor, Editor, Range, Text, Transforms,} from "slate"
import {Button, Icon} from "semantic-ui-react"
import {withHistory} from "slate-history"
import "./styles.css"

import {Menu, Portal} from "./components"

const HoveringMenuExample = () => {
    // @ts-ignore
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])

    return (
        <Slate editor={editor} value={initialValue}>
            <HoveringToolbar/>
            <Editable
                renderLeaf={props => <Leaf {...props} />}
                placeholder="Enter some text..."
                onDOMBeforeInput={(event: InputEvent) => {
                    switch (event.inputType) {
                        case "formatBold":
                            event.preventDefault()
                            return toggleFormat(editor, "bold")
                        case "formatItalic":
                            event.preventDefault()
                            return toggleFormat(editor, "italic")
                        case "formatUnderline":
                            event.preventDefault()
                            return toggleFormat(editor, "underlined")
                    }
                }}
            />
        </Slate>
    )
}

// @ts-ignore
const toggleFormat = (editor, format) => {
    const isActive = isFormatActive(editor, format)
    Transforms.setNodes(
        editor,
        {[format]: isActive ? null : true},
        {match: Text.isText, split: true}
    )
}

// @ts-ignore
const isFormatActive = (editor, format) => {
    // @ts-ignore
    const [match] = Editor.nodes(
        editor,
        {
            // @ts-ignore
            match: n => n[format] === true,
            mode: "all",
        })
    return !!match
}

// @ts-ignore
const Leaf = ({attributes, children, leaf}) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>
    }

    if (leaf.italic) {
        children = <em>{children}</em>
    }

    if (leaf.underlined) {
        children = <u>{children}</u>
    }

    return <span {...attributes}>{children}</span>
}

const HoveringToolbar = () => {
    const ref = useRef<HTMLDivElement | null>()
    const editor = useSlate()
    const inFocus = useFocused()

    useEffect(() => {
        const el = ref.current
        const {selection} = editor

        if (!el) {
            return
        }

        if (!selection || !inFocus || Range.isCollapsed(selection) || Editor.string(editor, selection) === "") {
            el.removeAttribute("style")
            return
        }

        const domSelection = window.getSelection()
        // @ts-ignore
        const domRange = domSelection.getRangeAt(0)
        const rect = domRange.getBoundingClientRect()
        const top = rect.top + window.scrollY - el.offsetHeight
        const left = rect.left + window.scrollX - el.offsetWidth / 2 + rect.width / 2
        el.style.top = `${top}px`
        el.style.left = `${left}px`
        el.style.opacity = "1"
    })

    return (
        <Portal>
            <Menu
                // @ts-ignore
                ref={ref}
                className="hovering_menu"
                onMouseDown={(e: { preventDefault: () => any }) => e.preventDefault()}
            >
                <FormatButton format="bold" icon="bold"/>
            </Menu>
        </Portal>
    )
}

// @ts-ignore
const FormatButton = ({format, icon}) => {
    const editor = useSlate()
    return (
        <Button
            icon
            active={isFormatActive(editor, format)}
            onClick={() => toggleFormat(editor, format)}
        >
            <Icon name={icon}/>
        </Button>
    )
}

const initialValue = [
    {
        type: "paragraph",
        children: [
            {
                text: "This example shows how you can make a hovering menu appear above your content",
            }
        ]
    }
]

export default HoveringMenuExample
