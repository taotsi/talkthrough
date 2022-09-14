import React, {PropsWithChildren, Ref, useEffect, useRef} from "react"
import {useFocused, useSlate} from "slate-react"
import {Editor, Range} from "slate"
import {Button, Icon} from "semantic-ui-react"
import {BaseProps} from "./types"
import {css, cx} from "@emotion/css/dist/emotion-css.cjs"
import ReactDOM from "react-dom"

export default function HoveringToolbar() {
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
                <Button icon compact size="tiny"  inverted
                    onClick={() => console.log("hovering button lightbulb clicked")}
                >
                    <Icon name="lightbulb"/>
                </Button>
                <Button icon compact size="tiny"  inverted
                    onClick={() => console.log("hovering button comment clicked")}
                >
                    <Icon name="comment"/>
                </Button>
            </Menu>
        </Portal>
    )
}

export const Menu = React.forwardRef(
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

export const Portal = ({children}: any) => {
    return typeof document === "object"
        ? ReactDOM.createPortal(children, document.body)
        : null
}
