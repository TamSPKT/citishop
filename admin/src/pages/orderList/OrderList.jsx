import "./orderList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline, EditOutlined } from "@material-ui/icons";
import { orderRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import HoadonDataService from "../../services/hoadon"

export default function OrderList() {
  const [data, setData] = useState({});
  const [hoadonList, setHoadonList] = useState([]);

  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleDelete = (id) => {
    if (window.confirm(`Bạn có chắc chắn muốn xoá Hoá đơn ID ${id}?`)) {
      HoadonDataService.deleteHoadon(id)
        .then(res => {
          if (res.data.response && res.data.response.deletedCount !== 0) {
            window.location.reload();
          }
        })
        .catch((e) => {
          console.log(e);
        })
    }
    // setData(data.filter((item) => item.id !== id));
  };

  useEffect(() => {
    retrieveOrders();
  }, [])

  useEffect(() => {
    setLoading(true);
    retrieveOrders(page);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [page]);

  const retrieveOrders = (page) => {
    HoadonDataService.getAll(page)
      .then(res => {
        // console.log(res.data);
        let hoadonList = res.data.hoadon.map((hd) => {
          return { ...hd, id: hd._id }
        })
        setData(res.data);
        setHoadonList(hoadonList);
      })
      .catch((e) => {
        console.log(e);
      })
  }

  const handlePageChange = (newPage) => {
    // console.log(newPage)
    setPage(newPage);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
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
            {/* {params.row.ngayDat} */}
            {new Date(params.row.ngayDat).toUTCString()}
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
            {params.row.tongHoaDon + 30000}
          </div>
        );
      },
    },
    {
      field: "trangThai", headerName: "Trạng thái", width: 160,
      renderCell: (params) => {
        return (
          <div className="orderListItem">
            {params.row.trangThai}
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
              <EditOutlined className="orderListEdit" />
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
        rows={hoadonList}
        rowCount={data.total_results}
        disableSelectionOnClick
        columns={columns}
        pageSize={data.entries_per_page}
        // rowsPerPageOptions={[5, 10, 20]}
        paginationMode="server"
        onPageChange={handlePageChange}
        checkboxSelection
        pagination
        loading={loading}
      />
    </div>
  );
}
