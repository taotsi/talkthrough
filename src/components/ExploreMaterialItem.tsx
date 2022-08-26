import React from "react";
import {Item} from "semantic-ui-react"
import {Link} from "react-router-dom"

export default function ExploreMaterialItem(props: any) {
    const header = props.header
    return (
        <Item>
            <Item.Content>
                <Item.Header as={Link} to={header.author + "/materials/" + header.project}>
                    {header.title}
                </Item.Header>
                <Item.Meta>
                    <Link to={header.author}>
                        {header.author}
                    </Link>
                </Item.Meta>
            </Item.Content>
        </Item>
    )
}
