Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

export function setToken(token) {
  const date = new Date().addDays(7);
  const obj = JSON.stringify({'token': token, 'date':date});
  localStorage.setItem("token", obj);
}

export function getToken() {
  const obj = localStorage.getItem("token");
  console.log(obj)
  if(obj){
    const {token, date} = JSON.parse(obj);
    const time = Date.parse(date);
    const now = new Date();
    if(now.getTime() > time){
      // clearToken();
      return undefined;
    }else{
      return token;
    }
  }
  return undefined;
}

export function clearToken() {
  return localStorage.removeItem("token");
}

export function setRecomendId(recomendId) {
  localStorage.setItem("recomendId", recomendId);
}

export function getRecomendId() {
  return localStorage.getItem("recomendId");
}

export function clearRecomendId() {
  return localStorage.removeItem("recomendId");
}

export function setUserInfo(userInfo) {
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
}

export function setKey(key) {
  localStorage.setItem("key", key);
}

export function getKey() {
  return localStorage.getItem("key");
}

export function setStop(stop) {
  localStorage.setItem("stop", stop);
}

export function clearStop() {
  return localStorage.removeItem("Stop");
}

export function getStop() {
  return localStorage.getItem("stop");
}

export function setfrist1(frist1) {
  localStorage.setItem("frist1", frist1);
}

export function getfrist1() {
  return localStorage.getItem("frist1");
}

export function clearfrist1() {
  return localStorage.removeItem("frist1");
}

export function setfrist2(frist2) {
  localStorage.setItem("frist2", frist2);
}

export function getfrist2() {
  return localStorage.getItem("frist2");
}
export function clearfrist2() {
  return localStorage.removeItem("frist2");
}

export function setfrist3(frist3) {
  localStorage.setItem("frist3", frist3);
}

export function getfrist3() {
  return localStorage.getItem("frist3");
}

export function setAgain(again) {
  localStorage.setItem("again", again);
}

export function getAgain() {
  return localStorage.getItem("again");
}
export function clearfrist3() {
  return localStorage.removeItem("frist3");
}


export function setKeyData(key) {
  localStorage.setItem("keydata", key);
}

export function getKeyData() {
  return localStorage.getItem("keydata");
}

export function getUserInfo() {
  return JSON.parse(localStorage.getItem("userInfo"));
}

export function clearUserInfo() {
  return localStorage.removeItem("userInfo");
}
