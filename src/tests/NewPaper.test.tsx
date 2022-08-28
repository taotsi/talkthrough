import React from "react"
import {render, screen} from "@testing-library/react"
import NewRepository from "../components/NewRepository"

test("renders learn react link", () => {
    render(<NewRepository/>)
    const linkElement = screen.getByText(/learn react/i)
    expect(linkElement).toBeInTheDocument()
})
