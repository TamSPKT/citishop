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
import { useEffect, useState } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import "./user.css";

import UserDataService from "../../services/user";

export default function User() {
  // const location = useLocation();
  const history = useHistory();
  // const userId = location.pathname.split("/")[1] === 'user' ? location.pathname.split("/")[2] : undefined;
  const params = useParams();
  const { userId } = params;
  const [user, setUser] = useState({});
  // console.log("location - params", location, params);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [sdt, setSdt] = useState("");
  const [gioitinh, setGioitinh] = useState("");
  const [ngaysinh, setNgaysinh] = useState("");
  const [diachi, setDiachi] = useState("");
  const [phanquyen, setPhanquyen] = useState();

  useEffect(() => {
    // console.log("useEffect", userId);
    if (userId) {
      UserDataService.get(userId)
        .then(res => {
          // console.log(res.data);
          setUser(res.data);
          setPassword(res.data.password);
          setEmail(res.data.email);
          setSdt(res.data.sdt);
          setGioitinh(res.data.gioitinh);
          setNgaysinh(res.data.ngaysinh.substring(0, 10));
          setDiachi(res.data.diachi);
          setPhanquyen(res.data.phanquyen);
        })
        .catch((e) => {
          console.log(e)
        });
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    let userData = {
      username: user.username,
      password, email, sdt, gioitinh, ngaysinh, diachi, phanquyen,
    }
    // console.log(userData);
    // setUser({
    //   ...user,
    //   sdt, email, diachi, gioitinh, phanquyen,
    // })
    UserDataService.updateUser(userData)
      .then(res => {
        if (res.data.response && res.data.response.modifiedCount !== 0) {
          history.push('/users');
        } else {
          console.log(res.data.response);
        }
      })
      .catch((e) => {
        console.log(e);
      })
  }

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Th??ng tin t??i kho???n</h1>
        <Link to="/newUser">
          <button className="userAddButton">T???o m???i</button>
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
              <span className="userShowUsername">{user.username}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Th??ng tin chi ti???t</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">
                {String(user.ngaysinh).substring(0, 10)}
              </span>
            </div>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{user.sdt}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{user.diachi}</span>
            </div>
            <div className="userShowInfo">
              <WcOutlined className="userShowIcon" />
              <span className="userShowInfoTitle">{user.gioitinh}</span>
            </div>
            <div className="userShowInfo">
              <BlockOutlined className="userShowIcon" />
              <span className="userShowInfoTitle">{user.phanquyen ? "Ho???t ?????ng" : "Kho??"}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Ch???nh s???a</span>
          <form className="userUpdateForm" onSubmit={handleSubmit}>
            <div className="userUpdateLeft">
              {/* <div className="editUserItem">
                <label>T??n ????ng nh???p</label>
                <input type="text" placeholder="T??n ????ng nh???p" />
              </div>
              <div className="editUserItem">
                <label>H??? t??n</label>
                <input type="text" placeholder="Nguy???n V??n A" />
              </div> */}
              <div className="editUserItem">
                <label>Email</label>
                <input type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="VD: citishop@gmail.com" />
              </div>
              <div className="editUserItem">
                <label>M???t kh???u</label>
                <input type="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nh???p m???t kh???u" />
              </div>
              <div className="editUserItem">
                <label>S??? ??i???n tho???i</label>
                <input type="tel"
                  name="sdt"
                  required
                  pattern="^((09|03|07|08|05)+([0-9]{8})\b)$"
                  value={sdt}
                  onChange={(e) => setSdt(e.target.value)}
                  placeholder="VD: 0383060695" />
              </div>
              <div className="editUserItem">
                <label>Ng??y sinh</label>
                <input type="date"
                  name="ngaysinh"
                  required
                  value={ngaysinh}
                  onChange={(e) => setNgaysinh(e.target.value)}
                  // defaultValue={new Date(user.ngaysinh).toISOString().substring(0, 10)}
                  placeholder="Nh???p ng??y sinh" />
              </div>
              <div className="editUserItem">
                <label>?????a ch???</label>
                <input type="text"
                  name="diachi"
                  required
                  value={diachi}
                  onChange={(e) => setDiachi(e.target.value)}
                  placeholder="VD: 1 V?? V??n Ng??n, Linh Chi???u, Th??? ?????c" />
              </div>
              <div className="editUserItem">
                <label>Gi???i t??nh</label>
                <div className="editUserGender">
                  <input type="radio"
                    checked={gioitinh === "Nam"}
                    onChange={(e) => setGioitinh(e.target.value)}
                    name="gioitinh" id="male" value="Nam" />
                  <label htmlFor="male">Nam</label>
                  <input type="radio"
                    checked={gioitinh === "N???"}
                    onChange={(e) => setGioitinh(e.target.value)}
                    name="gioitinh" id="female" value="N???" />
                  <label htmlFor="female">N???</label>
                </div>
              </div>
              <div className="editUserItem">
                <label>Ho???t ?????ng</label>
                <select className="editUserSelect"
                  onChange={(e) => setPhanquyen(Number(e.target.value))}
                  name="phanquyen" id="active">
                  <option
                    value="0">Kh??a</option>
                  <option selected={user.phanquyen}
                    value="1">Ho???t ?????ng</option>
                </select>
              </div>
              <button type="submit" className="editUserButton">C???p nh???t</button>
            </div>
            {/* <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="productUploadImg" />
                <label for="file">
                  <CloudUpload />
                </label>

                <input type="file" id="file" style={{ display: "none" }} />
              </div>

            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
}
