import { Add, Remove } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import { addProduct, removeProduct } from "../redux/cartRedux";

// import PaymentDataService from "../services/payment";
import HoadonDataService from "../services/hoadon";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  console.log("pages/Cart - cart", cart);
  // console.log("pages/Cart - cart.products.length", cart.products.length);
  console.log("pages/Cart - user", user);
  // console.log("pages/Cart - process.env", process.env);

  const handleAddQuantity = (id) => {
    // console.log(id);
    let product = cart.products.find((elem) => {
      return elem._id === id
    })
    dispatch(
      addProduct({ ...product, quantity: 1 })
    );
    window.location.reload();
  }

  const handleRemoveQuantity = (id) => {
    // console.log(id);
    let product = cart.products.find((elem) => {
      return elem._id === id
    })
    dispatch(
      removeProduct({ ...product, quantity: 1 })
    );
    window.location.reload();
  }

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        console.log("pages/Cart - stripeToken", stripeToken)
        const products = cart.products.map(item => {
          return {
            sanphamID: item._id,
            // tenSP: item.tenSP,
            // gia: item.gia,
            soluongMua: item.quantity,
          }
        })
        // const res = await userRequest.post("/checkout/payment", {
        //   tokenId: stripeToken.id,
        //   amount: 500,
        // });
        // const res = await PaymentDataService.createCharges({
        //   stripeTokenId: stripeToken.id,
        //   amount: cart.total
        // })
        const hoadonDoc = {
          username: user.username,
          nguoiNhan: stripeToken.card.name,
          sdt: user.sdt,
          diachi: user.diachi,
          giamHD: 0,
          kieuThanhToan: "Ship COD",
          sanphamList: products,
          stripeToken: stripeToken,
        }
        // console.log(hoadonDoc);
        const res = await HoadonDataService.createHoadon(hoadonDoc)
        history.push("/success", {
          // stripeData: res.data,
          // stripeData: stripeToken,
          hoadonData: res.data,
          // products: products,
          cart: cart,
        });
      } catch (e) {
        console.log("makeRequest", e);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, history]);


  return (
    <Container>
      <Announcement />
      <Wrapper>
        <Title>Giỏ hàng của bạn</Title>
        <Top>
          <Link to='/'>Tiếp tục mua sắm</Link>
          <TopButton type="filled">Thanh toán</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product, index) => (
              <Product key={product._id}>
                <ProductDetail>
                  <Image src={product.hinhanh} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.tenSP}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductSize>
                      <b>Size:</b> {product.loai}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add onClick={() => handleAddQuantity(product._id)} />
                    <ProductAmount>Số lượng: {product.quantity}</ProductAmount>
                    <Remove onClick={() => handleRemoveQuantity(product._id)} />
                  </ProductAmountContainer>
                  <ProductPrice>
                    {product.gia * product.quantity} vnd
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>TỔNG ĐƠN</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Tạm tính</SummaryItemText>
              <SummaryItemPrice> {cart.total} vnd</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Phí vận chuyển</SummaryItemText>
              <SummaryItemPrice>30000 vnd</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Giảm phí vận chuyển</SummaryItemText>
              <SummaryItemPrice>0</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Tổng tiền</SummaryItemText>
              <SummaryItemPrice>{cart.total + 30000} vnd</SummaryItemPrice>
              {/* <SummaryItemPrice>{cart.total} vnd</SummaryItemPrice> */}
            </SummaryItem>
            <StripeCheckout
              name="CiTi Shop"
              image="https://avatars.githubusercontent.com/u/1486366?v=4"
              billingAddress
              shippingAddress
              email={user.email}
              // description={`Tổng tiền ${cart.total} vnd`}
              description={`Tổng tiền ${cart.total + 30000} vnd`}
              // amount={cart.total}
              amount={cart.total + 30000}
              token={onToken}
              currency="VND"
              stripeKey={KEY}
            >
              <Button disabled={cart.products.length === 0}>Thanh toán ngay</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;