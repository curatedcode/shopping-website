import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Product from "../pages/Product";

describe('order quantity input',()=>{

  it('should be 1 on initial page load',async()=>{
    const queryClient = new QueryClient()
    const CustomProduct = () =>{
      return(
        <MemoryRouter initialEntries={['/products/1']}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/products/:id" element={<Product />} />
            </Routes>
          </QueryClientProvider>
         </MemoryRouter>
      )
    }
    render(<CustomProduct />)
    await waitForElementToBeRemoved(screen.queryByText(/Loading.../i))
    expect(screen.getByTestId('quantity').value).toBe('1')
  })

  it('should increase and decrease the order quantity',async()=>{
    const queryClient = new QueryClient()
    const CustomProduct = () =>{
      return(
        <MemoryRouter initialEntries={['/products/1']}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/products/:id" element={<Product />} />
            </Routes>
          </QueryClientProvider>
         </MemoryRouter>
      )
    }
    render(<CustomProduct />)
    await waitForElementToBeRemoved(screen.queryByText(/Loading.../i))
    const input = screen.getByTestId('quantity')

    fireEvent.click(screen.getByRole('button', { name: '+'}))
    expect(input.value).toBe('2')

    fireEvent.click(screen.getByRole('button', { name: '-'}))
    expect(input.value).toBe('1')
  })

  it('should let user input their quantity amount',async()=>{
    const queryClient = new QueryClient()
    const CustomProduct = () =>{
      return(
        <MemoryRouter initialEntries={['/products/1']}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/products/:id" element={<Product />} />
            </Routes>
          </QueryClientProvider>
         </MemoryRouter>
      )
    }
    render(<CustomProduct />)
    await waitForElementToBeRemoved(screen.queryByText(/Loading.../i))
    const input = screen.getByTestId('quantity')

    fireEvent.change(input, {target: {value: '5'}})
    expect(input.value).toBe('5')
  })

  it('should not allow anything besides numbers to be inputted',async()=>{
    const queryClient = new QueryClient()
    const CustomProduct = () =>{
      return(
        <MemoryRouter initialEntries={['/products/1']}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/products/:id" element={<Product />} />
            </Routes>
          </QueryClientProvider>
         </MemoryRouter>
      )
    }
    render(<CustomProduct />)
    await waitForElementToBeRemoved(screen.queryByText(/Loading.../i))
    const input = screen.getByTestId('quantity')

    fireEvent.click(screen.getByRole('button', { name: '+'})) 
    expect(input.value).toBe('2')

    fireEvent.input(input, 'TextyText')
    expect(input.value).toBe('2')
  })
})