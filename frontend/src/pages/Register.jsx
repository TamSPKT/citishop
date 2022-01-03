import styled from "styled-components";
import { mobile } from "../responsive";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { register } from "../redux/apis/apiRegister";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://res.cloudinary.com/cam6776/image/upload/v1640226143/Cham_svv1yr.png")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: #d4838d;
  color: white;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Register = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRe, setPasswordRe] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  const { currentUser, isFetching, error } = useSelector((state) => state.user);

  const [passwordErrorStyle, setPasswordErrorStyle] = useState(undefined);

  useEffect(() => {
    if (password !== passwordRe) {
      setPasswordErrorStyle({ color: "red" });
    } else {
      setPasswordErrorStyle(undefined);
    }
  }, [password, passwordRe])

  useEffect(() => {
    if (!error && !isFetching && currentUser) {
      history.push('/');
    }
  }, [currentUser])

  const handleClick = (e) => {
    e.preventDefault();
    if (passwordErrorStyle) {
      return;
    }
    let userData = {
      username: username,
      password: password,
      email: email,
      sdt: phone,
      diachi: address,
      phanquyen: 1, // Active
    };
    // console.log(userData);
    register(dispatch, userData);
    // console.log(currentUser, isFetching, error);
    if (!error && !isFetching && currentUser) {
      history.push('/');
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>ĐĂNG KÝ</Title>
        <Form onSubmit={handleClick}>
          <Input
            placeholder="Tên Đăng Nhập"
            required
            onChange={(e) => setUsername(e.target.value)} />
          <Input
            placeholder="Email"
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)} />
          <Input
            placeholder="Mật Khẩu"
            required
            style={passwordErrorStyle}
            type="password"
            onChange={(e) => setPassword(e.target.value)} />
          <Input
            placeholder="Xác nhận mật khẩu"
            required
            style={passwordErrorStyle}
            type="password"
            onChange={(e) => setPasswordRe(e.target.value)} />
          <Input
            placeholder="Số điện thoại"
            required
            type="tel"
            pattern="^((09|03|07|08|05)+([0-9]{8})\b)$"
            onChange={(e) => setPhone(e.target.value)} />
          <Input
            placeholder="Địa chỉ"
            required
            type="text"
            onChange={(e) => setAddress(e.target.value)} />
          <Agreement>
            Tôi đồng ý thực hiện mọi giao dịch mua bán theo điều kiện sử dụng và chính sách của CiTiShop
          </Agreement>
          {error && <Error>Lỗi đăng ký</Error>}
          <Button type="submit" disabled={isFetching}>
            ĐĂNG KÝ
          </Button>
          <div>Bạn đã có tài khoản?</div>
          <Link to="/login">
            <div> Đăng nhập</div>
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;