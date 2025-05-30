import { useEffect } from "react";
import axios from "../utils/axios"

const Home = () => {
  const getproduct = async () => {
    try {
      const { data } = await axios.get("/products");
      console.log(data);

      // const strdata = await fetch("https://fakestoreapi.com/products/");
      // const jsondata = await strdata.json();
      // console.log(jsondata);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getproduct();
  })

  return (
    <div>
      <h1>Home</h1>
      <button onClick={getproduct}>Get Product</button>
    </div>
  )
}

export default Home