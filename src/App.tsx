import React from 'react';
import {TtEditor} from './editor';
import NavBar from './navbar'
import {Container, Segment} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class App extends React.Component {
    render() {
        return (
            <div>
                <NavBar/>
                <Container>
                    <Segment>
                        <TtEditor/>
                    </Segment>
                </Container>
            </div>
        );
    }
}

export default App;
