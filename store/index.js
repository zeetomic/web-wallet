export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    if (!req.headers.cookie) return;
  // Get token from header
    const jwtCookie = req.headers.cookie
      .split(";")
      .find(c => c.trim().startsWith("jwt="));
    if (!jwtCookie){return}
    const token = jwtCookie.split("=")[1];
  // Token Header
    const config = {
      headers: {
        "Authorization": "Bearer "+ token,
      }
    };
    if(!token) return;
    await commit('users/set_token', token);
  }
}