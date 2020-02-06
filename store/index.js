import cookieparser from "cookieparser";

export const actions = {
  async nuxtServerInit ({ commit }, { req }) {
    if(!req.headers.cookie) return;

    const parsed = cookieparser.parse(req.headers.cookie);
    const token = parsed.jwt;

    if(!token) return;
    await commit('users/setToken', token);
  }
}
