import {Button, Icon, Segment} from "semantic-ui-react"
import {Link, useParams} from "react-router-dom"
import "../../styles/Repo.css"

export default function RepoHeader(props: any) {
    const param = useParams()
    const repoName = param.repository
    const owner = param.owner

    return (
        <div>
            <Segment>
                <div className="repo_header">
                    <Icon name="book"/>
                    <Link to={"/" + owner}>{owner}</Link>
                    <strong>{" / "}</strong>
                    <Link to={"/" + owner + "/" + repoName}><strong>{repoName}</strong></Link>

                    <Button basic floated="right">
                        <Icon name="star"/>
                        {"Star "}{props.stars}
                    </Button>
                </div>
                <br/>
                <br/>
            </Segment>
        </div>


    )
}