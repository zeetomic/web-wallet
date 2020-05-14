import Cookie from 'js-cookie';

export const setting = async function({req, redirect, $axios}) {
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
  try {
    let doc = await $axios.get("/get-documenttype", config)
    let user_profile = await $axios.get("/userprofile", config)
    return {
      user_profile: user_profile.data,
      doc: doc.data
    }
  }
  catch(e) {
    redirect('/login');
  }
}