const auth = (user) => {
  if (!user) {
    // console.log("ログインしていません");
    // console.log(user);
    window.location.href = "/";
    return false;
  }
  // console.log("ログイン済");
  return true;
};

export default auth;
