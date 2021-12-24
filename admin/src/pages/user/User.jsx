import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  CloudUpload,
  WcOutlined,
  BlockOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./user.css";

export default function User() {
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Thông tin tài khoản</h1>
        <Link to="/editUser">
          <button className="userAddButton">Tạo mới</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://res.cloudinary.com/cam6776/image/upload/v1640225898/Logoco_nhan_yssa53.png"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">Citi Shop </span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Thông tin chi tiết</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">citishop</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">10.12.1990</span>
            </div>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">0383060695</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">citishop@gmail.com</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">HCM</span>
            </div>
            <div className="userShowInfo">
              <WcOutlined className="userShowIcon" />
              <span className="userShowInfoTitle">Nam</span>
            </div>
            <div className="userShowInfo">
              <BlockOutlined className="userShowIcon" />
              <span className="userShowInfoTitle">Hoạt động</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Chỉnh sửa</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
            <div className="editUserItem">
          <label>Tên đăng nhập</label>
          <input type="text" placeholder="Tên đăng nhập" />
        </div>
        <div className="editUserItem">
          <label>Họ tên</label>
          <input type="text" placeholder="Nguyễn Văn A" />
        </div>
        <div className="editUserItem">
          <label>Email</label>
          <input type="email" placeholder="ex: citishop@gmail.com" />
        </div>
        <div className="editUserItem">
          <label>Mật khẩu</label>
          <input type="password" placeholder="Nhập mật khẩu" />
        </div>
        <div className="editUserItem">
          <label>Số điện thoại</label>
          <input type="text" placeholder="0383060695" />
        </div>
        <div className="editUserItem">
          <label>Địa chỉ</label>
          <input type="text" placeholder="1 Võ Văn Ngân, Linh Chiểu, Thủ Đức" />
        </div>
        <div className="editUserItem">
          <label>Giới tính</label>
          <div className="editUserGender">
            <input type="radio" name="gender" id="male" value="male" />
            <label for="male">Nam</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label for="female">Nữ</label>
          </div>
        </div>
        <div className="editUserItem">
          <label>Hoạt động</label>
          <select className="editUserSelect" name="active" id="active">
            <option value="yes">Khóa</option>
            <option value="no">Hoạt động</option>
          </select>
              </div>
              <button className="editUserButton">Cập nhật</button>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
              <img src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="productUploadImg" />
                      <label for="file">
                          <CloudUpload/>
                      </label>
                
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
