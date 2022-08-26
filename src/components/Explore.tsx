import React from "react"
import {Container, Menu, Item} from 'semantic-ui-react'
import materials from "./examples/materials.json"
import papers from "./examples/repositories.json"
import ExploreRepositoryItem from "./ExploreRepositoryItem";
import {Outlet} from "react-router-dom";
import ExploreMaterialItem from "./ExploreMaterialItem";

const TAB = {
    PAPERS: "文章",
    MATERIALS: "素材"
}

export default class Explore extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.handleItemClick = this.handleItemClick.bind(this);

        this.state = {
            tab: TAB.PAPERS,
            headers: getHeaders(TAB.PAPERS)
        };
    }

    handleItemClick(e: any, {name}: any) {
        this.setState(
            {
                tab: name,
                headers: getHeaders(name)
            }
        )
    }

    render() {
        return (
            <div>
                <Container text>
                    <Menu pointing secondary>
                        <Menu.Item
                            name={TAB.PAPERS}
                            active={this.state.tab === TAB.PAPERS}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name={TAB.MATERIALS}
                            active={this.state.tab === TAB.MATERIALS}
                            onClick={this.handleItemClick}
                        />
                    </Menu>
                    <Item.Group>
                        {this.renderItems(this.state.headers)}
                    </Item.Group>
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
        if (this.state.tab === TAB.PAPERS) {
            for (let i = 0; i < n; i++) {
                result.push(<ExploreRepositoryItem header={headers[i]}/>)
            }
        } else if (this.state.tab === TAB.MATERIALS) {
            for (let i = 0; i < n; i++) {
                result.push(<ExploreMaterialItem header={headers[i]}/>)
            }
        }

        return result
    }
}

function getHeaders(name: string) {
    if (name === TAB.PAPERS) {
        return queryRepoHeaders()
    } else if (name === TAB.MATERIALS) {
        return queryMaterials()
    }
}

const queryRepoHeaders = () => {
    return papers
}

const queryMaterials = () => {
    return materials
}

// const queryPaper = (id: number) => {
//     for (let i = 0; i < papers.length; i++) {
//         const paper = papers[i]
//         if (paper.id === id) {
//             return paper
//         }
//     }
//     return null
// }
//
// const queryMaterial = (id: number) => {
//     for (let i = 0; i < materials.length; i++) {
//         const material = materials[i]
//         if (material.id === id) {
//             return material
//         }
//     }
//     return null
// }