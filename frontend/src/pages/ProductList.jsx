import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation, useParams } from "react-router";
import { useEffect, useState } from "react";

import LoaiSpDataService from "../services/loaiSp";
import SanphamDataService from "../services/sanpham";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = props => {
  const location = useLocation();
  const { search } = useParams();
  // console.log(search);

  // const loaiSP_id = location.pathname.split("/")[2]; // props.state.categoryID;
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const [loaiSp, setLoaiSp] = useState([]);
  const [productsList, setProductsList] = useState([]);
  // console.log("pages/ProductList - loaiSP_id", loaiSP_id);

  const handleFilters = (e) => {
    console.log("pages/ProductList - handleFilters", e.target.value)
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
    if (value !== "Tất cả sản phẩm") {
      LoaiSpDataService.get(value)
        .then(res => {
          // console.lof(res.data);
          setProductsList(res.data.sanphamList);
        })
        .catch(e => {
          console.log(e);
        })
    }
    else {
      SanphamDataService.getAll()
        .then(res => {
          setProductsList(res.data.sanpham);
        })
        .catch(e => {
          console.log(e);
        })
    }
  };

  useEffect(() => {
    retrieveLoaiSp();
    if (search) {
      SanphamDataService.find(search)
        .then(res => {
          setProductsList(res.data.sanpham);
        })
        .catch(e => {
          console.log(e);
        })
    } else {
      SanphamDataService.getAll()
        .then(res => {
          setProductsList(res.data.sanpham);
        })
        .catch(e => {
          console.log(e);
        })
    }
  }, [search])

  const retrieveLoaiSp = () => {
    LoaiSpDataService.getAll()
      .then(res => {
        // console.log(res.data);
        setLoaiSp(res.data.loaiSp);
      })
      .catch(e => {
        console.log(e);
      })
  }

  return (
    <Container>
      <Announcement />
      {
        search
        ? <><Title>Tìm kiếm theo từ khoá tên sản phẩm: "{search}"</Title>
        </>
        : <><Title>Danh sách sản phẩm</Title>
        <FilterContainer>
          <Filter>
            <FilterText>Bộ lọc</FilterText>
  
            <Select name="phanLoai" onChange={handleFilters}>
              <Option>Tất cả sản phẩm</Option>
              {loaiSp.map(item => <Option key={item._id} value={item._id}>{item.tenloaiSP}</Option>)}
              {/* <Option disabled>Phân loại</Option>
              <Option>Sữa rửa mặt</Option>
              <Option>Tẩy trang</Option>
              <Option>Kem chống nắng</Option>
              <Option>Serum</Option>
              <Option>Son</Option>
              <Option>Sữa dưỡng thể</Option> */}
            </Select>
  
            {/* <Select name="size" onChange={handleFilters}>
              <Option disabled>Size</Option>
              <Option>40ml</Option>
              <Option>500ml</Option>
            </Select> */}
  
          </Filter>
          {/* <Filter>
            <FilterText>Sắp xếp</FilterText>
            <Select onChange={(e) => setSort(e.target.value)}>
              <Option value="newest">Mới nhất</Option>
              <Option value="asc">Giá tăng</Option>
              <Option value="desc">Giá giảm</Option>
            </Select>
          </Filter> */}
        </FilterContainer></>
      }
      
      <Products productsList={productsList} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;