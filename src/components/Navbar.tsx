import React, {useState} from "react"
import {Dropdown, Icon, Image, Input, Menu} from "semantic-ui-react"
import {Link, Outlet} from "react-router-dom"
import {queryCurrentUser} from "../api/BackendClient"

export default function NavBar() {
    const [user] = useState(queryCurrentUser())

    return (
        <div>
            <Menu borderless attached size="small" inverted>
                <Menu.Item as={Link} to="/">
                    <Image src={"/parthenon.png"} size={"mini"} fluid></Image>
                </Menu.Item>
                <Menu.Item>
                    <Input icon="search" placeholder="搜索或跳转..."/>
                </Menu.Item>

                {/*<Menu.Item as={Link} to="/pulls">*/}
                {/*    <span className="text">合并请求</span>*/}
                {/*</Menu.Item>*/}
                {/*<Menu.Item as={Link} to="/issues">*/}
                {/*    <span className="text">质疑</span>*/}
                {/*</Menu.Item>*/}

                <Menu.Item position="right">
                    <Dropdown item icon="plus" className="icon" direction="left">
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to="/new/repository">
                                <Icon name="book"/>
                                <span className="text">写作项目</span>
                            </Dropdown.Item>
                            <Dropdown.Item as={Link} to="/new/material">
                                <Icon name="lightbulb"/>
                                <span className="text">素材</span>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown item icon="user" className="icon" direction="left" position="right">
                        <Dropdown.Menu>
                            <Dropdown.Item disabled={true}>
                                <span>hi，<strong>{user.name}</strong></span>
                            </Dropdown.Item>

                            <Dropdown.Divider/>
                            <Dropdown.Item as={Link} to={"/" + user.name}>
                                <Icon name="id card"/>
                                <span className="text">你的档案</span>
                            </Dropdown.Item>
                            <Dropdown.Item as={Link} to={"/" + user.name + "?tab=repositories"}>
                                <Icon name="book"/>
                                <span className="text">你的写作项目</span>
                            </Dropdown.Item>
                            <Dropdown.Item as={Link} to={"/" + user.name + "?tab=materials"}>
                                <Icon name="lightbulb"/>
                                <span className="text">你的素材</span>
                            </Dropdown.Item>

                            <Dropdown.Divider/>
                            <Dropdown.Item as={Link} to="/settings">
                                <Icon name="settings"/>
                                <span className="text">设置</span>
                            </Dropdown.Item>
                            <Dropdown.Item as={Link} to="/doc">
                                <Icon name="question"/>
                                <span className="text">帮助</span>
                            </Dropdown.Item>

                            <Dropdown.Divider/>
                            <Dropdown.Item>
                                <Icon name="log out"/>
                                <span className="text">退出</span>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Menu>
            <Outlet/>
        </div>
    )
}
