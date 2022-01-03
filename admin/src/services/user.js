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
    return http.put(`/users/name/${data.username}`, {
      password: data.password,
      email: data.email,
      sdt: data.sdt,
      gioitinh: data.gioitinh,
      ngaysinh: data.ngaysinh,
      diachi: data.diachi,
      phanquyen: data.phanquyen,
    });
  }

  deleteUser(username) {
    return http.delete(`/users/name/${username}`);
  }
}

export default new UserDataService();