import {
  FavoriteBorderOutlined,
  RemoveRedEyeOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
// import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

import SanphamDataService from "../services/sanpham";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info}{
    opacity: 1;
  }
  ${mobile({ height: '200px', width: '100px' })}
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  ${mobile({ display: 'none' })}
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;
const Price = styled.div`
font-weight: 200;
font-size: 12px;
`;
const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ item }) => {
  const location = useLocation();
  const id = location.pathname.split("/")[1] === 'product' ? location.pathname.split("/")[2] : undefined;
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  // console.log("components/Product", location);

  useEffect(() => {
    if (id) {
      SanphamDataService.get(id)
        .then(res => {
          console.log("components/Product", res.data);
          setProduct(res.data);
        })
        .catch(e => {
          console.log(e);
        })
    }
    // const getProduct = async () => {
    //   try {
    //     const res = await publicRequest.get("/products/find/" + id);
    //     setProduct(res.data);
    //   } catch {}
    // };
    // getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    dispatch(
      // addProduct({ ...product, quantity, color, size })
      addProduct({ ...product, quantity: 1, size: product.loai })
    );
  };
  return (
    <Container>
      <Circle />

      <Image src={item.hinhanh} />
      <Info>
        {/* <Icon onClick={handleClick}>
          <ShoppingCartOutlined />
        </Icon> */}

        <Icon>
          <Link to={`/product/${item._id}`}>
            <RemoveRedEyeOutlined />
          </Link>
        </Icon>

      </Info>
    </Container>
  );
};

export default Product;