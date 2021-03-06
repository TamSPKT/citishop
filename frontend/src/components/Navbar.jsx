import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";

import logo from "../assets/images/logo.png";
const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  margin-left: 20px;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 0px;
  padding: 5px;
`;

const Input = styled.input`
  flex: 2;
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
flex: 2;
align-items: center;
`;

const Logo = styled.img`
width: 80px;
height: 45px;
  ${mobile({
  width: '50px',
  height: '30px'
})}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  margin-right: 15px;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const history = useHistory();
  const quantity = useSelector(state => state.cart.quantity);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const handleLogout = (e) => {
    // e.preventDefault();
    // console.log(user.currentUser);
    localStorage.removeItem('persist:root');
    // console.log(user.currentUser);
    history.push("/")
    window.location.reload()
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to="/">
            <Logo src={logo} alt="" />
          </Link>

        </Left>
        <Center>
          <SearchContainer>
            <Input placeholder="T??m ki???m..." onChange={(e) => setSearch(e.target.value)} />
            <Link to={`/result/${search}`}>
              <Search style={{ color: "gray", fontSize: 16 }} />
            </Link>
          </SearchContainer>
        </Center>
        <Right>
          {user.currentUser
            ? <>
              <strong>{user.currentUser.username}</strong>
              <MenuItem onClick={handleLogout}>????ng xu???t</MenuItem>
            </>
            : <>
              <Link to="/register">
                <MenuItem>????ng k??</MenuItem>
              </Link>
              <Link to="/login">
                <MenuItem>????ng nh???p</MenuItem>
              </Link></>
          }

          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
          {/* <Language>EN</Language>*/}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;