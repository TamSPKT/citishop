
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
    { id: 1, value: 'Ch??? x??c nh???n', label: 'Ch??? x??c nh???n' },
    { id: 2, value: '??ang chu???n b??? h??ng', label: '??ang chu???n b??? h??ng' },
    { id: 3, value: '??ang giao', label: '??ang giao' },
    { id: 4, value: '???? giao', label: '???? giao' },
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
      headerName: "T??n s???n ph???m",
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
      field: "gia", headerName: "Gi??", width: 100,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.gia}
          </div>
        );
      },
    },
    {
      field: "giam", headerName: "Gi???m gi??", width: 140,
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
      field: "soluongMua", headerName: "S??? l?????ng", width: 140,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.soluongMua}
          </div>
        );
      },
    },
    {
      field: "tongGia", headerName: "Th??nh ti???n", width: 150,
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
        <h1 className="orderTitle">Th??ng tin ????n h??nng</h1>
        {/* <Link to="/editOrder">
          <button className="orderAddButton">T???o m???i</button>
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
            <span className="orderShowTitle">Th??ng tin chi ti???t</span>
            <div className="orderShowInfo">
              <span className="orderShowOrdername">T??i kho???n:</span>
              <span className="orderShowInfoTitle">{username}</span>
            </div>
            <div className="orderShowInfo">
              <span className="orderShowOrdername">T??n ng?????i nh???n:</span>
              <span className="orderShowInfoTitle">{nguoiNhan}</span>
            </div>
            <div className="orderShowInfo">
              <span className="orderShowOrdername">Ng??y ?????t:</span>
              <span className="orderShowInfoTitle">{new Date(ngayDat).toUTCString()}</span>
            </div>
            <div className="orderShowInfo">
              <span className="orderShowOrdername">S??T nh???n:</span>
              <span className="orderShowInfoTitle">{sdt}</span>
            </div>
            <div className="orderShowInfo">
              <span className="orderShowOrdername">?????a ch???:</span>
              <span className="orderShowInfoTitle">{diachi}</span>
            </div>
            <div className="orderShowInfo">
              <span className="orderShowOrdername">?????a ch??? ?????t h??ng:</span>
              <span className="orderShowInfoTitle">{diachiDatHang}</span>
              {/* <span className="orderShowInfoTitle">01 V?? V??n Ng??n Linh chi???u th??? ?????c</span> */}
            </div>
            <div className="orderShowInfo">
              <span className="orderShowOrdername">Gi???m ho?? ????n:</span>
              <span className="orderShowInfoTitle">{giamHD}%</span>
            </div>
            <div className="orderShowInfo">
              <span className="orderShowOrdername">T???ng ti???n:</span>
              <span className="orderShowInfoTitle">{tongHoaDon + 30000}</span>
            </div>
            <div className="orderShowInfo">
              <span className="orderShowOrdername">Ki???u thanh to??n:</span>
              <span className="orderShowInfoTitle">{kieuThanhToan}</span>
            </div>
            <div>
              <span className="orderShowOrdername">C???p nh???t tr???ng th??i:</span>
              <span className="orderShowOrdername">
                <Select
                  options={options}
                  onChange={handleChange}
                  value={selectedOption} />
              </span>

            </div>
          </div>
          <button className="orderButton" onClick={handleSubmit}>C???p nh???t</button>
        </div>
        <div className="orderUpdate">
          <span className="orderUpdateTitle">Chi ti???t ????n h??ng</span>

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
