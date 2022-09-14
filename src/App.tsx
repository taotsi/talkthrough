import LoadingBar from "react-top-loading-bar"
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import Navbar from "./components/Navbar"
import ExploreNav, {EXPLORE_TAB} from "./components/explore/ExploreNav"
import Explore from "./components/explore/Explore"
import NewRepository from "./components/repo/NewRepository"
import NewMaterial from "./components/material/NewMaterial"
import User from "./components/user/User"
import Pulls from "./components/user/Pulls"
import Issues from "./components/user/Issues"
import Settings from "./components/user/Settings"
import Doc from "./components/Doc"
import Material from "./components/material/Material"
import RepoHeader, {REPO_TAB} from "./components/repo/RepoHeader"
import RepoMain from "./components/repo/RepoMain"
import RepoMaterials from "./components/repo/RepoMaterials"
import RepoIssues from "./components/repo/RepoIssues"
import RepoPulls from "./components/repo/RepoPulls"
import RepoSettings from "./components/repo/RepoSettings"
import Page404 from "./components/common/Page404"
import React, {useState} from "react"

export default function App() {
    const [progress, setProgress] = useState(0)
    return (
        <BrowserRouter>
            <LoadingBar
                color="#f11946"
                progress={progress}
                onLoaderFinished={() => {setProgress(0)}}
            />
            <Routes>
                <Route path="/" element={<Navbar/>}>
                    <Route index element={<Navigate to="explore" replace={true}/>}/>

                    <Route path="explore" element={<ExploreNav/>}>
                        <Route index element={<Explore/>}/>
                        <Route path={EXPLORE_TAB.PAPERS.route} element={<Explore/>}/>
                        <Route path={EXPLORE_TAB.MATERIALS.route} element={<Explore/>}/>
                    </Route>

                    <Route path="new/repository" element={<NewRepository/>}/>
                    <Route path="new/material" element={<NewMaterial/>}/>

                    <Route path=":user" element={<User/>}/>
                    <Route path="pulls" element={<Pulls/>}/>
                    <Route path="issues" element={<Issues/>}/>
                    <Route path="settings" element={<Settings/>}/>

                    <Route path="doc" element={<Doc/>}/>

                    <Route path=":owner/materials/:material" element={<Material/>}/>

                    <Route path=":owner/:repository" element={<RepoHeader/>}>
                        <Route index element={<RepoMain/>}/>
                        <Route path={REPO_TAB.MATERIALS.route} element={<RepoMaterials/>}/>
                        <Route path={REPO_TAB.ISSUES.route} element={<RepoIssues/>}/>
                        <Route path={REPO_TAB.PULLS.route} element={<RepoPulls/>}/>
                        <Route path={REPO_TAB.SETTINGS.route} element={<RepoSettings/>}/>
                    </Route>

                    <Route path="404" element={<Page404/>}/>
                </Route>
                <Route path="*" element={<Page404/>}/>
            </Routes>
        </BrowserRouter>
    )
}