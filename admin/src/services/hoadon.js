import http from "../http-common";

class HoadonDataService {
  getAll(page = 0) {
    return http.get(`/hoadon/?page=${page}`)
  }

  get(id) {
    return http.get(`/hoadon/id/${id}`)
  }

  find(query, by = "username", page = 0) {
    return http.get(`/hoadon/?${by}=${query}&page=${page}`);
  }

  createHoadon(data) {
    return http.post("/hoadon/", data);
  }

  updateHoadon(data) {
    return http.put(`/hoadon/id/${data._id}`, {
      trangThai: data.trangThai,
    });
  }

  deleteHoadon(id) {
    return http.delete(`/hoadon/id/${id}`);
  }
}

export default new HoadonDataService();