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
    {text: "不恰当的论证", value: "不恰当的论证"},
    {text: "沉没成本", value: "沉没成本"},
    {text: "错误类比", value: "错误类比"},
    {text: "分解谬误", value: "分解谬误"},
    {text: "分散注意力", value: "分散注意力"},
    {text: "改变含义", value: "改变含义"},
    {text: "合成谬误", value: "合成谬误"},
    {text: "攻击稻草人", value: "攻击稻草人"},
    {text: "滑坡", value: "滑坡"},
    {text: "结论含糊", value: "结论含糊"},
    {text: "离题", value: "离题"},
    {text: "人身攻击", value: "人身攻击"},
    {text: "假两难悖论", value: "假两难悖论"},
    {text: "来源谬误", value: "来源谬误"},
    {text: "诉诸不当权威", value: "诉诸不当权威"},
    {text: "诉诸传统", value: "诉诸传统"},
    {text: "诉诸大众", value: "诉诸大众"},
    {text: "诉诸恐惧", value: "诉诸恐惧"},
    {text: "诉诸怜悯", value: "诉诸怜悯"},
    {text: "诉诸无知", value: "诉诸无知"},
    {text: "诉诸虚伪", value: "诉诸虚伪"},
    {text: "轻率概括", value: "轻率概括"},
    {text: "伪问题", value: "伪问题"},
    {text: "循环论证", value: "循环论证"},
    {text: "因果谬误", value: "因果谬误"},
    {text: "预设结论", value: "预设结论"},
    {text: "只作断言", value: "只作断言"},
    {text: "其他", value: "其他"},
]

export const INIT_ISSUE = {
    content: {
        type: "",
        notes: ""
    },
    status: {
        collapsed: false,
        editable: true,
        selected: false
    },
    id: -1
}