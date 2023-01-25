import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Product from "../pages/Product";

it('clicking on product brings you to that products page', async () => {
  const queryClient = new QueryClient()
  const CustomHome = () =>{
    return(
      <MemoryRouter initialEntries={['/','/products/1']}>
        <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products/:id" element={<Product />} />
            </Routes>
        </QueryClientProvider>
      </MemoryRouter>
    )
  }
  render(<CustomHome />)
  await waitForElementToBeRemoved(screen.queryByText(/Loading.../i))

  fireEvent.click(screen.queryByText(/Fake Phone/i))

  const allPictures = screen.getAllByRole('img', {name: /Fake Phone/i})
  expect(allPictures.length).toBe(5)
  allPictures.forEach(img => expect(img).toBeVisible())

  const allPrices = screen.getAllByText(/189/i)
  expect(allPrices.length).toBe(2)
  expect(screen.queryByText(/A phone that has never been made before!/i)).toBeVisible()
})