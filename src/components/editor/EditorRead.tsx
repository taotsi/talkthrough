import {Slate} from "slate-react"
import FixedToolbar from "./FixedToolbar"
import {EditingArea} from "./EditingArea"
import React from "react"
import HoveringToolbar from "./HoveringToolBar"
import {Grid, Segment} from "semantic-ui-react"

export default function EditorRead(props: any) {
    const {editor, value, mode, renderElement, renderLeaf} = props

    return (
        <Slate editor={editor} value={value}>
            <HoveringToolbar/>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={9}>
                        <div>
                            <FixedToolbar mode={mode}/>
                            <EditingArea
                                // @ts-ignore
                                renderElement={renderElement}
                                renderLeaf={renderLeaf}
                                mode={mode}
                            />
                        </div>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <IssueCard type="同义反复" notes="同义反复"/>
                        <IssueCard type="稻草人" notes="树立不存在的攻击对象"/>
                        <IssueCard type="缺少数据" notes="经验归纳需要提供数据证明，或者引用他人数据"/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        </Slate>
    )
}

const IssueCard = ({type, notes}: any) => {
    return (
        <Segment>
            <h5>{type}</h5>
            <p>{notes}</p>
        </Segment>
    )
}