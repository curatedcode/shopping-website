import ItemCard from "../components/ItemCard"
import { v4 as uuidv4 } from 'uuid'
import { useQuery } from "@tanstack/react-query"
import getAllProducts from "../api/allProducts"
import HeroMobile from "../img/HeroMobile"
import HeroDesktop from "../img/HeroDesktop"

function Home(){
  const { status, error, data } = useQuery({
    queryKey: ['productData'],
    queryFn: getAllProducts,
  })
  localStorage.removeItem('checkoutStage')
  if(status === 'loading') return <h1>Loading...</h1>
  if(status === 'error') return <h1>{JSON.stringify(error)}</h1>
  return(
    <div>
      <div>
        <div className="invisible w-0 md:visible md:w-auto"><HeroDesktop /></div>
        <div className="md:invisible md:w-0"><HeroMobile/></div>
      </div>
      <div className="text-white bg-red-700 text-center py-1 text-lg">Trending Products</div>
      <div className="grid justify-items-center my-6 gap-y-6">
        {data.products.map(item => <ItemCard data={item} key={uuidv4()}/>)}
      </div>
    </div>
  )
}

export default Home