import React from "react";
import {Item, Icon} from "semantic-ui-react"
import {Link} from "react-router-dom"

export default function ExplorePaperItem(props: any) {
    const header = props.header
    return (
        <Item>
            <Item.Content>
                <Item.Header as={Link} to={header.author + "/papers/" + header.project}>
                    {header.title}
                </Item.Header>
                <Item.Meta>
                    <Link to={header.author}>
                        {header.author}
                    </Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to={header.project + '/pulls'}>
                        <Icon name='code branch' size='small'/>
                        {header.pulls}
                    </Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to={header.project + "/issues"}>
                        <Icon name='bug' size='small'/>
                        {header.issues}
                    </Link>
                </Item.Meta>
            </Item.Content>
        </Item>
    )
}
