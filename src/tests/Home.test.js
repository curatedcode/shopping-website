import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Product from "../pages/Product";

it('fetches and renders api data',async() => {
  const queryClient = new QueryClient()
  const CustomHome = () =>{
    return(
      <MemoryRouter initialEntries={['/']}>
        <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
        </QueryClientProvider>
      </MemoryRouter>
    )
  }
  render(<CustomHome />)
  await waitForElementToBeRemoved(screen.queryByText(/Loading.../i))

  expect(screen.getByText(/Fake Phone/i)).toBeVisible()
  expect(screen.getByText(/189/i)).toBeVisible()
  expect(screen.getByAltText(/Fake Phone/i)).toBeVisible()
})

it('clicking on product brings you to that products page', async () => {
  const queryClient = new QueryClient()
  const CustomHome = () =>{
    return(
      <MemoryRouter initialEntries={['/']}>
        <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<Product />} />
            </Routes>
        </QueryClientProvider>
      </MemoryRouter>
    )
  }
  render(<CustomHome />)
  await waitForElementToBeRemoved(screen.queryByText(/Loading.../i))

  fireEvent.click(screen.getByRole('img', { name: 'Fake Phone' }))
  await waitForElementToBeRemoved(screen.queryByText(/Loading.../i))

  expect(screen.getAllByRole('img', { name: 'Fake Phone' }).length).toBe(5)
})