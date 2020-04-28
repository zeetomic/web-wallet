import Cookie from 'js-cookie';

export const userprofile = async function() {
  let token;
  const req = this.$nuxt.context.req;
  if (process.server) {
    const jwtCookie = req.headers.cookie
      .split(";")
      .find(c => c.trim().startsWith("jwt="));
    if (!jwtCookie) {
      return;
    }
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
  await this.$axios.get(process.env.baseApi + "/userprofile", config)
    .then((res) => {
      this.user_profile = res.data
    })
    .catch(() => {
      this.$router.push('/login');
    })
}