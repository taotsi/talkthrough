import React from "react";
import {Outlet} from "react-router-dom"
import {Container, Segment} from "semantic-ui-react"
import {TheEditor} from "./TheEditor"

export default class NewMaterial extends React.Component<any, any> {
    render() {
        return (
            <div>
                <Container text>
                    <Segment>
                        <TheEditor/>
                    </Segment>
                </Container>
                <Outlet/>
            </div>
        )
    }
}
