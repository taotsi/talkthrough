import {Link, Outlet} from "react-router-dom"
import {Container, Menu} from "semantic-ui-react"
import React, {useState} from "react"

export const EXPLORE_TAB = {
    PAPERS: {
        cn: "文章",
        en: "papers",
        route: "papers"
    },
    MATERIALS: {
        cn: "素材",
        en: "materials",
        route: "materials"
    }
}

export default function ExploreNav() {
    const [tab, setTab] = useState(EXPLORE_TAB.PAPERS.en)

    return (
        <div>
            <Container>
                <Menu pointing secondary>
                    <Menu.Item
                        as={Link} to={EXPLORE_TAB.PAPERS.en}
                        name={EXPLORE_TAB.PAPERS.cn}
                        active={tab === EXPLORE_TAB.PAPERS.en}
                        onClick={() => setTab(EXPLORE_TAB.PAPERS.en)}
                    />
                    <Menu.Item
                        as={Link} to={EXPLORE_TAB.MATERIALS.en}
                        name={EXPLORE_TAB.MATERIALS.cn}
                        active={tab === EXPLORE_TAB.MATERIALS.en}
                        onClick={() => setTab(EXPLORE_TAB.MATERIALS.en)}
                    />
                </Menu>
            </Container>
            <Outlet/>
        </div>
    )
}
