import React from 'react';
import RichTextExample from './editor';
import {Menu, Input, Button, Sticky, Segment, Container} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

function App() {
    return (
        <div>
            <Sticky>
                <Menu borderless attached inverted>
                    <Container>
                        <Menu.Item>TODO：标志</Menu.Item>
                        <Menu.Item position='left'>
                            <Input className='icon' icon='search' placeholder='TODO'/>
                        </Menu.Item>
                        <Menu.Item>
                            <Button>Log in</Button>
                        </Menu.Item>
                        <Menu.Item>
                            <Button>Sign up</Button>
                        </Menu.Item>
                    </Container>
                </Menu>
            </Sticky>

            <Container>
                <Segment>
                    <RichTextExample/>
                </Segment>
            </Container>
        </div>
    );
}

export default App;
