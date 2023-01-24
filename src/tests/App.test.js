import { render, screen, waitForElementToBeRemoved } from "@testing-library/react"
import App from "../App"

it('fetches and renders data',async() => {
  render(<App />)
  
  await waitForElementToBeRemoved(screen.queryByText(/Loading.../i))

  expect(screen.queryByText(/Fake Phone/i)).toBeVisible()
  expect(screen.queryByText(/189/i)).toBeVisible()
  expect(screen.queryByText(/4.69/i)).toBeVisible()
  expect(screen.queryByAltText(/Fake Phone/i)).toBeVisible()
})