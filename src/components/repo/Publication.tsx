import {Outlet} from "react-router-dom"
import RepoHeader from "./RepoHeader"
import {Container} from "semantic-ui-react"

export default function Publication() {
    return (
        <div>
            <RepoHeader/>
            <Container>
                repo publication page
            </Container>
            <Outlet/>
        </div>
    )
}