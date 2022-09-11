import {Link, Outlet} from "react-router-dom"
import {Container, Icon, Menu} from "semantic-ui-react"
import React, {useState} from "react"

export const EXPLORE_TAB = {
    PAPERS: "文章",
    MATERIALS: "素材"
}

export default function ExploreNav() {
    const [tab, setTab] = useState(EXPLORE_TAB.PAPERS)

    return (
        <div>
            <Container>
                <Menu pointing secondary>
                    <Menu.Item
                        as={Link} to="papers"
                        name={EXPLORE_TAB.PAPERS}
                        active={tab === EXPLORE_TAB.PAPERS}
                        onClick={() => setTab(EXPLORE_TAB.PAPERS)}
                    />
                    <Menu.Item
                        as={Link} to="materials"
                        name={EXPLORE_TAB.MATERIALS}
                        active={tab === EXPLORE_TAB.MATERIALS}
                        onClick={() => setTab(EXPLORE_TAB.MATERIALS)}
                    />
                </Menu>
            </Container>
            <Outlet/>
        </div>
    )
}

const TabItem = (props: any) => {
    return (
        <Menu.Item
            as={Link} to={props.tab}
            active={props.tab === props.currentTab}
            onClick={() => {
                props.setCurrentTab(props.tab)
            }}
        >
            <Icon name={props.icon}/>
            {props.name}
        </Menu.Item>
    )
}
