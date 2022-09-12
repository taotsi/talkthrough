import React from "react"
import {Outlet} from "react-router-dom"
import {Container} from "semantic-ui-react"
import TheEditor from "../editor/TheEditor"
import {EDITOR_MODE} from "../editor/constants"

export default class NewMaterial extends React.Component<any, any> {
    render() {
        return (
            <div>
                <Container text>
                    <TheEditor mode={EDITOR_MODE.EDIT}/>
                </Container>
                <Outlet/>
            </div>
        )
    }
}
