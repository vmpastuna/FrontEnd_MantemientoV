import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    //se comunica a traves del json
    "Content-type": "application/json"
  }
});