import axios from "axios";

async function getProduct(id){
  const res = await axios
    .get(`https://dummyjson.com/products/${id}`);
  return res.data;
}

export default getProduct