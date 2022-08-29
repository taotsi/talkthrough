import React from "react"
import {Header, Icon, Button, Table} from "semantic-ui-react"
import {Link} from "react-router-dom"
import "../../styles/Explore.css"

export default function ExploreRepositoryItem(props: any) {
    const header = props.header

    return (
        <Table.Row>
            <Table.Cell>
                <Header as="h3">
                    <Link className="explore_header" to={header.owner + "/" + header.repository + "/publication"}>
                        {header.title}
                    </Link>
                    <Header.Subheader>
                        <Link className="explore_subheader" to={header.repository + "/pulls"}>
                            <Icon name="star outline" size="small" fitted/>
                            {" " + header.stars}
                        </Link>
                        &nbsp;&nbsp;&nbsp;&nbsp;

                        <Link className="explore_subheader" to={header.repository + "/pulls"}>
                            <Icon name="code branch" size="small" fitted/>
                            {" " + header.pulls}
                        </Link>
                        &nbsp;&nbsp;&nbsp;&nbsp;

                        <Link className="explore_subheader" to={header.repository + "/issues"}>
                            <Icon name="bug" size="small" fitted/>
                            {" " + header.issues}
                        </Link>
                        &nbsp;&nbsp;&nbsp;&nbsp;

                        <Link className="explore_subheader" to={header.owner}>
                            {header.owner}
                        </Link>
                        {<strong style={{color: "#505050"}}>{" / "}</strong>}
                        <Link className="explore_subheader" to={header.owner + "/" + header.repository}>
                            {header.repository}
                        </Link>
                    </Header.Subheader>
                </Header>
            </Table.Cell>
            <Table.Cell collapsing>
                <Button basic icon="plus" size="mini"/>
            </Table.Cell>
        </Table.Row>
    )
}
