import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

export default function Footer() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="http://ishop.com/">
        ishop
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}