import React from "react";
import "./topbar.css";
import { ArrowDropDownOutlined } from "@material-ui/icons";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
        <img src="https://res.cloudinary.com/cam6776/image/upload/v1640225898/Logoco_nhan_yssa53.png" alt="" className="logoImg" />
        {/* <span className="logo">CiTi Shop</span> */}
        </div>
        <div className="topRight">
          <img src="https://res.cloudinary.com/cam6776/image/upload/v1640225898/Logoco_nhan_yssa53.png" alt="" className="topAvatar" />
          <div className="topbarIconContainer">
            <ArrowDropDownOutlined />
          </div>
        </div>
      </div>
    </div>
  );
}
