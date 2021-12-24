import "./sidebar.css";
import {
  HomeOutlined,
  Timeline,
  TrendingUp,
  PermIdentity,
  ChromeReaderModeOutlined,
  CategoryOutlined,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle"></h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className="sidebarListItem active">
              <HomeOutlined className="sidebarIcon" />
              Trang chủ
            </li>
            </Link>
          </ul>
        </div>
        <h3 className="sidebarTitle">Quản lý</h3>
        <div className="sidebarMenu">
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Quản lý Khách hàng
              </li>
            </Link>
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                &ensp;&ensp;&ensp;Tất cả khách hàng
              </li>
            </Link>
            <Link to="/newuser" className="link">
              <li className="sidebarListItem">
                &ensp;&ensp;&ensp;Thêm khách hàng
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <ChromeReaderModeOutlined className="sidebarIcon" />
                Quản lý Sản phẩm
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                &ensp;&ensp;&ensp;Tất cả sản phẩm
              </li>
            </Link>
            <Link to="/newproduct" className="link">
              <li className="sidebarListItem">
              &ensp;&ensp;&ensp;Thêm sản phẩm
              </li>
            </Link>
            <Link to="/category" className="link">
              <li className="sidebarListItem">
                <CategoryOutlined className="sidebarIcon" />
                Quản lý Loại sản phẩm
              </li>
            </Link>
            <Link to="/category" className="link">
              <li className="sidebarListItem">
                &ensp;&ensp;&ensp;Tất cả loại sản phẩm
              </li>
            </Link>
            <Link to="/newcategory" className="link">
              <li className="sidebarListItem">
              &ensp;&ensp;&ensp;Thêm loại sản phẩm
              </li>
            </Link>
            <Link to="/orders" className="link">
              <li className="sidebarListItem">
                <BarChart className="sidebarIcon" />
                Quản lý Đơn hàng
              </li>
            </Link>
            <Link to="/orders" className="link">
              <li className="sidebarListItem">
                &ensp;&ensp;&ensp;Tất cả đơn hàng
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Phản hồi</h3>
          <ul className="sidebarList">
            <Link to="/mails" className="link">
              <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail khách hàng
            </li>
          </Link>
            <Link to="/feedback" className="link">
              <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Đánh giá
              </li>
          </Link>
            
          </ul>
        </div>
      </div>
    </div>
  );
}
