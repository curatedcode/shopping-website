import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Product from "../pages/Product";

describe('product component',()=>{
  
  it('should render all data properly',async()=>{
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

    const daysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
    const date = new Date()
    const day = daysOfWeek[date.getDay()]
    const month = months[date.getMonth()]
    const deliveryDate = `${day}, ${month} ${date.getDate()}`

    expect(screen.getAllByRole('img', { name: 'Fake Phone' }).length).toBe(5)
    expect(screen.getByText(/in stock/i)).toBeVisible()
    expect(screen.getByText(deliveryDate)).toBeVisible()
    expect(screen.getByTestId(/quantity/i).value).toEqual('1')
    expect(screen.getAllByText(/Fake Phone/i).length).toBe(2)
    expect(screen.getByText(/Faker/i)).toBeVisible()
    expect(screen.getByText(/A phone that has never been made before!/i)).toBeVisible()
  })

  it('should go to next or previous image in slide', async()=>{
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

    const allSlideImages = screen.getAllByAltText(/fake phone/i)
    expect(allSlideImages[0]).toBeVisible()
    
    setTimeout(()=>fireEvent.click(screen.getByLabelText('slide-forward')),100)
    expect(allSlideImages[1]).toBeVisible()

    setTimeout(()=>fireEvent.click(screen.getByLabelText('slide-previous')),100)
    expect(allSlideImages[0]).toBeVisible()

    setTimeout(()=>fireEvent.click(screen.getByLabelText('slide-previous')),100)
    expect(allSlideImages[2]).toBeVisible()
  })

  it('should add item to cart on clicking add to cart button',async()=>{
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

    fireEvent.click(screen.getByRole('button', { name: /add to cart/i}))

    const fakeItemData = [
      {"id":1,
      "title":"Fake Phone",
      "description":"A phone that has never been made before!",
      "price":189,
      "discountPercentage":12.96,
      "rating":4.69,
      "stock":94,
      "brand":"Faker",
      "category":"smartphones",
      "thumbnail":"https://i.dummyjson.com/data/products/1/thumbnail.jpg",
      "images":["https://i.dummyjson.com/data/products/1/1.jpg","https://i.dummyjson.com/data/products/1/2.jpg","https://i.dummyjson.com/data/products/1/3.jpg","https://i.dummyjson.com/data/products/1/4.jpg","https://i.dummyjson.com/data/products/1/thumbnail.jpg"],"quantity":1}
    ]
    expect(JSON.parse(localStorage.getItem('cartItems'))).toStrictEqual(fakeItemData)
  })
})

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