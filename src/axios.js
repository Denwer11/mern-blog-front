import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:4444" });

axios.get("/posts");

export default instance;
