import React, {PropsWithChildren, Ref, useEffect, useRef, useState} from "react"
import {useFocused, useSlate} from "slate-react"
import {Editor, Range} from "slate"
import {Dropdown} from "semantic-ui-react"
import {BaseProps, ToolBarHoveringPros} from "../types"
import {css, cx} from "@emotion/css/dist/emotion-css.cjs"
import ReactDOM from "react-dom"
import {INIT_ISSUE, ISSUE_TYPES} from "../constants"
import _ from "lodash"

export function ToolBarHovering(props: ToolBarHoveringPros) {
    const ref = useRef<HTMLDivElement | null>()
    const editor = useSlate()
    const inFocus = useFocused()
    const [idCount, setIdCount] = useState(0)

    const issueItem = (issueType: any, idx: number) => {
        return (
            <Dropdown.Item
                key={idx}
                onClick={() => {
                    const issue = _.cloneDeep(INIT_ISSUE)
                    issue.id = idCount
                    issue.content.type = issueType.text
                    props.addIssueCard(issue)

                    markCardId(editor, issue.id)

                    setIdCount(idCount + 1)

                    editor.selection = null // clear slate editor text selection
                }}
            >
                {issueType.text}
            </Dropdown.Item>
        )
    }

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
                <Dropdown
                    pointing="left"
                    icon="bug"
                    style={{color: "orange"}}
                >
                    <Dropdown.Menu style={{opacity: 0.95}}>
                        {ISSUE_TYPES.map((t, idx: number) => issueItem(t, idx))}
                    </Dropdown.Menu>
                </Dropdown>
            </Menu>
        </Portal>
    )
}

const markCardId = (editor: Editor, id: number) => {
    editor.addMark("issue_id", id)
}

const Menu = React.forwardRef(
    (
        {className, ...props}: PropsWithChildren<BaseProps>,
        ref: Ref<HTMLDivElement>
    ) => (
        <div
            {...props}
            ref={ref}
            className={cx(
                className,
                css`
                  & > * {
                    display: inline-block;
                  }

                  & > * + * {
                    margin-left: 15px;
                  }
                `
            )}
        />
    )
)

const Portal = ({children}: any) => {
    return typeof document === "object"
        ? ReactDOM.createPortal(children, document.body)
        : null
}
