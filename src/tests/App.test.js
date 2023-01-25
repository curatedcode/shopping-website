import { fireEvent, render, screen, waitForElementToBeRemoved } from "@testing-library/react"
import App from "../App"

it('fetches and renders data',async() => {
  render(<App />)
  await waitForElementToBeRemoved(screen.queryByText(/Loading.../i))

  expect(screen.queryByText(/Fake Phone/i)).toBeVisible()
  expect(screen.queryByText(/189/i)).toBeVisible()
  expect(screen.queryByText(/4.69/i)).toBeVisible()
  expect(screen.queryByAltText(/Fake Phone/i)).toBeVisible()
})

it('clicking on product brings you to that products page', async () => {
  render(<App />)

  fireEvent.click(screen.queryByText(/Fake Phone/i))
  await waitForElementToBeRemoved(screen.queryByText(/Loading.../i))
  const allPictures = screen.getAllByRole('img', {name: /Fake Phone/i})
  expect(allPictures.length).toBe(5)
  allPictures.forEach(img => expect(img).toBeVisible())

  const allPrices = screen.getAllByText(/189/i)
  expect(allPrices.length).toBe(2)
  expect(screen.queryByText(/A phone that has never been made before!/i)).toBeVisible()
})