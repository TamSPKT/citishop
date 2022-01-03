import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./newCategory.css";

import LoaiSpDataService from "../../services/loaiSp";

export default function NewCategory() {
  const history = useHistory();
  const [tenloaiSP, setTenloaiSP] = useState("");
  const [mota, setMota] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let loaiSpData = {
      tenloaiSP, mota,
    }
    // console.log(loaiSpData);
    LoaiSpDataService.createLoaiSp(loaiSpData)
      .then(res => {
        if (res.data.response && res.data.response.insertedId) {
          history.push('/category');
        }
        else {
          console.log(res.data.response);
        }
      })
      .catch((e) => {
        console.log(e);
      })
  }

  return (
    <div className="newCategory">
      <h1 className="newCategoryTitle">Thêm loại sản phẩm</h1>
      <form className="newCategoryForm" onSubmit={handleSubmit}>
        <div className="newCategoryItem">
          <label>Tên loại</label>
          <input type="text"
            name="tenloaiSP"
            required
            value={tenloaiSP}
            onChange={(e) => setTenloaiSP(e.target.value)}
            placeholder="Nhập tên loại SP" />
        </div>
        <div className="newCategoryDesc">
          <label>Mô tả</label>
          <textarea type="textarea"
            name="mota"
            value={mota}
            onChange={(e) => setMota(e.target.value)}
            placeholder="Nhập mô tả" />
        </div>

        <button type="submit" className="newCategoryButton">Tạo loại sản phẩm</button>

      </form>
    </div>
  );
}
