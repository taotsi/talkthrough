import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Navbar from './components/Navbar'
import NewPaper from './components/NewPaper'
import Home from './components/Home'
import Page404 from './components/Page404'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navbar/>}>
                    <Route index element={<Home/>}/>
                    <Route path="new-paper" element={<NewPaper/>}></Route>
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
