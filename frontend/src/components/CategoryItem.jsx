import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  flex: 1;
  margin: 1px;
  height: 25vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "10vh" })}

`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
    color:pink;
    margin-bottom: 5px;
    ${mobile({ fontSize:'15px'})}
`;

const Button = styled.button`
    border:none;
    padding: 5px;
    background-color: white;
    color:gray;
    cursor: pointer;
    font-weight: 600;
    ${mobile({ display: 'none'})}
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      {/* <Link to={`/products/${item.loaiSP_id}`}> */}
      <Link to={`/products/search`}>
        <Image src={item.img} />
      {/* <Info>
        <Title>{item.title}</Title>
        <Button>Xem tất cả</Button>
      </Info> */}
      </Link>
    </Container>
  );
};

export default CategoryItem;