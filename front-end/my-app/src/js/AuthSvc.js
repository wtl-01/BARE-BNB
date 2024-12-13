export function getToken() {
  return localStorage.getItem("accessToken");
}

export function getUsername() {
  return localStorage.getItem("username");
}

export function isAuthenticated() {
  return localStorage.getItem("isAuthenticated");
}
