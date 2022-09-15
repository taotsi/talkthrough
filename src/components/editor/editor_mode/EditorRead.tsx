import {Slate} from "slate-react"
import {ToolBarRead} from "../toolbar/toolbar_fixed"
import {EditingAreaRead} from "../editing_area/editing_area"
import React from "react"
import {ToolBarReadHovering} from "../toolbar/toolbar_hovering"
import {Grid, Segment} from "semantic-ui-react"
import {EditorProps} from "../types"


export default function EditorRead(props: EditorProps) {
    const {editor, value, renderElement, renderLeaf} = props

    return (
        <Slate editor={editor} value={value}>
            <ToolBarReadHovering/>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={11}>
                        <ToolBarRead/>
                        <div className="editing_area">
                            <EditingAreaRead
                                // @ts-ignore
                                renderElement={renderElement}
                                renderLeaf={renderLeaf}
                            />
                        </div>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <div className="issues_area">
                            <IssueCard type="同义反复" notes="同义反复"/>
                            <IssueCard type="稻草人" notes="你在树立不存在的攻击对象"/>
                            <IssueCard type="缺少数据" notes="第一句"/>
                            <IssueCard type="缺少数据" notes="第二句"/>
                            <IssueCard type="缺少数据" notes="第三四句有问题"/>
                            <IssueCard type="缺少数据" notes="最后一句有问题"/>
                        </div>
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