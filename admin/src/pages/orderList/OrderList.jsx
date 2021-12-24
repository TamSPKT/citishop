import "./orderList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline,EditOutlined } from "@material-ui/icons";
import { orderRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function OrderList() {
  const [data, setData] = useState(orderRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "tenSP",
      headerName: "Tài khoản",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="orderListItem">
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "ngayDat", headerName: "Ngày đặt", width: 200,
      renderCell: (params) => {
        return (
          <div className="orderListItem">
            {params.row.ngayDat}
          </div>
        );
      },
    },
    {
      field: "nguoiNhan",
      headerName: "Người nhận",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="orderListItem">
            {params.row.nguoiNhan}
          </div>
        );
      },
    },
    {
      field: "sdt", headerName: "SĐT", width: 200,
      renderCell: (params) => {
        return (
          <div className="orderListItem">
            {params.row.sdt}
          </div>
        );
      },
    },
    {
      field: "tongHoaDon", headerName: "Tổng tiền", width: 200,
      renderCell: (params) => {
        return (
          <div className="orderListItem">
            {params.row.tongHoaDon}
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="orderListItem">
            {params.row.tranhthai}
          </div>
        );
      },
    },
    
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/order/" + params.row.id}>
            <EditOutlined className="orderListEdit"/>
            </Link>
            <DeleteOutline
              className="orderListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="orderList">
      <h2 className="nameTitle" >Danh sách đơn hàng</h2>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
