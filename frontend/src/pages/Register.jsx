import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

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


const Register = () => {
  return (
    <Container>
      <Wrapper>
        <Title>ĐĂNG KÝ</Title>
        <Form>
          <Input placeholder="Tên" />
          <Input placeholder="Tên Đăng Nhập" />
          <Input placeholder="Mật Khẩu" />
          <Input placeholder="Xác nhận mật khẩu" />
          <Input placeholder="Số điện thoại" />
          <Input placeholder="Địa Chỉ" />
          <Agreement>
          Tôi đồng ý thực hiện mọi giao dịch mua bán theo điều kiện sử dụng và chính sách của CiTiShop
          </Agreement>
          <Button>ĐĂNG KÝ</Button>
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