import React, {Component} from 'react';
import RichTextExample from './editor';
import {Container, Dropdown, Icon, Image, Input, Menu, Segment, Sticky} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
    render() {
        return (
            <div>
                <Sticky>
                    <Menu borderless attached size='tiny' inverted>
                        <Container>
                            <Menu.Item>
                                <Image src={'parthenon.png'} size={'mini'} fluid></Image>
                            </Menu.Item>
                            <Menu.Item>
                                <Input icon='search' placeholder='TODO'/>
                            </Menu.Item>
                            <Menu.Item
                                name='合并请求'
                                onClick={() => {
                                    console.log("MR clicked")
                                }}
                            />
                            <Menu.Item
                                name='质疑'
                                onClick={() => {
                                    console.log("issue clicked")
                                }}
                            />
                            <Menu.Item
                                name='探索'
                                onClick={() => {
                                    console.log("explore clicked")
                                }}
                            />

                            <Menu.Item position='right'>
                                <Dropdown item icon='bell' className='icon' direction='left'>
                                </Dropdown>

                                <Dropdown item icon='plus' className='icon' direction='left'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>
                                            <Icon name='book'/>
                                            <span className='text'>文章</span>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <Icon name='lightbulb'/>
                                            <span className='text'>素材</span>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                                <Dropdown item icon='user' className='icon' direction='left' position='right'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item disabled={true}>
                                            <span>hi，<strong>XXX</strong></span>
                                        </Dropdown.Item>

                                        <Dropdown.Divider/>
                                        <Dropdown.Item active={false}>
                                            <Icon name='id card'/>
                                            <span className='text'>你的档案</span>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <Icon name='book'/>
                                            <span className='text'>你的文章</span>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <Icon name='lightbulb'/>
                                            <span className='text'>你的素材</span>
                                        </Dropdown.Item>

                                        <Dropdown.Divider/>
                                        <Dropdown.Item>
                                            <Icon name='setting'/>
                                            <span className='text'>设置</span>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <Icon name='book'/>
                                            <span className='text'>帮助</span>
                                        </Dropdown.Item>

                                        <Dropdown.Divider/>
                                        <Dropdown.Item>
                                            <Icon name='log out'/>
                                            <span className='text'>退出</span>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
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
}

export default App;
