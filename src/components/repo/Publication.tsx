import {Outlet, useParams, Link, Navigate} from "react-router-dom"
import {Container, Button, Icon} from "semantic-ui-react"
import TheEditor from "../TheEditor"
import {queryRepository} from "../../api/BackendClient"

export default function Publication() {
    const params = useParams()
    const repo = queryRepository(params.owner, params.repository)

    if (repo === undefined) {
        return <Navigate to="/404" replace={true} />
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