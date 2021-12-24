import "./newUser.css";

export default function NewUser() {
  return (
    <div className="newUser">
      <h1 className="newUserTitle">Tạo tài khoản</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Tên đăng nhập</label>
          <input type="text" placeholder="Tên đăng nhập" />
        </div>
        <div className="newUserItem">
          <label>Họ tên</label>
          <input type="text" placeholder="Nguyễn Văn A" />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" placeholder="ex: citishop@gmail.com" />
        </div>
        <div className="newUserItem">
          <label>Mật khẩu</label>
          <input type="password" placeholder="Nhập mật khẩu" />
        </div>
        <div className="newUserItem">
          <label>Số điện thoại</label>
          <input type="text" placeholder="0383060695" />
        </div>
        <div className="newUserItem">
          <label>Địa chỉ</label>
          <input type="text" placeholder="1 Võ Văn Ngân, Linh Chiểu, Thủ Đức" />
        </div>
        <div className="newUserItem">
          <label>Giới tính</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" />
            <label for="male">Nam</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label for="female">Nữ</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>Hoạt động</label>
          <select className="newUserSelect" name="active" id="active">
            <option value="yes">Kích hoạt</option>
            <option value="no">Không</option>
          </select>
        </div>
          <button className="newUserButton">Tạo tài khoản</button>
        
      </form>
    </div>
  );
}
