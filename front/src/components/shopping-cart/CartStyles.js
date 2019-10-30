import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  card: {
    display: "flex",
    minWidth: "30%"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 130
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 151
  }
}));
