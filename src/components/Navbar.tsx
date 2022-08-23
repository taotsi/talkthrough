import React, {Component} from "react"
import {Container, Dropdown, Icon, Image, Input, Menu, Sticky} from "semantic-ui-react"
import {Link, Outlet} from "react-router-dom"

export default class Navbar extends Component {
    render() {
        return (
            <div>
                <Sticky>
                    <Menu borderless attached size='tiny' inverted>
                        <Container>
                            <Menu.Item as={Link} to="/">
                                <Image src={'parthenon.png'} size={'mini'} fluid></Image>
                            </Menu.Item>
                            <Menu.Item>
                                <Input icon='search' placeholder='搜索或跳转...'/>
                            </Menu.Item>

                            <Menu.Item position='right'>
                                <Dropdown item icon='bell' className='icon' direction='left'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to="/pulls">
                                            <Icon name='code branch'/>
                                            <span className='text'>合并请求</span>
                                        </Dropdown.Item>
                                        <Dropdown.Item as={Link} to='/issues'>
                                            <Icon name='question'/>
                                            <span className='text'>质疑</span>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                                <Dropdown item icon='plus' className='icon' direction='left'>
                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to="/new-paper">
                                            <Icon name='book'/>
                                            <span className='text'>文章</span>
                                        </Dropdown.Item>
                                        <Dropdown.Item as={Link} to='/new-material'>
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
                <Outlet/>
            </div>
        )
    }
}