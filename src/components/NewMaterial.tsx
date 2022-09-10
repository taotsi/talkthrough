import React from "react"
import {Outlet} from "react-router-dom"
import {Container} from "semantic-ui-react"
import TheEditor from "./TheEditor"
import "../styles/NewMaterial.css"

export default class NewMaterial extends React.Component<any, any> {
    render() {
        return (
            <div>
                <Container>
                    <TheEditor/>
                </Container>
                <Outlet/>
            </div>
        )
    }
}
