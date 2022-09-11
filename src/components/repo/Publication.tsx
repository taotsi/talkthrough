import {Outlet, useParams, Link} from "react-router-dom"
import {Container, Button, Icon} from "semantic-ui-react"
import TheEditor from "../TheEditor"
import {queryRepository} from "../../api/BackendClient"
import Page404 from "../Page404"

export default function Publication() {
    const params = useParams()
    const repo = queryRepository(params.owner, params.repository)
    if (repo === undefined) {
        return <Page404/>
    }

    return (
        <div>
            <Container text>
                <TheEditor readOnly={true} text={repo.text}></TheEditor>
                <Link to={"/" + params.owner + "/" + params.repository}>项目页面</Link>
                <Button basic icon>
                    PDF
                    <Icon name="download"/>
                </Button>
            </Container>
            <Outlet/>
        </div>
    )
}