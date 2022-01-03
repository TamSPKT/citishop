import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./newProduct.css";

import SanphamDataService from "../../services/sanpham";
import LoaiSpDataService from "../../services/loaiSp";

export default function NewProduct() {
  const history = useHistory();

  const [tenSP, setTenSP] = useState("");
  const [giam, setGiam] = useState(0);
  const [mota, setMota] = useState("");
  const [soluong, setSoluong] = useState("");
  const [hang, setHang] = useState("");
  const [loaiSP_id, setLoaiSP_id] = useState("");
  const [gia, setGia] = useState("");
  const [hinhanh, setHinhanh] = useState("");
  const [loai, setLoai] = useState("");

  const [error, setError] = useState(undefined);
  const [loaiSpIDErrorStyle, setLoaiSpIDErrorStyle] = useState(undefined);

  useEffect(() => {
    if (loaiSP_id) {
      LoaiSpDataService.getByIDWithSpPerPage(loaiSP_id)
        .then(res => {
          // console.log("LoaiSpDataService - status", res.status);
          setLoaiSpIDErrorStyle(undefined);
        })
        .catch((e) => {
          console.log(e);
          setLoaiSpIDErrorStyle({ color: "red" });
        })
    }
  }, [loaiSP_id])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loaiSpIDErrorStyle) {
      return;
    }
    let sanphamData = {
      tenSP, loai, hinhanh, mota, hang, loaiSP_id,
      gia: Number(gia), giam: Number(giam), soluong: Number(soluong),
    }
    // console.log(sanphamData);
    SanphamDataService.createSanpham(sanphamData)
      .then(res => {
        if (res.data.response && res.data.response.insertedId) {
          history.push('/products');
        } else if (res.data.response && res.data.response.error) {
          console.log(res.data.response.error);
          setError(res.data.response.error);
        }
        else {
          console.log(res.data.response)
        }
      })
      .catch((e) => {
        console.log(e);
      })
  }

  return (
    <div className="newProduct">
      <h1 className="newProductTitle">Thêm sản phẩm mới</h1>
      {error && <p style={{ color: "red" }}>Xãy ra lỗi.</p>}
      <form className="newProductForm" onSubmit={handleSubmit}>
        <div className="newProductItem">
          <label>Tên sản phẩm</label>
          <input type="text"
            required
            value={tenSP}
            onChange={(e) => setTenSP(e.target.value)}
            placeholder="VD: 123" />
        </div>
        <div className="newProductItem">
          <label>Mã Loại sản phẩm</label>
          <input type="text"
            required
            value={loaiSP_id}
            onChange={(e) => setLoaiSP_id(e.target.value)}
            style={loaiSpIDErrorStyle}
            placeholder="Nhập mã loại SP" />
        </div>
        <div className="newProductItem">
          <label>Giá</label>
          <input type="number"
            min={1}
            required
            value={gia}
            onChange={(e) => setGia(e.target.value)}
            placeholder="VD: 20000" />
        </div>
        <div className="newProductItem">
          <label>Giảm</label>
          <input type="number"
            min={0}
            max={100}
            required
            value={giam}
            onChange={(e) => setGiam(e.target.value)}
            placeholder="VD: 10" />
        </div>
        <div className="newProductItem">
          <label>Số lượng</label>
          <input type="number"
            min={0}
            required
            value={soluong}
            onChange={(e) => setSoluong(e.target.value)}
            placeholder="100" />
        </div>
        <div className="newProductItem">
          <label>Hãng</label>
          <input type="text"
            required
            value={hang}
            onChange={(e) => setHang(e.target.value)}
            placeholder="VD: Nivea" />
        </div>
        <div className="newProductItem">
          <label>Link hình ảnh</label>
          <img src={hinhanh} className="productUploadImg"></img>
          <input type="text"
            required
            value={hinhanh}
            onChange={(e) => setHinhanh(e.target.value)}
            placeholder="VD: https://images.pexels.com/pexels-photo-7156886.jpeg" />
        </div>
        <div className="newProductItem">
          <label>Mô tả</label>
          <textarea type="textarea"
            required
            value={mota}
            onChange={(e) => setMota(e.target.value)}
            placeholder="Nhập mô tả" />
        </div>
        <div className="newProductItem">
          <label>Loại</label>
          <input type="text"
            required
            value={loai}
            onChange={(e) => setLoai(e.target.value)}
            placeholder="VD: 150ml" />
        </div>
        <button type="submit" className="addProductButton">Tạo sản phẩm</button>
      </form>
    </div>

    // <div className="newProduct">
    //   <h1 className="addProductTitle">Thêm sản phẩm</h1>
    //   <form className="addProductForm">

    //     <div className="addProductItem">
    //       <label>Tên sản phẩm</label>
    //       <input type="text" placeholder="Serum HA" />
    //     </div>
    //     <div className="addProductItem">
    //       <label>Tồn kho</label>
    //       <input type="number" placeholder="123" />
    //     </div>
    //     <div className="addProductItem">
    //       <label>Hiển thị</label>
    //       <select name="active" id="active">
    //         <option value="yes">Hiển thị</option>
    //         <option value="no">Ẩn</option>
    //       </select>
    //     </div>
    //     <div className="addProductItem">
    //       <label>Hình ảnh</label>
    //       <input type="file" id="file" />
    //     </div>
    //     <button className="addProductButton">Tạo sản phẩm</button>
    //   </form>
    // </div>
  );
}
