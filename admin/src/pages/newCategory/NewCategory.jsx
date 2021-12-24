import "./newCategory.css";

export default function NewCategory() {
  return (
    <div className="newCategory">
      <h1 className="newCategoryTitle">Thêm loại sản phẩm</h1>
      <form className="newCategoryForm">
        <div className="newCategoryItem">
          <label>Tên loại</label>
          <input type="text" placeholder="Tên đăng nhập" />
        </div>
        <div className="newCategoryDesc">
          <label>Mô tả</label>
          <input type="text" placeholder="Nhập mô tả" />
        </div>
        
          <button className="newCategoryButton">Tạo loại sản phẩm</button>
        
      </form>
    </div>
  );
}
