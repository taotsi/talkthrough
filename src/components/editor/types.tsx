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

export interface IssueCardProps {
    type: string;
    notes: string;
    collapsed: boolean;
    editable: boolean;
    key: number;
    id: number;
}

export interface ToolBarHoveringPros {
    addIssueCard: (ic: IssueCardProps) => void
}