import React, { Ref, PropsWithChildren } from 'react'
import ReactDOM from 'react-dom'
import { cx, css } from '@emotion/css'

interface BaseProps {
    className: string
    [key: string]: unknown
}
type OrNull<T> = T | null

export const Menu = React.forwardRef(
    (
        { className, ...props }: PropsWithChildren<BaseProps>,
        ref: Ref<OrNull<HTMLDivElement>>
    ) => (
        <div
            {...props}
            // @ts-ignore
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

// @ts-ignore
export const Portal = ({ children }) => {
    return typeof document === 'object'
        ? ReactDOM.createPortal(children, document.body)
        : null
}
