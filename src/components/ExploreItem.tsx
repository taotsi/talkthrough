import React from "react";
import {Item} from "semantic-ui-react"

export default function ExploreItem(props: any) {
    return (
        <div>
            <Item>
                <Item.Content>
                    <Item.Header>{props.header.title}</Item.Header>
                    <Item.Meta>{props.header.author}</Item.Meta>
                </Item.Content>
            </Item>
        </div>
    )
}
