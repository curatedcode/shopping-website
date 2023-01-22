import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom'
import App from "./App"
import userEvent from "@testing-library/user-event"

it('app renders on page load',()=>{
  render(<App />)
  expect(screen.getByText(/Home Page/i)).toBeInTheDocument()
})

it('can click on page title to go home',()=>{
  render(<App />)
  userEvent.click(screen.getByText(/Shop-R-Us/i))
  expect(screen.getByText(/Home Page/i)).toBeInTheDocument()
})

it('can click on cart to go to cart page',()=>{
  render(<App />)
  userEvent.click(screen.getByText(/Cart/i))
  expect(screen.getByText(/Cart Page/i)).toBeInTheDocument()
})