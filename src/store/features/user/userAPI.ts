import axios from "axios";

// A mock function to mimic making an async request for data
export function fetchUser() {
  return axios.get("https://jsonplaceholder.typicode.com/users");
}
