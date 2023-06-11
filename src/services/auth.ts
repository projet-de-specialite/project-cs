import axios from "axios";

const API_URL = process.env.REACT_APP_AUTH_URL;

class AuthService {
  login(username: string, password: string) {
    console.log(API_URL + "signin");
    return axios
      .post(API_URL + "signin", {
        username,
        password,
      })
      .then((response) => {
        console.log("login", response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        // if (response.data.accessToken) {
        //   localStorage.setItem("user", JSON.stringify(response.data));
        // }

        return response.data;
      })
      .catch((error) => {
        console.error("Login error:", error);
        throw error;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username: string, email: string, password: string) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }

  getCurrentUser(): any {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();
