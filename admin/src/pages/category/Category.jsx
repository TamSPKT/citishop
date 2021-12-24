import { Link, useLocation } from "react-router-dom";
import "./category.css";
import Chart from "../../components/chart/Chart"
import { categoryData } from "../../dummyData"
import { CloudUpload } from "@material-ui/icons";
import { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline, EditOutlined } from "@material-ui/icons";

import LoaiSpDataService from "../../services/loaiSp"
import { useEffect } from "react";

export default function Category() {
  const [data, setData] = useState({});

  const location = useLocation();
  const id = location.pathname.split("/")[1] === 'categoryproduct' ? location.pathname.split("/")[2] : undefined;
  console.log("CategoryID", id)

  const [sanphamList, setSanphamList] = useState([]);

  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleDelete = (id) => {
    setSanphamList(sanphamList.filter((item) => item._id !== id));
  };

  useEffect(() => {
    retrieveProducts(page);
  }, []);

  useEffect(() => {
    setLoading(true);
    retrieveProducts(page);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [page]);

  const retrieveProducts = (page) => {
    LoaiSpDataService.getByID(id, page)
      .then(res => {
        // console.log(res.data);
        let sanphamList = res.data.sanphamList.map((sp) => {
          return { ...sp, id: sp._id }
        })
        setData({
          total_results: res.data.total_results,
          entries_per_page: res.data.entries_per_page
        });
        setSanphamList(sanphamList);
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
    {
      field: "id", headerName: "ID", width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.id}
          </div>
        );
      },
    },
    {
      field: "tenSP",
      headerName: "Tên sản phẩm",
      width: 700,
      renderCell: (params) => {
        // console.log("params", params.row)
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.hinhanh} alt="" />
            {params.row.tenSP}
          </div>
        );
      },
    },
    {
      field: "loaiSP_id", headerName: "Loại SP ID", width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.loaiSP_id}
          </div>
        );
      },
    },
    {
      field: "loai", headerName: "Loại", width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.loai}
          </div>
        );
      },
    },
    {
      field: "gia",
      headerName: "Giá",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.gia}
          </div>
        );
      },
    },
    {
      field: "soluong", headerName: "Số lượng", width: 120,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row.soluong}
          </div>
        );
      },
    },
    {
      field: "giam", headerName: "Giảm giá", width: 120,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row['%giam']}
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
          <div className="productListItem">
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
            <Link to={"/product/" + params.row.id}>
              <EditOutlined className="productListEdit" />
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="category">
      <div className="categoryTitleContainer">
        <h1 className="categoryTitle">Danh sách sản phẩm theo loại</h1>
        <Link to="/newcategory">
          <button className="categoryAddButton">Thêm loại sản phẩm</button>
        </Link>
      </div>
      <div className="categoryBottom">
        <form className="categoryForm">
          <div className="newcategoryItem">
            <label>Mã loại</label>
            <input type="text" placeholder="Id: 123" />
          </div>
          <div className="newcategoryItem">
            <label>Tên loại</label>
            <input type="text" placeholder="Id: 123" />
          </div>
          <div className="newcategoryItem">
            <label>Mô tả</label>
            <input type="text" placeholder="Nhập loại" />
          </div>
          <div className="categoryUpdate">
            <button className="categoryButton">Cập nhật</button>
          </div>


        </form>
      </div>
      <DataGrid
        rows={sanphamList}
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
