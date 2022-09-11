import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import reportWebVitals from "./reportWebVitals"
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import Navbar from "./components/Navbar"
import NewRepository from "./components/repo/NewRepository"
import NewMaterial from "./components/material/NewMaterial"
import Explore from "./components/explore/Explore"
import Page404 from "./components/Page404"
import Settings from "./components/Settings"
import Doc from "./components/Doc"
import User from "./components/User"
import Pulls from "./components/Pulls"
import Issues from "./components/Issues"
import RepoMain from "./components/repo/RepoMain"
import RepoMaterials from "./components/repo/RepoMaterials"
import RepoIssues from "./components/repo/RepoIssues"
import RepoPulls from "./components/repo/RepoPulls"
import RepoSettings from "./components/repo/RepoSettings"
import Material from "./components/material/Material"
import Publication from "./components/repo/Publication"
import "semantic-ui-css/semantic.min.css"
import RepoHeader, {REPO_TAB} from "./components/repo/RepoHeader"
import ExploreNav, {EXPLORE_TAB} from "./components/explore/ExploreNav"

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
)

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navbar/>}>
                    <Route index element={<Navigate to="explore" replace={true}/>}/>

                    <Route path="explore" element={<ExploreNav/>}>
                        <Route index element={<Explore tab={EXPLORE_TAB.PAPERS.route}/>}/>
                        <Route path="papers" element={<Explore tab={EXPLORE_TAB.PAPERS.route}/>}/>
                        <Route path="materials" element={<Explore tab={EXPLORE_TAB.MATERIALS.route}/>}/>
                    </Route>

                    <Route path="pulls" element={<Pulls/>}/>
                    <Route path="issues" element={<Issues/>}/>
                    <Route path="new/repository" element={<NewRepository/>}/>
                    <Route path="new/material" element={<NewMaterial/>}/>
                    <Route path="settings" element={<Settings/>}/>
                    <Route path="doc" element={<Doc/>}/>
                    <Route path=":user" element={<User/>}/>
                    <Route path=":owner/materials/:material" element={<Material/>}/>

                    <Route path=":owner/:repository" element={<RepoHeader/>}>
                        <Route index element={<RepoMain/>}/>
                        <Route path={REPO_TAB.MATERIALS.route} element={<RepoMaterials/>}/>
                        <Route path={REPO_TAB.ISSUES.route} element={<RepoIssues/>}/>
                        <Route path={REPO_TAB.PULLS.route} element={<RepoPulls/>}/>
                        <Route path={REPO_TAB.SETTINGS.route} element={<RepoSettings/>}/>
                    </Route>
                    <Route path={":owner/:repository/" + REPO_TAB.PUBLICATION.route} element={<Publication/>}/>

                    <Route path="404" element={<Page404/>}/>
                </Route>
                <Route path="*" element={<Page404/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
