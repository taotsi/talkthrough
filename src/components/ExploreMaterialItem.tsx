import React from "react"
import {Header} from "semantic-ui-react"
import {Link} from "react-router-dom"

export default function ExploreMaterialItem(props: any) {
    const header = props.header
    return (
        <Header as="h3">
            <Link className="explore_header" to={header.owner + "/materials/" + header.id}>
                {header.title}
            </Link>
            <Header.Subheader>
                <Link className="explore_subheader" to={header.owner}>
                    {header.owner}
                </Link>
            </Header.Subheader>
        </Header>
    )
}
