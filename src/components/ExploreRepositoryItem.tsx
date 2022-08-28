import React from "react"
import {Icon, Item} from "semantic-ui-react"
import {Link} from "react-router-dom"

export default function ExploreRepositoryItem(props: any) {
    const header = props.header

    return (
        <Item>
            <Item.Content>
                <Item.Header as={Link} to={header.owner + "/" + header.repository}>
                    {header.title}
                </Item.Header>
                <Item.Meta>
                    <Link to={header.repository + "/pulls"}>
                        <Icon name="code branch" size="small"/>
                        {header.pulls}
                    </Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;

                    <Link to={header.repository + "/issues"}>
                        <Icon name="bug" size="small"/>
                        {header.issues}
                    </Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;

                    <Link to={header.owner}>
                        {header.owner}
                    </Link>
                    {" / "}
                    <Link to={header.owner + "/" + header.repository}>
                        {header.repository}
                    </Link>

                </Item.Meta>
            </Item.Content>
        </Item>
    )
}
