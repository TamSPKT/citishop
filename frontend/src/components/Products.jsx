import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
// import axios from "axios";
import SanphamDataService from "../services/sanpham";
import LoaiSpDataService from "../services/loaiSp";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ productsList, filters, sort }) => {
  // const [products, setProducts] = useState([]);
  // const [filteredProducts, setFilteredProducts] = useState([]);

  const [sanphamList, setSanphamList] = useState([]);

  useEffect(() => {
    retrieveSanphamList();
  }, []);

  useEffect(() => {
    retrieveSanphamList();
  }, [productsList]);

  const retrieveSanphamList = () => {
    if (!productsList) { // Just get from 'sanpham' in DB
      SanphamDataService.getAll()
        .then(res => {
          // console.log("components/Products", res.data);
          setSanphamList(res.data.sanpham);
        })
        .catch(e => {
          console.log(e);
        })
    } else { // productsList by LoaiSP
      setSanphamList(productsList);
      // LoaiSpDataService.get(loaiSP_id)
      //   .then(res => {
      //     console.log("components/Products", res.data);
      //     setSanphamList(res.data.sanphamList);
      //   })
      //   .catch(e => {
      //     console.log(e);
      //   })
    }
  };

  const refreshList = () => {
    retrieveSanphamList();
  };

  // useEffect(() => {
  //   const getProducts = async () => {
  //     try {
  //       const res = await axios.get(
  //         cat
  //           ? `http://localhost:5000/api/products?category=${cat}` //3 loại cố đinh
  //           : "http://localhost:5000/api/products"
  //       );
  //       setProducts(res.data);
  //     } catch (err) {}
  //   };
  //   getProducts();
  // }, [cat]);

  // useEffect(() => {
  //   cat &&
  //     setFilteredProducts(
  //       products.filter((item) =>
  //         Object.entries(filters).every(([key, value]) =>
  //           item[key].includes(value)
  //         )
  //       )
  //     );
  // }, [products, cat, filters]);

  // useEffect(() => {
  //   if (sort === "newest") {
  //     setFilteredProducts((prev) =>
  //       [...prev].sort((a, b) => a.createdAt - b.createdAt)
  //     );
  //   } else if (sort === "asc") {
  //     setFilteredProducts((prev) =>
  //       [...prev].sort((a, b) => a.price - b.price)
  //     );
  //   } else {
  //     setFilteredProducts((prev) =>
  //       [...prev].sort((a, b) => b.price - a.price)
  //     );
  //   }
  // }, [sort]);

  return (
    <Container>
      {
        productsList // List of 'sanpham' by 'loaiSP'
          ? sanphamList.map((item) =>
            <Product item={item} id={item._id} key={item._id} />)
          : sanphamList.slice(0, 8).map((item) =>
            <Product item={item} id={item._id} key={item._id} />)
      }
      {/* {cat
        ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
        : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item.id} />)} */}
    </Container>
  );
};

export default Products;