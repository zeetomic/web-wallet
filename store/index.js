import cookieparser from "cookieparser";

let token;
export const actions = {
  async nuxtServerInit({commit}, {req}) {
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
      await commit("users/setToken", token);
    }
  }
  // async nuxtServerInit({ commit }, { req }) {
  //   if (process.server && process.static) return;
  //   if (!req.headers.cookie) return;

  //   const parsed = cookieparser.parse(req.headers.cookie);
  //   const accessTokenCookie = parsed.jwt;

  //   if (!accessTokenCookie) return;
  //   await commit("users/setToken", accessTokenCookie);
  // }
}