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
import Repository from "./components/repo/Repository"
import Material from "./components/Material"
import Publication from "./components/repo/Publication"

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
)

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navbar/>}>
                    <Route index element={<Explore/>}/>
                    <Route path="pulls" element={<Pulls/>}></Route>
                    <Route path="issues" element={<Issues/>}></Route>
                    <Route path="new/repository" element={<NewRepository/>}></Route>
                    <Route path="new/material" element={<NewMaterial/>}></Route>
                    <Route path="settings" element={<Settings/>}></Route>
                    <Route path="doc" element={<Doc/>}></Route>
                    <Route path=":owner" element={<User/>}/>
                    <Route path=":owner/materials/:material" element={<Material/>}></Route>
                    <Route path=":owner/:repository" element={<Repository/>}></Route>
                    <Route path=":owner/:repository/publication" element={<Publication/>}/>
                    <Route path="*" element={<Page404/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
