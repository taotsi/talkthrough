import React, {PropsWithChildren, Ref} from 'react';
import {css, cx} from '@emotion/css';

interface BaseProps {
    className: string

    [key: string]: unknown
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

export const Toolbar = React.forwardRef(
    (
        {className, ...props}: PropsWithChildren<BaseProps>,
        ref: Ref<HTMLDivElement>
    ) => (
        <Menu
            {...props}
            ref={ref}
            className={cx(
                className,
                css`
                  position: relative;
                  padding: 1px 18px 17px;
                  margin: 0 -20px;
                  border-bottom: 2px solid #eee;
                  margin-bottom: 20px;
                `
            )}
        />
    )
)
