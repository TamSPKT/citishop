import http from "../http-common";

class LoaiSpDataService {
  getAll(page = 0) {
    return http.get(`/loaiSP/?page=${page}`)
  }

  getByID(id, page = 0) {
    return http.get(`/loaiSP/id/${id}/?page=${page}`)
  } 

  get(id) {
    return http.get(`/loaiSP/id/${id}`)
  }

  find(query, by = "tenloaiSP", page = 0) {
    return http.get(`/loaiSP/?${by}=${query}&page=${page}`);
  }

  createLoaiSp(data) {
    return http.post("/loaiSP/", data);
  }

  updateLoaiSp(data) {
    return http.put(`/loaiSP/id/${data._id}`, {
      tenloaiSP: data.tenloaiSP,
      mota: data.mota
    });
  }

  deleteLoaiSp(id) {
    return http.delete(`/loaiSP/id/${id}`);
  }
}

export default new LoaiSpDataService();