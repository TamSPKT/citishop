import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline, EditOutlined } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import UserDataService from "../../services/user"

export default function UserList() {
  const [data, setData] = useState({});
  const [userList, setUserList] = useState([]);

  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleDelete = (id, username) => {
    if (window.confirm(`Bạn có chắc chắn muốn xoá User ${username}, ID ${id}?`)) {
      UserDataService.deleteUser(username)
        .then(res => {
          if (res.data.response && res.data.response.deletedCount !== 0) {
            window.location.reload();
          }
        })
        .catch((e) => {
          console.log(e);
        })
    }
    // window.location.reload();
    // setUserList(userList.filter((item) => item.id !== id));
  };

  useEffect(() => {
    retrieveUsers(page);
  }, []);

  useEffect(() => {
    setLoading(true);
    retrieveUsers(page);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [page]);

  const retrieveUsers = (page) => {
    UserDataService.getAll(page)
      .then(res => {
        // console.log(res.data);
        let userList = res.data.users.map((item) => {
          return { ...item, id: item._id, avatar: userRows[0].avatar }
        })
        setData(res.data);
        setUserList(userList);
      })
      .catch((e) => {
        console.log(e);
      })
  }

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    {
      field: "username",
      headerName: "Tên đăng nhập",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "sdt",
      headerName: "SĐT",
      width: 120,
    },
    {
      field: "diachi",
      headerName: "Địa chỉ",
      width: 160,
    },
    {
      field: "gioitinh",
      headerName: "Giới tính",
      width: 130,
    },
    {
      field: "ngaysinh",
      headerName: "Ngày sinh",
      width: 135,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {/* {new Date(params.row.ngaysinh).toLocaleDateString()} */}
            {String(params.row.ngaysinh).substring(0, 10)}
          </div>
        );
      },
    },
    {
      field: "phanquyen",
      headerName: "Quyền",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.phanquyen ? "Hoạt động" : "Khoá"}
          </div>
        );
      },
    },

    {
      field: "action",
      headerName: "Hành động",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <EditOutlined className="userListEdit" />
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id, params.row.username)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <h2 className="nameTitle" >Danh sách khách hàng</h2>
      <DataGrid
        rows={userList}
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
