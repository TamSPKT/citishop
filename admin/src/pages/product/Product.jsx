import { Link } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import { CloudUpload } from "@material-ui/icons";

export default function Product() {
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Sản phẩm</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Thêm</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopLeft">
              <Chart data={productData} dataKey="Sales" title="Thống kê"/>
          </div>
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src="https://res.cloudinary.com/cam6776/image/upload/v1640225898/Logoco_nhan_yssa53.png" alt="" className="productInfoImg" />
                  <span className="productName">Serum HA</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">Mã Sản phẩm</span>
                      <span className="productInfoValue">123</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Đã bán</span>
                      <span className="productInfoValue">5123</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Trạng thái</span>
                      <span className="productInfoValue">Hiển thị</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Tồn kho</span>
                      <span className="productInfoValue">100</span>
                  </div>
              </div>
          </div>
      </div>
      
      <div className="productBottom">
          <form className="productForm">
            <div className="productFormLeft">
            <div className="newProductItem">
              <label>Mã sản phẩm</label>
              <input type="text" placeholder="Id: 123" />
            </div>
            <div className="newProductItem">
              <label>Loại sản phẩm</label>
              <input type="text" placeholder="Nhập loại" />
            </div>
            <div className="newProductItem">
              <label>Giá</label>
              <input type="number" placeholder="ex: 20000" />
            </div>
            <div className="newProductItem">
              <label>Số lượng</label>
              <input type="number" placeholder="100" />
            </div>
            <div className="newProductItem">
              <label>Hãng</label>
              <input type="text" placeholder="Nivea" />
            </div>
            </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="productUploadImg" />
                      <label for="file">
                          <CloudUpload/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} />
                  </div>
              </div>
          
          </form>
      </div>
      <div className="productUpdate">
        <button className="productButton">Cập nhật</button>        
      </div>
    </div>
  );
}
