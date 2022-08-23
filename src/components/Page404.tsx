import React from "react";
import {Segment} from 'semantic-ui-react';

export default class Page404 extends React.Component {
    render() {
        return (
            <div>
                <Segment textAlign='center'>
                    <h1>页面不存在</h1>
                </Segment>
            </div>
        )
    }
}