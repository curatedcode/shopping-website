import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from "react-router-dom"
import Checkout from "../pages/Checkout"
import Home from "../pages/Home"
import NavBar from "../components/NavBar"


it('should load address section as first step',async ()=>{
  localStorage.clear()
  const queryClient = new QueryClient()
  const CustomProduct = () =>{
    return(
      <MemoryRouter initialEntries={['/checkout']}>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </QueryClientProvider>
       </MemoryRouter>
    )
  }
  render(<CustomProduct />)

  await waitForElementToBeRemoved(screen.queryByText(/loading.../i))
  await screen.findByText(/add your shipping address/i)

  expect(screen.getByText(/add your shipping address/i)).toBeVisible()
})


describe('address section',()=>{
  
  it('should render shipping address form', async()=>{
    localStorage.clear()
    const queryClient = new QueryClient()
    const CustomProduct = () =>{
      return(
        <MemoryRouter initialEntries={['/checkout']}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </QueryClientProvider>
         </MemoryRouter>
      )
    }
    render(<CustomProduct />)
  
    await waitForElementToBeRemoved(screen.queryByText(/loading.../i))
    await screen.findByText(/add your shipping address/i)

    expect(screen.getByLabelText('form')).toBeVisible()

    expect(screen.getByRole('textbox', { name: /country/i })).toBeVisible()
    expect(screen.getByRole('textbox', { name: 'Full Name (First and last name)' })).toBeVisible()
    expect(screen.getByRole('textbox', { name: /phone number/i })).toBeVisible()

    screen.getAllByRole('textbox', { name: /address/i }).forEach(el => expect(el).toBeVisible())
    expect(screen.getAllByRole('textbox', { name: /address/i }).length).toBe(2)

    expect(screen.getByRole('textbox', { name: /city/i })).toBeVisible()
    expect(screen.getByRole('textbox', { name: /state/i })).toBeVisible()
    expect(screen.getByRole('spinbutton', { name: /zip code/i })).toBeVisible()
    
    expect(screen.getByRole('button', { name: /use this address/i })).toBeVisible()
  })
  
  it('should store form data in localStorage on submit, then go to next section', async()=>{
    localStorage.clear()
    const user = userEvent.setup()
    const queryClient = new QueryClient()
    const CustomProduct = () =>{
      return(
        <MemoryRouter initialEntries={['/checkout']}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </QueryClientProvider>
         </MemoryRouter>
      )
    }
    render(<CustomProduct />)
  
    await waitForElementToBeRemoved(screen.queryByText(/loading.../i))
    await screen.findByText(/add your shipping address/i)

    const inputData = {
      country: 'United States',
      fullName: 'John Doe',
      phoneNumber: '800-222-3232',
      address: '108 RealRoad Rd.',
      addressOptional: 'Apt. 108',
      city: 'Nowhere',
      state: 'Wyoming',
      zipCode: '28543'
    }

    await user.type(screen.getByRole('textbox', { name: /country/i }), inputData.country)

    await user.type(screen.getByRole('textbox', { name: 'Full Name (First and last name)' }), inputData.fullName)

    await user.type(screen.getByRole('textbox', { name: /phone number/i }), inputData.phoneNumber)

    await user.type(screen.getAllByRole('textbox', { name: /address/i })[0], inputData.address)

    await user.type(screen.getAllByRole('textbox', { name: /address/i })[1], inputData.addressOptional)

    await user.type(screen.getByRole('textbox', { name: /city/i }), inputData.city)

    await user.type(screen.getByRole('textbox', { name: /state/i }), inputData.state)

    await user.type(screen.getByRole('spinbutton', { name: /zip code/i }), inputData.zipCode)

    await user.click(screen.getByRole('button', { name: /use this address/i }))

    expect(JSON.parse(localStorage.getItem('shippingAddress'))).toStrictEqual(inputData)

    expect( await screen.findByText(/add your card/i)).toBeVisible()
  })

  //unable to implement validation as user-event has not implemented ValidityState yet
})


describe('card section',()=>{
  
  it('should render card details form', async()=>{
    localStorage.clear()
    const user = userEvent.setup()
    const queryClient = new QueryClient()
    const CustomProduct = () =>{
      return(
        <MemoryRouter initialEntries={['/checkout']}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </QueryClientProvider>
         </MemoryRouter>
      )
    }
    render(<CustomProduct />)
  
    await waitForElementToBeRemoved(screen.queryByText(/loading.../i))
    await screen.findByText(/add your shipping address/i)

    await user.click(screen.getByRole('button', { name: /use this address/i }))

    await waitForElementToBeRemoved(screen.queryByText(/add your shipping address/i))


    expect(screen.getByLabelText('form')).toBeVisible()

    expect(screen.getByRole('textbox', { name: /card number/i })).toBeVisible()

    expect(screen.getByRole('textbox', { name: /expiration date/i })).toBeVisible()

    expect(screen.getByRole('checkbox', { name: /billing address is the same as delivery address/i })).toBeVisible()

    expect(screen.getByRole('checkbox', { name: /billing address is the same as delivery address/i })).not.toBeChecked()

    screen.getAllByRole('textbox', { name: /address/i }).forEach(el => expect(el).toBeVisible())

    expect(screen.getAllByRole('textbox', { name: /address/i }).length).toBe(2)

    expect(screen.getByRole('textbox', { name: /city/i })).toBeVisible()
    expect(screen.getByRole('textbox', { name: /state/i })).toBeVisible()
    expect(screen.getByRole('spinbutton', { name: /zip code/i })).toBeVisible()
    
    expect(screen.getByRole('button', { name: /use this address/i })).toBeVisible()
  })

  it('should store form data in localStorage on submit, then go to next section', async()=>{
    localStorage.clear()
    const user = userEvent.setup()
    const queryClient = new QueryClient()
    const CustomProduct = () =>{
      return(
        <MemoryRouter initialEntries={['/checkout']}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </QueryClientProvider>
         </MemoryRouter>
      )
    }
    render(<CustomProduct />)
  
    await waitForElementToBeRemoved(screen.queryByText(/loading.../i))
    await screen.findByText(/add your shipping address/i)

    await user.click(screen.getByRole('button', { name: /use this address/i }))

    await waitForElementToBeRemoved(screen.queryByText(/add your shipping address/i))
    
    const billingInputData = {
      address: '108 RealRoad Rd.',
      addressOptional: 'Apt. 108',
      city: 'Nowhere',
      state: 'Wyoming',
      zipCode: '28543'
    }

    const cardInputData = {
      cardNumber: '234433334343',
      billingAddress: billingInputData,
      expirationDate: '3/23' 
    }

    await user.type(screen.getByRole('textbox', { name: /card number/i }), cardInputData.cardNumber)

    await user.type(screen.getByRole('textbox', { name: /expiration date/i }), cardInputData.expirationDate)

    await user.type(screen.getAllByRole('textbox', { name: /address/i })[0], billingInputData.address)

    await user.type(screen.getAllByRole('textbox', { name: /address/i })[1], billingInputData.addressOptional)

    await user.type(screen.getByRole('textbox', { name: /city/i }), billingInputData.city)

    await user.type(screen.getByRole('textbox', { name: /state/i }), billingInputData.state)

    await user.type(screen.getByRole('spinbutton', { name: /zip code/i }), billingInputData.zipCode)

    await user.click(screen.getByRole('button', { name: /use this address/i }))

    await user.click(screen.getByRole('button', { name: /submit my order/i }))

    expect(JSON.parse(localStorage.getItem('cardData'))).toStrictEqual(cardInputData)

    expect( await screen.findByText(/order placed/i)).toBeVisible()
  })

  it('should store billingAddress as null when billing and shipping are selected as the same', async()=>{
    localStorage.clear()
    const user = userEvent.setup()
    const queryClient = new QueryClient()
    const CustomProduct = () =>{
      return(
        <MemoryRouter initialEntries={['/checkout']}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </QueryClientProvider>
         </MemoryRouter>
      )
    }
    render(<CustomProduct />)
  
    await waitForElementToBeRemoved(screen.queryByText(/loading.../i))
    await screen.findByText(/add your shipping address/i)

    await user.click(screen.getByRole('button', { name: /use this address/i }))

    await waitForElementToBeRemoved(screen.queryByText(/add your shipping address/i))

    const cardInputData = {
      cardNumber: '234433334343',
      billingAddress: null,
      expirationDate: '3/23' 
    }

    const billingSameAsAddressBtn = screen.getByRole('checkbox', { name: /billing address is the same as delivery address/i })
    await user.click(billingSameAsAddressBtn)
    expect(billingSameAsAddressBtn).toBeChecked()

    await user.type(screen.getByRole('textbox', { name: /card number/i }), cardInputData.cardNumber)

    await user.type(screen.getByRole('textbox', { name: /expiration date/i }), cardInputData.expirationDate)

    await user.click(screen.getByRole('button', { name: /use this address/i }))

    await user.click(screen.getByRole('button', { name: /submit my order/i }))

    expect(JSON.parse(localStorage.getItem('cardData'))).toStrictEqual(cardInputData)

    expect( await screen.findByText(/order placed/i)).toBeVisible()
  })
  //unable to implement validation as user-event has not implemented ValidityState yet
})


describe('submitted section',()=>{

  it('should render order summary section', async()=>{
    localStorage.clear()
    const user = userEvent.setup()
    const queryClient = new QueryClient()
    const CustomProduct = () =>{
      return(
        <MemoryRouter initialEntries={['/checkout']}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </QueryClientProvider>
         </MemoryRouter>
      )
    }
    render(<CustomProduct />)
  
    await waitForElementToBeRemoved(screen.queryByText(/loading.../i))
    await screen.findByText(/add your shipping address/i)

    await user.click(screen.getByRole('button', { name: /use this address/i }))

    await waitForElementToBeRemoved(screen.queryByText(/add your shipping address/i))

    await user.click(screen.getByRole('button', { name: /submit my order/i }))

    const orderData = {
      number: 3452634-324523-21321111-324,
      submitted: 'Tuesday, January 4',
      orderTotal: 354
    }
    localStorage.setItem('orderData',JSON.stringify(orderData))
    
    const shippingAddress = {
      country: 'United States',
      fullName: 'John Doe',
      phoneNumber: '800-222-3232',
      address: '108 RealRoad Rd.',
      addressOptional: 'Apt. 108',
      city: 'Nowhere',
      state: 'Wyoming',
      zipCode: '28543'
    }
    localStorage.setItem('shippingAddress',JSON.stringify(shippingAddress))

    expect( await screen.findByText(/order placed/i)).toBeVisible()

    expect(screen.getByText(orderData.submitted)).toBeVisible()
    expect(screen.getByText(orderData.orderTotal)).toBeVisible()
    expect(screen.getByText(orderData.number)).toBeVisible()
  })

  it('should clear all data on leaving page', async()=>{
    localStorage.clear()
    const user = userEvent.setup()
    const queryClient = new QueryClient()
    const CustomProduct = () =>{
      return(
        <MemoryRouter initialEntries={['/checkout']}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route element={<NavBar />}>
                <Route path="/" element={<Home />} />
                <Route path="/checkout" element={<Checkout />} />
              </Route>
            </Routes>
          </QueryClientProvider>
         </MemoryRouter>
      )
    }
    render(<CustomProduct />)
  
    await waitForElementToBeRemoved(screen.queryByText(/loading.../i))
    await screen.findByText(/add your shipping address/i)

    await user.click(screen.getByRole('button', { name: /use this address/i }))

    await waitForElementToBeRemoved(screen.queryByText(/add your shipping address/i))

    await user.click(screen.getByRole('button', { name: /submit my order/i }))

    const orderData = {
      number: 3452634-324523-21321111-324,
      submitted: 'Tuesday, January 4',
      orderTotal: 354
    }
    localStorage.setItem('orderData',JSON.stringify(orderData))
    
    const shippingAddress = {
      country: 'United States',
      fullName: 'John Doe',
      phoneNumber: '800-222-3232',
      address: '108 RealRoad Rd.',
      addressOptional: 'Apt. 108',
      city: 'Nowhere',
      state: 'Wyoming',
      zipCode: '28543'
    }
    localStorage.setItem('shippingAddress',JSON.stringify(shippingAddress))

    await user.click(screen.getByLabelText(/home/i))
    await waitForElementToBeRemoved(screen.queryByText(/loading.../i))

    expect(screen.getByText(/trending products/i)).toBeVisible()
  })
})