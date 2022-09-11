import React from "react"
import {Outlet} from "react-router-dom"
import {Button, Container} from "semantic-ui-react"
import TheEditor from "../TheEditor"
import "../../styles/NewMaterial.css"

export default class NewMaterial extends React.Component<any, any> {
    render() {
        return (
            <div>
                <Container>
                    <TheEditor/>
                    <br/>
                    <Button positive>新建素材</Button>
                </Container>
                <Outlet/>
            </div>
        )
    }
}
