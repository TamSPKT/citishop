import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
// import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";

import SanphamDataService from "../services/sanpham";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
  white-space: pre-wrap;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[1] === 'product' ? location.pathname.split("/")[2] : undefined;
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  const history = useHistory();
  const user = useSelector((state) => state.user.currentUser);
  // console.log("pages/Product", location);

  useEffect(() => {
    if (id) {
      SanphamDataService.get(id)
        .then(res => {
          // console.log("pages/Product", res.data);
          setProduct(res.data);
          // setSize(product.loai);
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
      if (10 > quantity && product.soluong > quantity) {
        setQuantity(quantity + 1);
      }
    }
  };

  const handleClick = () => {
    if (!user) {
      history.push("/login");
    } else {
      dispatch(
        addProduct({ ...product, quantity, size })
      );
      history.push("/cart");
    }
  };
  return (
    <Container>
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.hinhanh} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.tenSP}</Title>
          <Desc>{product.mota}</Desc>
          <b>Số lượng: {product.soluong}</b><br /><br />
          <b>Giảm: {product['%giam']}%</b><br /><br />
          <Price>Giá: {product.gia} đ</Price><br />
          <FilterContainer>
            <Filter>
              <FilterTitle>Loại size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {
                  // product.size?.map((s) => (
                  Array(product.loai).map((s) => (
                    <FilterSizeOption key={s}>{s}</FilterSizeOption>
                  ))
                }
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={handleClick}>Thêm vào giỏ</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;