import Cookie from 'js-cookie';

export const portfolio = async function() {
  let token;
  const req = this.$nuxt.context.req;
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
  await this.$axios.get(process.env.baseApi + "/portforlio", config)
    .then(async(res) => {
      this.portfolio = await res.data;
      if(!this.portfolio.error) {
        return await this.fillData();
      }
    })
    .catch(() => {
      this.$router.push('/login');
    })
}