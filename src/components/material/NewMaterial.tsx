import React from "react"
import {Outlet} from "react-router-dom"
import {Button, Container} from "semantic-ui-react"
import TheEditor from "../editor/TheEditor"
import {EDITOR_MODE} from "../editor/constants"

export default class NewMaterial extends React.Component<any, any> {
    render() {
        return (
            <div>
                <Container>
                    <TheEditor mode={EDITOR_MODE.READ}/>
                    <br/>
                    <Button positive>新建素材</Button>
                </Container>
                <Outlet/>
            </div>
        )
    }
}
