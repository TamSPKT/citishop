import "./newProduct.css";

export default function NewProduct() {
  return (
    <div className="newProduct">
      <h1 className="newProductTitle">Thêm sản phẩm mới</h1>
      <form className="newProductForm">
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
          <input type="number" placeholder="20000" />
        </div>
        <div className="newProductItem">
          <label>Số lượng</label>
          <input type="number" placeholder="100" />
        </div>
        <div className="newProductItem">
          <label>Hãng</label>
          <input type="text" placeholder="Nivea" />
        </div>
        <div className="newProductItem">
          <label>Hình ảnh</label>
          <input type="file" id="file" />
        </div>
        <button className="addProductButton">Tạo sản phẩm</button>
        
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
