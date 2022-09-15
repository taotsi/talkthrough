import React from "react"
import {EditingAreaDiff} from "../editing_area/editing_area"
import {Slate} from "slate-react"
import {EditorProps} from "../types"
import {Grid} from "semantic-ui-react"
import {ToolBarDiff} from "../toolbar/toolbar_fixed"

export default function EditorDiff(props: EditorProps) {
    const {editor, value, renderElement, renderLeaf} = props

    return (
        <Slate editor={editor} value={value}>
            <ToolBarDiff/>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <div className="editing_area">
                            <EditingAreaDiff
                                // @ts-ignore
                                renderElement={renderElement}
                                renderLeaf={renderLeaf}
                            />
                        </div>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <div className="editing_area">
                            <EditingAreaDiff
                                // @ts-ignore
                                renderElement={renderElement}
                                renderLeaf={renderLeaf}
                            />
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>


        </Slate>
    )
}