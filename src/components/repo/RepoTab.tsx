import {Icon, Menu} from "semantic-ui-react"

export default function RepoTab() {
    return (
        <Menu secondary pointing>
            <Menu.Item>
                <Icon name="wrench"/>项目
            </Menu.Item>
            <Menu.Item>
                <Icon name="book"/>发表
            </Menu.Item>
            <Menu.Item>
                <Icon name="lightbulb"/>素材
            </Menu.Item>
            <Menu.Item>
                <Icon name="question"/>质疑
            </Menu.Item>
            <Menu.Item>
                <Icon name="fork"/>合并请求
            </Menu.Item>
            <Menu.Item>
                <Icon name="setting"/>设置
            </Menu.Item>
        </Menu>
    )
}
