import React, {PropsWithChildren, Ref, useEffect, useRef, useState} from "react"
import {useFocused, useSlate} from "slate-react"
import {Editor, Range} from "slate"
import {Button, Icon} from "semantic-ui-react"
import {BaseProps, ToolBarHoveringPros} from "../types"
import {css, cx} from "@emotion/css/dist/emotion-css.cjs"
import ReactDOM from "react-dom"

export function ToolBarHovering(props: ToolBarHoveringPros) {
    const ref = useRef<HTMLDivElement | null>()
    const editor = useSlate()
    const inFocus = useFocused()
    const [idCount, setIdCount] = useState(0);

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
                <Button icon compact size="tiny" inverted
                        onClick={() => {
                            const card = {
                                content: {
                                    type: "",
                                    notes: ""
                                },
                                status: {
                                    collapsed: false,
                                    editable: true
                                },
                                id: idCount
                            }
                            props.addIssueCard(card)
                            setIdCount(idCount + 1)
                        }}
                >
                    <Icon name="bug"/>
                </Button>
            </Menu>
        </Portal>
    )
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
