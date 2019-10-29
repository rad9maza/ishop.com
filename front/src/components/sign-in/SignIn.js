import React, { useMemo, useState } from "react";
import GoogleLogin from "react-google-login";
import Typography from "@material-ui/core/Typography";

import AxiosService from "../../utils/axiosService";

export default function SignIn() {
  const [state, setState] = useState({
    user: JSON.parse(localStorage.getItem("user")),
    token: localStorage.getItem("token")
  });

  const logout = () => {
    setState({ token: "", user: null });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const onFailure = error => {
    alert(error);
  };

  async function googleResponse(response) {
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
    setState({
      user: response.profileObj,
      token: data.access_token
    });
  }

  let content = useMemo(
    () =>
      !!state.user ? (
        <div>
          <Typography variant="h3" gutterBottom>
            Authenticated
          </Typography>
          <Typography variant="h6" gutterBottom>
            Hello {state.user.name}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Your email is {state.user.email}
          </Typography>
          <img src={state.user.imageUrl} alt="Avatar" />
          <div>
            <button onClick={logout} className="button">
              Log out
            </button>
          </div>
        </div>
      ) : (
        <div>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={googleResponse}
            onFailure={onFailure}
          />
        </div>
      ),
    [state.user]
  );
  return <div align="center">{content}</div>;
}
