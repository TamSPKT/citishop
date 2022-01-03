import { useEffect, useState } from "react";
import "./newUser.css";

import UserDataService from "../../services/user";
import { useHistory } from "react-router-dom";

export default function NewUser() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRe, setPasswordRe] = useState("");
  const [sdt, setSdt] = useState("");
  const [gioitinh, setGioitinh] = useState("");
  const [ngaysinh, setNgaysinh] = useState("");
  const [diachi, setDiachi] = useState("");
  const [phanquyen, setPhanquyen] = useState(1);

  const [error, setError] = useState(undefined);
  const [passwordErrorStyle, setPasswordErrorStyle] = useState(undefined);

  useEffect(() => {
    if (password !== passwordRe) {
      setPasswordErrorStyle({ color: "red" });
    } else {
      setPasswordErrorStyle(undefined);
    }
  }, [password, passwordRe]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordErrorStyle) {
      // console.log(passwordErrorStyle);
      return;
    }
    let userData = {
      username, password, email, sdt, gioitinh, ngaysinh, diachi, phanquyen,
    }
    // console.log(userData);
    UserDataService.createUser(userData)
      .then(res => {
        if (res.data.response && res.data.response.insertedId) {
          history.push('/users');
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
      });
  }

  return (
    <div className="newUser">
      <h1 className="newUserTitle">Tạo tài khoản</h1>
      {error && <p style={{ color: "red" }}>Xảy ra lỗi</p>}
      <form className="newUserForm" onSubmit={handleSubmit}>
        <div className="newUserItem">
          <label>Tên đăng nhập</label>
          <input type="text"
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Tên đăng nhập" />
        </div>
        {/* <div className="newUserItem">
          <label>Họ tên</label>
          <input type="text"
            required
            placeholder="VD: Nguyễn Văn A" />
        </div> */}
        <div className="newUserItem">
          <label>Email</label>
          <input type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="VD: citishop@gmail.com" />
        </div>
        <div className="newUserItem">
          <label>Mật khẩu</label>
          <input type="password"
            name="password"
            required
            style={passwordErrorStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu" />
        </div>
        <div className="newUserItem">
          <label>Xác nhận mật khẩu</label>
          <input type="password"
            name="passwordRe"
            required
            style={passwordErrorStyle}
            value={passwordRe}
            onChange={(e) => setPasswordRe(e.target.value)}
            placeholder="Nhập xác nhận mật khẩu" />
        </div>
        <div className="newUserItem">
          <label>Số điện thoại</label>
          <input type="tel"
            name="sdt"
            required
            pattern="^((09|03|07|08|05)+([0-9]{8})\b)$"
            value={sdt}
            onChange={(e) => setSdt(e.target.value)}
            placeholder="VD: 0383060695" />
        </div>
        <div className="newUserItem">
          <label>Địa chỉ</label>
          <input type="text"
            name="diachi"
            required
            value={diachi}
            onChange={(e) => setDiachi(e.target.value)}
            placeholder="VD: 1 Võ Văn Ngân, Linh Chiểu, Thủ Đức" />
        </div>
        <div className="newUserItem">
          <label>Ngày sinh</label>
          <input type="date"
            name="ngaysinh"
            required
            value={ngaysinh}
            onChange={(e) => setNgaysinh(e.target.value)}
            // defaultValue={new Date(user.ngaysinh).toISOString().substring(0, 10)}
            placeholder="Nhập ngày sinh" />
        </div>
        <div className="newUserItem">
          <label>Giới tính</label>
          <div className="newUserGender">
            <input type="radio"
              onChange={(e) => setGioitinh(e.target.value)}
              name="gender" id="male" value="Nam" />
            <label htmlFor="male">Nam</label>
            <input type="radio"
              onChange={(e) => setGioitinh(e.target.value)}
              name="gender" id="female" value="Nữ" />
            <label htmlFor="female">Nữ</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>Hoạt động</label>
          <select className="newUserSelect"
            onChange={(e) => setPhanquyen(Number(e.target.value))}
            name="phanquyen" id="active">
            <option value="1">Kích hoạt</option>
            <option value="0">Không</option>
          </select>
        </div>
        <button type="submit" className="newUserButton">Tạo tài khoản</button>

      </form>
    </div>
  );
}
