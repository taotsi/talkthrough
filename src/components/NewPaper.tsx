import React from 'react'
import {TtEditor} from './editor'
import {Container, Segment} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import {Outlet} from "react-router-dom"

class NewPaper extends React.Component {
    render() {
        return (
            <div>
                <Container>
                    <Segment>
                        <TtEditor/>
                    </Segment>
                </Container>
                <Outlet/>
            </div>
        )
    }
}

export default NewPaper
