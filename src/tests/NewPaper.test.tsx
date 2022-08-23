import React from 'react'
import {render, screen} from '@testing-library/react'
import NewPaper from '../components/NewPaper'

test('renders learn react link', () => {
    render(<NewPaper/>)
    const linkElement = screen.getByText(/learn react/i)
    expect(linkElement).toBeInTheDocument()
})
