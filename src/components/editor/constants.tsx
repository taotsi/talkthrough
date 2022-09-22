export const EDITOR_MODE = {
    EDIT: "edit",
    READ: "read",
    DIFF: "diff"
}

export const HOTKEYS = {
    "mod+b": "bold",
    "mod+i": "italic",
    "mod+u": "underline",
    "mod+`": "code"
}

export const LIST_TYPES = [
    "numbered-list",
    "bulleted-list"
]

export const HEADING_OPTIONS = [
    {
        key: "text",
        text: "正文",
        value: "text"
    },
    {
        key: "h1",
        text: "一级标题",
        value: "heading-one"
    },
    {
        key: "h2",
        text: "二级标题",
        value: "heading-two"
    },
    {
        key: "h3",
        text: "三级标题",
        value: "heading-three"
    },
    {
        key: "h4",
        text: "四级标题",
        value: "heading-four"
    }
]

export const EMPTY_TEXT = [
    {
        "type": "paragraph",
        "children": [
            {
                "text": ""
            }
        ]
    }
]

export const ISSUE_TYPES = [
    {key: "straw_man", text: "稻草人论证", value: "稻草人论证"},
]
export const INIT_ISSUE = {
    content: {
        type: "",
        notes: ""
    },
    status: {
        collapsed: false,
        editable: false,
        selected: false
    },
    id: -1
}