import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import Typography from "@material-ui/core/Typography";

import AxiosService from "../../utils/axiosService";

export default class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      user: JSON.parse(localStorage.getItem("profileObj")),
      token: localStorage.getItem("token"),
      isAuthenticated: localStorage.getItem("isAuthenticated")
    };
    this.googleResponse = this.googleResponse.bind(this);
  }

  logout = () => {
    this.setState({ isAuthenticated: false, token: "", user: null });
    localStorage.removeItem("profileObj");
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
  };
  onFailure = error => {
    alert(error);
  };

  async googleResponse(response) {
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
    localStorage.setItem("token", data.data.access_token);
    localStorage.setItem("profileObj", JSON.stringify(response.profileObj));
    localStorage.setItem("isAuthenticated", true);
    this.setState({
      isAuthenticated: true,
      user: response.profileObj,
      token: data.data.access_token
    });
  }

  render() {
    let content = !!this.state.isAuthenticated ? (
      <div>
        <Typography variant="h3" gutterBottom>
          Authenticated
        </Typography>
        <Typography variant="h6" gutterBottom>
          Hello {this.state.user.name}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Your email is {this.state.user.email}
        </Typography>
        <img src={this.state.user.imageUrl} alt="Avatar" />
        <div>
          <button onClick={this.logout} className="button">
            Log out
          </button>
        </div>
      </div>
    ) : (
      <div>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={this.googleResponse}
          onFailure={this.onFailure}
        />
      </div>
    );
    return <div align="center">{content}</div>;
  }
}
