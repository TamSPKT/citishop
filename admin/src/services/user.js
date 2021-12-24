import http from "../http-common";

class UserDataService {
  getAll(page = 0) {
    return http.get(`/users/?page=${page}`)
  }

  get(id) {
    return http.get(`/users/id/${id}`)
  }

  find(query, by = "username", page = 0) {
    return http.get(`/users/?${by}=${query}&page=${page}`);
  }

  createUser(data) {
    return http.post("/users/", data);
  }

  updateUser(data) {
    return http.put(`/users/id/${data._id}`, {
      tenloaiSP: data.tenloaiSP,
      mota: data.mota
    });
  }

  deleteUser(id) {
    return http.delete(`/users/id/${id}`);
  }
}

export default new UserDataService();