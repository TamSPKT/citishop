// Helper file to set up axios
import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000/api/v1/",
  headers: { // Set headers
    "Content-type": "application/json"
  }
});