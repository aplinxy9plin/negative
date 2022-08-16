import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Backdrop from "@mui/material/Backdrop";
import { Context } from "../context/Context";
import { login, register } from "../utils/api";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate, useLocation } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token, setToken } = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isLoginPage = location.pathname.split("/")[1] === "login";

  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  const submit = async () => {
    setIsLoading(true);

    // check for backdrop
    // await new Promise(r => setTimeout(r, 1000));
    if (isLoginPage) {
      const data = await login(username, password);
      setIsLoading(false);
      if (data) {
        if (data.status === 200) {
          setToken(data.data.token);
        } else {
          if (data.data.error) {
            alert(data.data.error);
          } else {
            alert("Something went wrong");
          }
        }
      } else {
        alert("Something went wrong");
      }
    } else {
      const data = await register(username, password);
      if (data) {
        if (data.status === 200) {
          alert(data.data.message);
          navigate("/login");
        } else {
          if (data.data.message) {
            alert(data.data.message);
          } else {
            alert("Something went wrong");
          }
        }
      } else {
        alert("Something went wrong");
      }
    }
    setIsLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const CardHeader = () => (
    <Typography variant="h5" component="div">
      {isLoginPage ? "Login" : "Register"}/
      <Link href={isLoginPage ? "/register" : "/login"}>
        {!isLoginPage ? "Login" : "Register"}
      </Link>
    </Typography>
  );

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Container maxWidth="sm">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <CardHeader />
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                onChange={handleChange}
                name="username"
                label="Username"
                variant="outlined"
              />
              <TextField
                onChange={handleChange}
                name="password"
                label="Password"
                variant="outlined"
              />
            </Box>
          </CardContent>
          <CardActions>
            <Button onClick={submit} size="large">
              {isLoginPage ? "Login" : "Register"}
            </Button>
          </CardActions>
        </Card>
      </Container>
      {isLoading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </Grid>
  );
};

export default Login;
