import React from "react"
import {Container, Menu, Segment} from 'semantic-ui-react'
import materials from "./examples/materials.json"
import papers from "./examples/papers.json"

const SHOW_PAPERS = "文章"
const SHOW_MATERIALS = "素材"

export default class Explore extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            activeItem: SHOW_PAPERS,
            headers: []
        };
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick(e: any, {name}: any ) {
        this.setState({ activeItem: name })
        if (name === SHOW_PAPERS) {
            this.setState({content: queryPaperHeaders})
        } else if (name === SHOW_MATERIALS) {
            this.setState({content: queryMaterials})
        }
    }

    render() {
        // @ts-ignore
        return (
            <div>
                <Container>
                    <Menu pointing secondary>
                        <Menu.Item
                            name={SHOW_PAPERS}
                            // @ts-ignore
                            active={this.state.activeItem === SHOW_PAPERS}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            name={SHOW_MATERIALS}
                            // @ts-ignore
                            active={this.state.activeItem === SHOW_MATERIALS}
                            onClick={this.handleItemClick}
                        />
                    </Menu>
                    <Segment>
                        <p>123</p>
                    </Segment>
                </Container>
            </div>
        )
    }
}

const queryPaperHeaders = () => {
    return papers
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

const queryMaterials = () => {
    return materials
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