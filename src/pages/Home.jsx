import ItemCard from "../components/ItemCard"
import { v4 as uuidv4 } from 'uuid'
import { useQuery } from "@tanstack/react-query"
import getAllProducts from "../api/allProducts"

function Home(){
  const { status, error, data } = useQuery({
    queryKey: ['productData'],
    queryFn: getAllProducts,
  })
  if(status === 'loading') return <h1>Loading...</h1>
  if(status === 'error') return <h1>{JSON.stringify(error)}</h1>
  return(
    <div className="">
      {data.products.map(item => <ItemCard data={item} key={uuidv4()}/>)}
    </div>
  )
}

export default Home