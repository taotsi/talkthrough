import {BrowserRouter, Route, Routes} from "react-router-dom"
import Navbar from "./components/Navbar"
import Explore from "./components/explore/Explore"
import NewRepository from "./components/repo/NewRepository"
import User from "./components/user/User"
import Pulls from "./components/user/Pulls"
import Issues from "./components/user/Issues"
import Settings from "./components/user/Settings"
import Doc from "./components/Doc"
import RepoHeader, {REPO_TAB} from "./components/repo/RepoHeader"
import RepoMain from "./components/repo/RepoMain"
import RepoIssues from "./components/repo/RepoIssues"
import RepoPulls from "./components/repo/RepoPulls"
import RepoSettings from "./components/repo/RepoSettings"
import Page404 from "./components/common/Page404"
import React from "react"

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navbar/>}>
                    <Route index element={<Explore/>}/>

                    <Route path="new" element={<NewRepository/>}/>

                    <Route path=":user" element={<User/>}/>
                    <Route path="pulls" element={<Pulls/>}/>
                    <Route path="issues" element={<Issues/>}/>
                    <Route path="settings" element={<Settings/>}/>

                    <Route path="doc" element={<Doc/>}/>

                    <Route path=":owner/:repository" element={<RepoHeader/>}>
                        <Route index element={<RepoMain/>}/>
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