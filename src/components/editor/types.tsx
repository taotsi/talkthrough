export interface TheEditorProps {
    value?: any;
    mode?: string;
}

export interface EditorProps {
    editor: any;
    value: any;
    renderElement: any;
    renderLeaf: any;
}

export interface EditingAreaProps {
    renderElement: any;
    renderLeaf: any
}

export interface BaseProps {
    className: string

    [key: string]: unknown
}

