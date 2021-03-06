import { Link, useHistory, useParams } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import { productData } from "../../dummyData"
import { CloudUpload } from "@material-ui/icons";
import { useEffect, useState } from "react";

import SanphamDataService from "../../services/sanpham";
import LoaiSpDataService from "../../services/loaiSp";

export default function Product() {
  const history = useHistory();
  const params = useParams();
  const { productId } = params;

  const [product, setProduct] = useState({});
  const [tenSP, setTenSP] = useState("");
  const [giam, setGiam] = useState(0);
  const [mota, setMota] = useState("");
  const [soluong, setSoluong] = useState("");
  const [hang, setHang] = useState("");
  const [loaiSP_id, setLoaiSP_id] = useState("");
  const [gia, setGia] = useState("");
  const [hinhanh, setHinhanh] = useState("");
  const [loai, setLoai] = useState("");

  const [loaiSpIDErrorStyle, setLoaiSpIDErrorStyle] = useState(undefined);

  useEffect(() => {
    if (productId) {
      SanphamDataService.get(productId)
        .then(res => {
          // console.log(res.data);
          setProduct(res.data);
          setTenSP(res.data.tenSP);
          setGiam(res.data['%giam']);
          setMota(res.data.mota);
          setSoluong(res.data.soluong);
          setHang(res.data.hang);
          setLoaiSP_id(res.data.loaiSP_id);
          setGia(res.data.gia);
          setHinhanh(res.data.hinhanh);
          setLoai(res.data.loai);
        })
        .catch((e) => {
          console.log(e);
        })
    }
  }, []);

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
      _id: product._id,
      tenSP, loai, hinhanh, mota, hang, loaiSP_id,
      gia: Number(gia), giam: Number(giam), soluong: Number(soluong),
    }
    // console.log(sanphamData);
    SanphamDataService.updateSanpham(sanphamData)
      .then(res => {
        if (res.data.response && res.data.response.modifiedCount !== 0) {
          history.push('/products');
        } else {
          console.log(res.data.response);
        }
      })
      .catch((e) => {
        console.log(e);
      })
  }

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">S???n ph???m</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Th??m</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={productData} dataKey="Sales" title="Th???ng k??" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            {/* <img src="https://res.cloudinary.com/cam6776/image/upload/v1640225898/Logoco_nhan_yssa53.png" alt="" className="productInfoImg" /> */}
            <img src={product.hinhanh} alt="" className="productInfoImg" />
            <span className="productName">{product.tenSP}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">M?? SP:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">M?? Lo???i SP:</span>
              <span className="productInfoValue">{product.loaiSP_id}</span>
            </div>
            {/* <div className="productInfoItem">
              <span className="productInfoKey">???? b??n</span>
              <span className="productInfoValue">5123</span>
            </div> */}
            {/* <div className="productInfoItem">
              <span className="productInfoKey">Tr???ng th??i</span>
              <span className="productInfoValue">Hi???n th???</span>
            </div> */}
            <div className="productInfoItem">
              <span className="productInfoKey">T???n kho:</span>
              <span className="productInfoValue">{product.soluong}</span>
            </div>
          </div>
        </div>
      </div>
      <form className="newProductForm" onSubmit={handleSubmit}>
        <div className="newProductItem">
          <label>T??n s???n ph???m</label>
          <input type="text"
            required
            value={tenSP}
            onChange={(e) => setTenSP(e.target.value)}
            placeholder="Nh???p m?? SP" />
        </div>
        <div className="newProductItem">
          <label>M?? lo???i s???n ph???m</label>
          <input type="text"
            required
            value={loaiSP_id}
            onChange={(e) => setLoaiSP_id(e.target.value)}
            style={loaiSpIDErrorStyle}
            placeholder="Nh???p m?? lo???i SP" />
        </div>
        <div className="newProductItem">
          <label>Gi??</label>
          <input type="number"
            min={1}
            required
            value={gia}
            onChange={(e) => setGia(e.target.value)}
            placeholder="VD: 20000" />
        </div>
        <div className="newProductItem">
          <label>Gi???m</label>
          <input type="number"
            min={0}
            max={100}
            required
            value={giam}
            onChange={(e) => setGiam(e.target.value)}
            placeholder="VD: 10" />
        </div>
        <div className="newProductItem">
          <label>S??? l?????ng</label>
          <input type="number"
            min={0}
            required
            value={soluong}
            onChange={(e) => setSoluong(e.target.value)}
            placeholder="100" />
        </div>
        <div className="newProductItem">
          <label>H??ng</label>
          <input type="text"
            required
            value={hang}
            onChange={(e) => setHang(e.target.value)}
            placeholder="VD: Nivea" />
        </div>
        <div className="newProductItem">
          {/* <img src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="productUploadImg" /> */}
          {/* <label for="file">
                <CloudUpload />
              </label>
              <input type="file" id="file" style={{ display: "none" }} /> */}
          <label>Link h??nh ???nh</label>
          <img src={hinhanh} alt="" className="productUploadImg" />
          <input type="text"
            required
            value={hinhanh}
            onChange={(e) => setHinhanh(e.target.value)}
            placeholder="VD: https://images.pexels.com/pexels-photo-7156886.jpeg" />
        </div>
        <div className="newProductItem">
          <label>M?? t???</label>
          <textarea type="textarea"
            required
            value={mota}
            onChange={(e) => setMota(e.target.value)}
            placeholder="Nh???p m?? t???" />
        </div>
        <div className="newProductItem">
          <label>Lo???i</label>
          <input type="text"
            required
            value={loai}
            onChange={(e) => setLoai(e.target.value)}
            placeholder="VD: 150ml" />
        </div>
        <button type="submit" className="addProductButton">C???p nh???t</button>
      </form>

    </div>
  );
}
