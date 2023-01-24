import axios from "axios";

function getAllProducts(){
  return axios
    .get('https://dummyjson.com/products')
    .then(res => res.data)
}

export default getAllProducts