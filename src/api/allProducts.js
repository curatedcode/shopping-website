import axios from "axios";

async function getAllProducts(){
  const res = await axios
    .get('https://dummyjson.com/products');
  return res.data;
}

export default getAllProducts