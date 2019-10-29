import React from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        ishop
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
