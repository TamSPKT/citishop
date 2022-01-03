import "./categoryList.css";
import { DataGrid } from "@material-ui/data-grid";
import { ClearOutlined, EditOutlined, RemoveRedEyeOutlined } from "@material-ui/icons";
import { categoryRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import LoaiSpDataService from "../../services/loaiSp"

export default function CategoryList() {
  const [data, setData] = useState({});
  const [loaiSpList, setLoaiSpList] = useState([]);

  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleDelete = (id, tenloaiSP) => {
    LoaiSpDataService.getByIDWithSpPerPage(id)
      .then(res => {
        let sanphams = Number(res.data.total_results);
        if (sanphams > 0) {
          window.alert(`Không thể xoá Loại SP ${tenloaiSP}, ID ${id} do có chứa ${sanphams} sản phẩm.`);
          return;
        }

        if (window.confirm(`Bạn có chắc chắn muốn xoá Loại SP ${tenloaiSP}, ID ${id}?`)) {
          LoaiSpDataService.deleteLoaiSp(id)
            .then(res => {
              if (res.data.response && res.data.response.deletedCount !== 0) {
                window.location.reload();
              }
            })
            .catch((e) => {
              console.log(e);
            })
        }
      })
      .catch((e) => {
        console.log(e);
      })
    // setLoaiSpList(loaiSpList.filter((item) => item.id !== id));
  };

  useEffect(() => {
    retrieveLoaiSp(page);
  }, []);

  useEffect(() => {
    setLoading(true);
    retrieveLoaiSp(page);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [page])

  const retrieveLoaiSp = (page) => {
    LoaiSpDataService.getAll(page)
      .then(res => {
        // console.log(res.data)
        let loaiSpList = res.data.loaiSp.map((item) => {
          return { ...item, id: item._id }
        })
        setData(res.data);
        setLoaiSpList(loaiSpList);
      })
      .catch((e) => {
        console.log(e);
      })
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    {
      field: "tenloaiSP",
      headerName: "Tên loại",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="categoryListUser">
            {params.row.tenloaiSP}
          </div>
        );
      },
    },
    { field: "mota", headerName: "Mô Tả", width: 400 },
    {
      field: "action",
      headerName: "Hành động",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/categoryproduct/" + params.row.id}>
              <RemoveRedEyeOutlined className="categoryListSee" />
            </Link>
            {/* <Link to={"/category/" + params.row.id}>
              <EditOutlined className="categoryListEdit"/>
            </Link> */}
            <Link to='/category'>
              <ClearOutlined
                className="categoryListDelete"
                onClick={() => handleDelete(params.row.id, params.row.tenloaiSP)}
              />
            </Link>

          </>
        );
      },
    },
  ];

  return (
    <div className="categoryList">
      <h2 className="nameTitle" >Danh sách loại sản phẩm</h2>
      <DataGrid
        rows={loaiSpList}
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
