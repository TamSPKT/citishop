
import { Link } from "react-router-dom";
import "./order.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline,EditOutlined } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { useState } from "react";
import Select from 'react-select';
  
export default function Oder() {
      
  const [data, setData] = useState(productRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const options = [
    { value: 'choxacnhan', label: 'Chờ xác nhận' },
    { value: 'dangchuanbi', label: 'Đang chuẩn bị hàng' },
    { value: 'danggiao', label: 'Đang giao' },
    { value: 'dagiao', label: 'Đã giao' },
  ]
  

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "tenSP",
      headerName: "Tên sản phẩm",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.hinhanh} alt="" />
            {params.row.tensanpham}
          </div>
        );
      },
    },
    {
      field: "gia", headerName: "Giá", width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.gia}
          </div>
        );
      },
    },
    {
      field: "giam",
      headerName: "Giảm giá",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.giam}
          </div>
        );
      },
    },
    {
      field: "soluong", headerName: "Số lượng", width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.soluong}
          </div>
        );
      },
    },
    {
      field: "thanhtien", headerName: "Thành tiền", width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {(params.row.gia - params.row.gia*params.row.giam)  * params.row.soluong }
          </div>
        );
      },
    },
  ];
    return (
      <div className="order">
        <div className="orderTitleContainer">
          <h1 className="orderTitle">Thông tin đơn hànng</h1>
          <Link to="/editOrder">
            <button className="orderAddButton">Tạo mới</button>
          </Link>
        </div>
        <div className="orderContainer">
          <div className="orderShow">
            <div className="orderShowTop">
              <img
                src="https://res.cloudinary.com/cam6776/image/upload/v1640225898/Logoco_nhan_yssa53.png"
                alt=""
                className="orderShowImg"
              />
              <div className="orderShowTopTitle">
                <span className="orderShowOrdername">Citi Shop </span>
              </div>
            </div>
            <div className="orderShowBottom">
              <span className="orderShowTitle">Thông tin chi tiết</span>
              <div className="orderShowInfo">
              <span className="orderShowOrdername">Tên người nhận:</span>
                <span className="orderShowInfoTitle">Cam cam </span>
              </div>
              <div className="orderShowInfo">
              <span className="orderShowOrdername">Ngày đặt:</span>
                <span className="orderShowInfoTitle">10.12.1990</span>
              </div>
              <div className="orderShowInfo">
              <span className="orderShowOrdername">SĐT nhận:</span>
                <span className="orderShowInfoTitle">0383060695</span>
              </div>
              <div className="orderShowInfo">
              <span className="orderShowOrdername">Địa chỉ:</span>
                <span className="orderShowInfoTitle">01 Võ Văn Ngân Linh chiểu thủ đức</span>
              </div>
              <div className="orderShowInfo">
              <span className="orderShowOrdername">Giảm giá:</span>
                <span className="orderShowInfoTitle">10%</span>
              </div>
              <div className="orderShowInfo">
              <span className="orderShowOrdername">Tổng tiền:</span>
                <span className="orderShowInfoTitle">100000</span>
              </div>
              <div className="orderShowInfo">
              <span className="orderShowOrdername">Kiểu thanh toán:</span>
                <span className="orderShowInfoTitle">Ship cod</span>
              </div>
              <div>
                <span className="orderShowOrdername"> Cập nhật trạng thái:</span>
                <span className="orderShowOrdername"> <Select options={options} /></span>
                
              </div>
            </div>
            <button className="orderButton">Cập nhật</button>  
          </div>
          <div className="orderUpdate">
            <span className="orderUpdateTitle">Chi tiết đơn hàng</span>
            
            <DataGrid
              rows={data}
              disableSelectionOnClick
              columns={columns}
              pageSize={8}
              checkboxSelection
            />
          </div>
          
        </div>
        
      </div>
    );
  }
  