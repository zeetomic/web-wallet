import Cookie from 'js-cookie';

export const portfolio = function({req, redirect, $axios}) {
  let token;
  if (process.server) {
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
  return $axios.get("/portforlio", config)
    .then((res) => {
      return {
        portfolio: res.data,
      }
    })
    .catch((e) => {
      redirect('/login');
    })
}