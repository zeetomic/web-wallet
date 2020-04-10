import Cookie from 'js-cookie';

export const getBranches = function asyncData ({req, $axios, redirect}) {
  let token;
  if (req && process.server) {
    const jwtCookie = req.headers.cookie
      .split(";")
      .find(c => c.trim().startsWith("jwt="));
    if (!jwtCookie) return;
    token = jwtCookie.split("=")[1];
  }
  if (process.client) {
    token = Cookie.get("jwt");
  }
  const config = {
    headers: {
      Authorization: "Bearer " + token
    }
  };
  return $axios.get(process.env.baseApi + "/get-all-branches", config)
    .then((res) => {
      return { branch: res.data }
    })
    .catch((e) => {
      redirect({
        name: 'login'
      })
    })
}