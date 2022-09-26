import React from "react"
import {Container, Divider, Form} from "semantic-ui-react"
import "semantic-ui-css/semantic.min.css"
import {Outlet} from "react-router-dom"
import {queryCurrentUser} from "../../api/BackendClient"

export const LICENSES = [{text: "GPL 3.0", value: "GPL 3.0"}, {text: "CC By 4.0", value: "CC By 4.0"}]
export default function NewRepository() {
    const user = queryCurrentUser().name
    const availableUsers = [{text: user, value: user}]

    return (
        <div>
            <Container text>
                <Form>
                    <br/>
                    <h2>新建项目</h2>
                    <div className="ui disabled input">包含<strong>一篇</strong>文章和相关的素材</div>
                    <Divider/>

                    <Form.Group>
                        <Form.Select required fluid label="用户" placeholder={user}
                                     options={availableUsers}></Form.Select>
                        <h2>/</h2>
                        <Form.Input required label="项目名称"></Form.Input>
                    </Form.Group>
                    <Form.Group>
                        <div className="ui disabled input">项目名称不是文章标题。项目名称应该简短好记。</div>
                    </Form.Group>
                    <Form.TextArea fluid label="简要描述"/>
                    <Divider/>

                    <Form.Group grouped>
                        <Form.Field
                            label="公开"
                            control="input"
                            type="radio"
                            name="htmlRadios"
                            checked
                        >
                        </Form.Field>
                        <div className="ui disabled input">所有人都可以看到该项目。你决定谁可以提交修改。</div>
                        <Form.Field
                            label="私有"
                            control="input"
                            type="radio"
                            name="htmlRadios"
                        />
                        <div className="ui disabled input">你决定谁可以看到该项目和提交修改。</div>
                    </Form.Group>
                    <Divider/>

                    <Form.Group>
                        <Form.Select label="选择许可协议" options={LICENSES}></Form.Select>
                    </Form.Group>
                    <Form.Checkbox label="初始化为通用论文格式"/>
                    <Divider/>

                    <Form.Button positive>新建项目</Form.Button>
                </Form>
            </Container>
            <Outlet/>
        </div>
    )
}
