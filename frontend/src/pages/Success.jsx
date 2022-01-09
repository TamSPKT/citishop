import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router";

// import { userRequest } from "../requestMethods";

import { clearCart } from "../redux/cartRedux";

const Success = () => {
  const history = useHistory()
  const dispatch = useDispatch();
  const location = useLocation();
  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  const data = location.state.stripeData;
  const hoadonData = location.state.hoadonData;
  const products = location.state.products;
  const cart = location.state.cart;
  // const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);
  // console.log("pages/Success - data", data);
  console.log("pages/Success - hoadonData", hoadonData);
  // console.log("pages/Success - products", products);
  // console.log("pages/Success - cart", cart);
  // console.log("pages/Success - currentUser", currentUser);

  useEffect(() => {
    if (hoadonData.response && hoadonData.response.hoadonResponse
      && hoadonData.response.hoadonResponse.insertedId) {
      dispatch(
        clearCart()
      );
      setOrderId(hoadonData.response.hoadonResponse.insertedId);
    } else if (hoadonData.response && hoadonData.response.error) {
      setError(hoadonData.response.error);
    }
  }, []);

  // useEffect(() => {
  //   const createOrder = async () => {
  //     try {
  //       const res = await userRequest.post("/orders", {
  //         userId: currentUser._id,
  //         products: cart.products.map((item) => ({
  //           productId: item._id,
  //           quantity: item._quantity,
  //         })),
  //         amount: cart.total,
  //         address: data.billing_details.address,
  //       });
  //       setOrderId(res.data._id);
  //     } catch {}
  //   };
  //   data && createOrder();
  // }, [cart, data, currentUser]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Đơn hàng được tạo thành công, mã đơn hàng ${orderId}`
        : error
          ? `Xảy ra lỗi khi xử lý đơn hàng`
          : `Đơn hàng đang được xử lý`
      }
      <a href="/" style={{ padding: 10, marginTop: 20 }}>Về trang chủ</a>
    </div>
  );
};

export default Success;