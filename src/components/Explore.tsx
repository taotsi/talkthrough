import React from "react"
import {Container, Divider, Menu, Segment} from 'semantic-ui-react'
import materials from "./examples/materials.json"
import papers from "./examples/papers.json"
import ExploreItem from "./ExploreItem";
import {Outlet} from "react-router-dom";

const TAB = {
    PAPERS: "文章",
    MATERIALS: "素材"
}

export default class Explore extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.handleItemClick = this.handleItemClick.bind(this);

        this.state = {
            activeItem: TAB.PAPERS,
            headers: getHeaders(TAB.PAPERS)
        };
    }

    handleItemClick(e: any, {name}: any) {
        this.setState(
            {
                activeItem: name,
                headers: getHeaders(name)
            }
        )
    }

    render() {
        return (
            <div>
                <Container>
                    <Menu pointing secondary>
                        <Menu.Item
                            name={TAB.PAPERS}
                            active={this.state.activeItem === TAB.PAPERS}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name={TAB.MATERIALS}
                            active={this.state.activeItem === TAB.MATERIALS}
                            onClick={this.handleItemClick}
                        />
                    </Menu>
                    {this.renderItems(this.state.headers)}
                </Container>
                <Outlet/>
            </div>
        )
    }

    renderItems = (headers: any[]) => {
        let result: any[] = []
        const n = headers.length
        if (n < 1) {
            return result
        }
        result.push(<ExploreItem header={headers[0]}/>)
        for (let i = 1; i < n; i++) {
            const header = headers[i]
            result.push(<Divider/>)
            result.push(<ExploreItem header={header}/>)
        }
        return result
    }
}

function getHeaders(name: string) {
    if (name === TAB.PAPERS) {
        return queryPaperHeaders()
    } else if (name === TAB.MATERIALS) {
        return queryMaterials()
    }
}

const queryPaperHeaders = () => {
    return papers
}

const queryMaterials = () => {
    return materials
}

const queryPaper = (id: number) => {
    for (let i = 0; i < papers.length; i++) {
        const paper = papers[i]
        if (paper.id === id) {
            return paper
        }
    }
    return null
}

const queryMaterial = (id: number) => {
    for (let i = 0; i < materials.length; i++) {
        const material = materials[i]
        if (material.id === id) {
            return material
        }
    }
    return null
}