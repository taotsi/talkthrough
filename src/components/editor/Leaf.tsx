import React from "react"

export default function Leaf({attributes, children, leaf}: any) {
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

    if (leaf.highlight) {
        children = <span className="selected_text">{children}</span>
    }

    return <span {...attributes}>{children}</span>
}