export interface TheEditorProps {
    value?: any;
    mode?: string;
}

export interface EditingAreaProps {
    mode?: string;
}

export interface EditorToolbarProps {
    mode?: string;
}

export interface BaseProps {
    className: string

    [key: string]: unknown
}