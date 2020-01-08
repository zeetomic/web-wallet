let token;
export const actions = {
  // async nuxtServerInit({commit}, {req}) {
  //   if ( !req && !req.headers && !req.headers.cookie) {
  //     return;
  //   }
  //   // Get token from cookie
  //   else {
  //     const jwtCookie = req.headers.cookie
  //       .split(";")
  //       .find(c => c.trim().startsWith("jwt="));
  //     if (!jwtCookie){ return }
  //     token = jwtCookie.split("=")[1];
  //   await commit('users/setToken', token);
  //   }
  // },
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