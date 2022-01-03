import { useEffect, useState } from "react";
import styled from "styled-components";
import { login } from "../redux/apis/apiLogin";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { useHistory } from "react-router-dom";

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
  width: 25%;
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
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 100%;
  font-size: 16px;
  border: none;
  padding: 15px 20px;
  background-color: #d4838d;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { currentUser, isFetching, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (!error && !isFetching && currentUser) {
      history.push('/');
    }
  }, [currentUser])

  const handleClick = (e) => {
    e.preventDefault();
    // console.log(username, password);
    login(dispatch, { username, password });
    // console.log(currentUser, isFetching, error);
    if (!error && !isFetching && currentUser) {
      history.push('/');
    }
  };

  return (
    <Container>


      <Wrapper>
        <Title>ĐĂNG NHẬP</Title>
        <Form>
          <Input
            placeholder="Tên đăng nhập"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Mật khẩu"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick} disabled={isFetching}>
            ĐĂNG NHẬP
          </Button>
          {error && <Error>Lỗi đăng nhập</Error>}
          <Link>Quên mật khẩu?</Link>
          <Link>Đăng ký</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;