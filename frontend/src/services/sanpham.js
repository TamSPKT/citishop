import http from "../http-common";

class SanphamDataService {
  getAll(page = 0) {
    return http.get(`/sanpham/?page=${page}`)
  }

  get(id) {
    return http.get(`/sanpham/id/${id}`)
  }

  getHang() {
    return http.get(`/sanpham/hang/`)
  }

  find(query, by = "tenSP", page = 0) {
    return http.get(`/sanpham/?${by}=${query}&page=${page}`);
  }

  createSanpham(data) {
    return http.post("/sanpham/", data);
  }

  updateSanpham(data) {
    return http.put(`/sanpham/id/${data._id}`, {
      tenSP: data.tenSP,
      loai: data.loai,
      gia: data.gia,
      hinhanh: data.hinhanh,
      giam: data.giam,
      mota: data.mota,
      soluong: data.soluong,
      hang: data.hang,
      loaiSP_id: data.loaiSP_id,
    });
  }

  deleteSanpham(id) {
    return http.delete(`/sanpham/id/${id}`);
  }
}

export default new SanphamDataService();