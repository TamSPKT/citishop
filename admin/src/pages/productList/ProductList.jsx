import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline, EditOutlined } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import SanphamDataService from "../../services/sanpham"

export default function ProductList() {
  const [data, setData] = useState({});
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
    SanphamDataService.getAll(page)
      .then(res => {
        // console.log(res.data);
        let sanphamList = res.data.sanpham.map((sp) => {
          return { ...sp, id: sp._id }
        })
        setData(res.data);
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
    { field: "id", headerName: "ID", width: 200 },
    {
      field: "tenSP",
      headerName: "Tên sản phẩm",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.hinhanh} alt="" />
            {params.row.name}
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
    // {
    //   field: "status",
    //   headerName: "Trạng thái",
    //   width: 120,
    //   renderCell: (params) => {
    //     return (
    //       <div className="productListItem">
    //         {params.row.tranhthai}
    //       </div>
    //     );
    //   },
    // },

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
    <div className="productList">
      <h2 className="nameTitle" >Danh sách sản phẩm</h2>
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
