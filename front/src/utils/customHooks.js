import AxiosService from "./axiosService";

export async function useGoogleResponse(response) {
  const params = {
    grant_type: "social",
    client_id: 1,
    client_secret: "IZvNu58EPugyPgiWVO5OyiX0VyxRhfSGSDAKPTBE",
    provider: "google",
    access_token: response.accessToken
  };
  const { data } = await AxiosService.post("/oauth/token", params, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  localStorage.setItem("token", data.access_token);
  localStorage.setItem("user", JSON.stringify(response.profileObj));
  async function returner() {
    return {
      user: response.profileObj,
      token: data.access_token
    };
  }
  return returner();
}

export function useAuth() {
  return {
    user: JSON.parse(localStorage.getItem("user")),
    token: localStorage.getItem("token")
  };
}
