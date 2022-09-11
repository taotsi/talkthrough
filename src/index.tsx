import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import reportWebVitals from "./reportWebVitals"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Navbar from "./components/Navbar"
import NewRepository from "./components/NewRepository"
import NewMaterial from "./components/NewMaterial"
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
import Material from "./components/Material"
import Publication from "./components/repo/Publication"
import "semantic-ui-css/semantic.min.css"
import RepoHeader, {
    REPO_TAB_ISSUES,
    REPO_TAB_MATERIALS,
    REPO_TAB_PUBLICATION,
    REPO_TAB_PULLS,
    REPO_TAB_SETTINGS
} from "./components/repo/RepoHeader"

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
)

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navbar/>}>
                    <Route index element={<Explore/>}/>
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
                        <Route path={REPO_TAB_MATERIALS} element={<RepoMaterials/>}/>
                        <Route path={REPO_TAB_ISSUES} element={<RepoIssues/>}/>
                        <Route path={REPO_TAB_PULLS} element={<RepoPulls/>}/>
                        <Route path={REPO_TAB_SETTINGS} element={<RepoSettings/>}/>
                    </Route>
                    <Route path={":owner/:repository/" + REPO_TAB_PUBLICATION} element={<Publication/>}/>
                    <Route path="404" element={<Page404/>}/>
                </Route>
                {/*<Route path="*" element={<Page404/>}/>*/}
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
