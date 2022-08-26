import React from "react";
import {Item, Icon} from "semantic-ui-react"
import {Link} from "react-router-dom"

export default function ExploreRepositoryItem(props: any) {
    const header = props.header
    const repoUrl = header.author + '/' + header.repository
    const repoUrlRender = header.author + ' / ' + header.repository
    return (
        <Item>
            <Item.Content>
                <Item.Header as={Link} to={repoUrl}>
                    {header.title}
                </Item.Header>
                <Item.Meta>
                    <Link to={header.repository + '/pulls'}>
                        <Icon name='code branch' size='small'/>
                        {header.pulls}
                    </Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;

                    <Link to={header.repository + "/issues"}>
                        <Icon name='bug' size='small'/>
                        {header.issues}
                    </Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;

                    <Link to={repoUrl}>
                        {repoUrlRender}
                    </Link>
                </Item.Meta>
            </Item.Content>
        </Item>
    )
}
