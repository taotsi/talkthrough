import {Constant} from "../../types/types"
import {Icon, Menu} from "semantic-ui-react"
import {Link} from "react-router-dom"

export default function TabItem(props: {value: Constant, currentTab: string}) {
    const icon = props.value.icon
    console.log("icon: ", icon)
    return (
        <Menu.Item
            as={Link} to={props.value.route}
            active={props.value.en === props.currentTab}
        >
            <Icon name={icon}/>
            {props.value.cn}
        </Menu.Item>
    )
}