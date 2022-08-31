import React from "react"
import {Outlet} from "react-router-dom"
import {Container, Form, Segment} from "semantic-ui-react"
import TheEditor from "./TheEditor"
import "../styles/NewMaterial.css"

export default class NewMaterial extends React.Component<any, any> {
    render() {
        return (
            <div>
                <div className="container">
                    <div className="left-col">
                        <Form>
                            <Form.Group>
                                <Form.Field
                                    label="公开"
                                    control="input"
                                    type="radio"
                                    name="htmlRadios"
                                >
                                </Form.Field>
                                <Form.Field
                                    label="私有"
                                    control="input"
                                    type="radio"
                                    name="htmlRadios"
                                    checked
                                />
                            </Form.Group>

                            <Form.Button positive>创建素材</Form.Button>
                        </Form>
                    </div>

                    <div className="center-col">
                        <Container>
                            <Segment>
                                <TheEditor/>
                            </Segment>
                        </Container>
                    </div>
                </div>
                <Outlet/>
            </div>
        )
    }
}
