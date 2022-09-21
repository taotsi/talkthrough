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

export interface IssueCardStatus {
    collapsed: boolean;
    editable: boolean;
    selected: boolean;
}

export interface IssueCardContent {
    type: string;
    notes: string
}

export interface IssueCardProps {
    id: number;
    content: IssueCardContent
    status: IssueCardStatus;
    handleCollapse?: (id: number, ic: IssueCardStatus) => void;
    handleDelete?: (id: number) => void;
    handleEdit?: (id: number) => void;
    handleSave?: (id: number) => void;
    handleSelect?: (id: number) => void;
    key?: number;
}

export interface ToolBarHoveringPros {
    addIssueCard: (ic: IssueCardProps) => void;
}
