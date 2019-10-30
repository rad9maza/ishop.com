import React, { useMemo, useState } from "react";
import GoogleLogin from "react-google-login";
import Typography from "@material-ui/core/Typography";

import { useAuth, useGoogleResponse } from "../../utils/customHooks";

export default function SignIn() {
  const [state, setState] = useState(useAuth());

  const logout = () => {
    setState({ token: "", user: null });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const onFailure = error => {
    alert(error);
  };

  async function googleResponse(response) {
    setState(await useGoogleResponse(response));
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
