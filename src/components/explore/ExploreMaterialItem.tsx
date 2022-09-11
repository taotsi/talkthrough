import React from "react"
import {Button, Header, Table} from "semantic-ui-react"
import {Link} from "react-router-dom"

export default function ExploreMaterialItem(props: any) {
    const header = props.header
    return (
        <Table.Row>
            <Table.Cell>
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
            </Table.Cell>
            <Table.Cell collapsing>
                <Button basic icon="plus" size="mini"/>
            </Table.Cell>
        </Table.Row>
    )
}
