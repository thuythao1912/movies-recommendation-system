import api from "./axios";
export default function callApi(endpoint, method, data) {
  return api({
    method: method,
    url: `/${endpoint}`,
    data: data
  }).catch(err => {
    console.log(err);
  });
}
