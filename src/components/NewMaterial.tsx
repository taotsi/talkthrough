import React from "react"
import {Outlet} from "react-router-dom"
import {Form, Segment} from "semantic-ui-react"
import TheEditor from "./TheEditor"
import "../styles/NewMaterial.css"

export default class NewMaterial extends React.Component<any, any> {
    render() {
        return (
            <div>
                <div className="container">
                    <div className="left-col">
                        <Form.Button positive>创建素材</Form.Button>
                    </div>

                    <div className="center-col">
                        <TheEditor/>
                    </div>
                    <div className="right-col">
                        <p>123</p>
                    </div>
                </div>
                <Outlet/>
            </div>
        )
    }
}
