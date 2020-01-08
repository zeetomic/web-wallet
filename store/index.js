let token;
export const actions = {
  nuxtServerInit({commit}, {req}) {
    if (req) {
      if (!req.headers.cookie) {
        return;
      }
      const jwtCookie = req.headers.cookie
        .split(";")
        .find(c => c.trim().startsWith("jwt="));
      if (!jwtCookie) {
        return;
      }
      token = jwtCookie.split("=")[1];
    }
    commit("users/setToken", token);
  }

}