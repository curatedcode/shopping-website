import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from "react-router-dom"
import Cart from "../pages/Cart"
import Checkout from "../pages/Checkout"


const cartItemsDataOneItem = [
  {
  "id":1,
  "title":"Fake Phone",
  "description":"A phone that has never been made before!",
  "price":189,
  "discountPercentage":12.96,
  "rating":4.69,
  "stock":94,
  "brand":"Faker",
  "category":"smartphones",
  "thumbnail":"https://i.dummyjson.com/data/products/1/thumbnail.jpg",
  "images":["https://i.dummyjson.com/data/products/1/1.jpg","https://i.dummyjson.com/data/products/1/2.jpg","https://i.dummyjson.com/data/products/1/3.jpg","https://i.dummyjson.com/data/products/1/4.jpg","https://i.dummyjson.com/data/products/1/thumbnail.jpg"],
  "quantity":1
  }
]

const cartItemsDataTwoItems = [
  {
  "id":1,
  "title":"Fake Phone",
  "description":"A phone that has never been made before!",
  "price":189,
  "discountPercentage":12.96,
  "rating":4.69,
  "stock":94,
  "brand":"Faker",
  "category":"smartphones",
  "thumbnail":"https://i.dummyjson.com/data/products/1/thumbnail.jpg",
  "images":["https://i.dummyjson.com/data/products/1/1.jpg","https://i.dummyjson.com/data/products/1/2.jpg","https://i.dummyjson.com/data/products/1/3.jpg","https://i.dummyjson.com/data/products/1/4.jpg","https://i.dummyjson.com/data/products/1/thumbnail.jpg"],
  "quantity":1
  },
  {
    "id":2,
    "title":"Fake Samsun",
    "description":"A phone that has been made before!",
    "price":129,
    "discountPercentage":1.66,
    "rating":4.31,
    "stock":82,
    "brand":"SanSung",
    "category":"smartphones",
    "thumbnail":"https://i.dummyjson.com/data/products/2/thumbnail.jpg",
    "images":["https://i.dummyjson.com/data/products/2/1.jpg","https://i.dummyjson.com/data/products/2/2.jpg","https://i.dummyjson.com/data/products/1/3.jpg","https://i.dummyjson.com/data/products/2/4.jpg","https://i.dummyjson.com/data/products/2/thumbnail.jpg"],
    "quantity":1
    }
]

it('should render cart data',()=>{
  localStorage.clear()
  localStorage.setItem('cartItems',JSON.stringify(cartItemsDataOneItem))
  const queryClient = new QueryClient()
  const CustomProduct = () =>{
    return(
      <MemoryRouter initialEntries={['/cart']}>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </QueryClientProvider>
       </MemoryRouter>
    )
  }
  render(<CustomProduct />)

  expect(screen.getByText(/subtotal/i)).toBeVisible()
  expect(screen.getByRole('button', { name: /checkout/i })).toBeVisible()
  expect(screen.getByText(cartItemsDataOneItem[0].title)).toBeVisible()
  expect(screen.getByText(/in stock./i)).toBeVisible()
  expect(screen.getByTitle('delete')).toBeInTheDocument()

  expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: '+' })).toBeVisible()
  expect(screen.getByText(cartItemsDataOneItem[0].quantity)).toBeVisible()
  expect(screen.getByRole('button', { name: /delete/i})).toBeVisible()

  const priceElements = screen.getAllByText(cartItemsDataOneItem[0].price)
  expect(priceElements.length).toBe(2)
  priceElements.forEach(el => expect(el.textContent).toBe('189'))
})

it('should show amount of items in cart on checkout button',()=>{
  localStorage.clear()
  localStorage.setItem('cartItems',JSON.stringify(cartItemsDataTwoItems))
  const queryClient = new QueryClient()
  const CustomProduct = () =>{
    return(
      <MemoryRouter initialEntries={['/cart']}>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </QueryClientProvider>
       </MemoryRouter>
    )
  }
  render(<CustomProduct />)

  expect(screen.getByRole('button', { name: 'proceed-to-checkout' }).textContent).toBe("Proceed to checkout (2 items)")
})

it('should allow you to delete item',async ()=>{
  localStorage.clear()
  localStorage.setItem('cartItems',JSON.stringify(cartItemsDataTwoItems))
  const queryClient = new QueryClient()
  const CustomProduct = () =>{
    return(
      <MemoryRouter initialEntries={['/cart']}>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </QueryClientProvider>
       </MemoryRouter>
    )
  }
  render(<CustomProduct />)

  expect(screen.getAllByRole('button', { name: /delete/i }).length).toBe(2)

  const user = userEvent.setup()
  await user.click(screen.getAllByRole('button', { name: /delete/i })[0])

  expect(screen.getAllByRole('button', { name: /delete/i }).length).toBe(1)

})

describe('navigate to checkout page from cart',()=>{

  it('should not show go to checkout button with no items in cart',()=>{
    localStorage.clear()
    const queryClient = new QueryClient()
    const CustomProduct = () =>{
      return(
        <MemoryRouter initialEntries={['/cart']}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </QueryClientProvider>
         </MemoryRouter>
      )
    }
    render(<CustomProduct />)

    expect(screen.getByText(/no items in your cart/i)).toBeVisible()

    expect(screen.queryByLabelText(/proceed-to-checkout/i)).not.toBeInTheDocument()
  })

  it('should go to checkout page if items are in cart',async()=>{
    localStorage.clear()
    localStorage.setItem('cartItems', JSON.stringify(cartItemsDataOneItem))
    const queryClient = new QueryClient()
    const CustomProduct = () =>{
      return(
        <MemoryRouter initialEntries={['/cart']}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </QueryClientProvider>
         </MemoryRouter>
      )
    }
    render(<CustomProduct />)

    const user = userEvent.setup()
    await user.click(screen.getByLabelText(/proceed-to-checkout/i))

    expect(screen.getByText(/checkout/i)).toBeVisible()
  })

})

//able to go to checkout
//able to increase and decrease item