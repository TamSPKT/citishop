
import { Link, useHistory, useParams } from "react-router-dom";
import "./order.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline, EditOutlined } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { useEffect, useState } from "react";
import Select from 'react-select';

import HoadonDataService from "../../services/hoadon";

export default function Order() {
  const history = useHistory();
  const params = useParams();
  const { orderId } = params;

  // const [data, setData] = useState(productRows);
  const [order, setOrder] = useState({});
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [ngayDat, setNgayDat] = useState("");
  const [nguoiNhan, setNguoiNhan] = useState("");
  const [sdt, setSdt] = useState("");
  const [diachi, setDiachi] = useState("");
  const [diachiDatHang, setDiachiDatHang] = useState("");
  const [giamHD, setGiamHD] = useState(0);
  const [tongHoaDon, setTongHoaDon] = useState(0);
  const [kieuThanhToan, setKieuThanhToan] = useState("");
  const [chiTietHD, setChiTietHD] = useState([]);
  const [trangThai, setTrangThai] = useState("");

  const [selectedOption, setSelectedOption] = useState("");

  // const handleDelete = (id) => {
  //   setData(data.filter((item) => item.id !== id));
  // };

  useEffect(() => {
    if (orderId) {
      HoadonDataService.get(orderId)
        .then(res => {
          // console.log(res.data);
          setOrder(res.data);
          setUsername(res.data.username);
          setEmail(res.data.stripeToken.email);
          setNgayDat(res.data.ngayDat);
          setNguoiNhan(res.data.nguoiNhan);
          setSdt(res.data.sdt);
          setDiachi(res.data.diachi);
          let { address_city, address_country, address_line1 } = res.data.stripeToken.card;
          setDiachiDatHang(`${address_line1} - ${address_city} - ${address_country}`);
          setGiamHD(res.data['%giamHD']);
          setTongHoaDon(res.data.tongHoaDon);
          setKieuThanhToan(res.data.kieuThanhToan);
          let cthd = res.data.chiTietHD.map((ct) => {
            return { ...ct, id: ct.sanpham_id }
          })
          // console.log(res.data.chiTietHD, cthd);
          setChiTietHD(cthd);
          setTrangThai(res.data.trangThai);

          let option = options.find(o => o.value === res.data.trangThai);
          setSelectedOption(option);
        })
        .catch((e) => {
          console.log(e);
        })
    }
  }, [])

  const options = [
    { id: 1, value: 'Chờ xác nhận', label: 'Chờ xác nhận' },
    { id: 2, value: 'Đang chuẩn bị hàng', label: 'Đang chuẩn bị hàng' },
    { id: 3, value: 'Đang giao', label: 'Đang giao' },
    { id: 4, value: 'Đã giao', label: 'Đã giao' },
  ]

  const handleChange = (e) => {
    // console.log(e);
    setTrangThai(e.value);
    setSelectedOption(e);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e);
    HoadonDataService.updateHoadon({
      _id: order._id,
      trangThai,
    })
      .then(res => {
        if (res.data.response && res.data.response.modifiedCount !== 0) {
          history.push('/orders');
        } else {
          console.log(res.data.response);
        }
      })
      .catch((e) => {
        console.log(e);
      })
  }

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    {
      field: "tenSP",
      headerName: "Tên sản phẩm",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {/* <img className="productListImg" src={params.row.hinhanh} alt="" /> */}
            {params.row.tenSP}
          </div>
        );
      },
    },
    {
      field: "gia", headerName: "Giá", width: 100,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.gia}
          </div>
        );
      },
    },
    {
      field: "giam", headerName: "Giảm giá", width: 140,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {/* {params.row.giam} */}
            {`${params.row.giam}%`}
          </div>
        );
      },
    },
    {
      field: "soluongMua", headerName: "Số lượng", width: 140,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.soluongMua}
          </div>
        );
      },
    },
    {
      field: "tongGia", headerName: "Thành tiền", width: 150,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {/* {(params.row.gia - params.row.gia * params.row.giam) * params.row.soluong} */}
            {params.row.tongGia}
          </div>
        );
      },
    },
  ];
  return (
    <div className="order">
      <div className="orderTitleContainer">
        <h1 className="orderTitle">Thông tin đơn hànng</h1>
        {/* <Link to="/editOrder">
          <button className="orderAddButton">Tạo mới</button>
        </Link> */}
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
              <span className="orderShowOrdername">Tài khoản:</span>
              <span className="orderShowInfoTitle">{username}</span>
            </div>
            <div className="orderShowInfo">
              <span className="orderShowOrdername">Tên người nhận:</span>
              <span className="orderShowInfoTitle">{nguoiNhan}</span>
            </div>
            <div className="orderShowInfo">
              <span className="orderShowOrdername">Ngày đặt:</span>
              <span className="orderShowInfoTitle">{new Date(ngayDat).toUTCString()}</span>
            </div>
            <div className="orderShowInfo">
              <span className="orderShowOrdername">SĐT nhận:</span>
              <span className="orderShowInfoTitle">{sdt}</span>
            </div>
            <div className="orderShowInfo">
              <span className="orderShowOrdername">Địa chỉ:</span>
              <span className="orderShowInfoTitle">{diachi}</span>
            </div>
            <div className="orderShowInfo">
              <span className="orderShowOrdername">Địa chỉ đặt hàng:</span>
              <span className="orderShowInfoTitle">{diachiDatHang}</span>
              {/* <span className="orderShowInfoTitle">01 Võ Văn Ngân Linh chiểu thủ đức</span> */}
            </div>
            <div className="orderShowInfo">
              <span className="orderShowOrdername">Giảm hoá đơn:</span>
              <span className="orderShowInfoTitle">{giamHD}%</span>
            </div>
            <div className="orderShowInfo">
              <span className="orderShowOrdername">Tổng tiền:</span>
              <span className="orderShowInfoTitle">{tongHoaDon + 30000}</span>
            </div>
            <div className="orderShowInfo">
              <span className="orderShowOrdername">Kiểu thanh toán:</span>
              <span className="orderShowInfoTitle">{kieuThanhToan}</span>
            </div>
            <div>
              <span className="orderShowOrdername">Cập nhật trạng thái:</span>
              <span className="orderShowOrdername">
                <Select
                  options={options}
                  onChange={handleChange}
                  value={selectedOption} />
              </span>

            </div>
          </div>
          <button className="orderButton" onClick={handleSubmit}>Cập nhật</button>
        </div>
        <div className="orderUpdate">
          <span className="orderUpdateTitle">Chi tiết đơn hàng</span>

          <DataGrid
            rows={chiTietHD}
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
