import React from "react"
import {Outlet} from "react-router-dom"
import {Container, Form, Segment} from "semantic-ui-react"
import TheEditor from "./TheEditor"
// import IFrameExample from "./IFrameEditor"

export default class NewMaterial extends React.Component<any, any> {
    render() {
        return (
            <div>
                <Container text>
                    <Segment>
                        <TheEditor/>
                    </Segment>
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
                </Container>
                <Outlet/>
            </div>
        )
    }
}
