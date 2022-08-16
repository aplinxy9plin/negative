import React, { useEffect, useState, useContext } from "react";
import { about } from "../utils/api";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/Context";

type UserDataType = {
  about?: string | undefined;
  avatar?: string | undefined;
  id: number;
  username?: "asdlfasdf";
} | null;

const Main = () => {
  const navigate = useNavigate();
  const { token } = useContext(Context);
  const [data, setData] = useState<UserDataType>(null);

  useEffect(() => {
    if (token) {
      about().then((userData) => {
        if (userData?.status === 200) {
          setData(userData.data.data);
        } else if (userData?.status === 401) {
          alert(userData.data.message);
          navigate("/login", { replace: true });
          localStorage.removeItem("token");
        } else {
          alert(userData?.data.message);
        }
      });
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate, token]);

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
        <Card>
          {data && (
            <CardContent>
              <Stack direction="row" spacing={2}>
                <Avatar alt="Remy Sharp" src={data?.avatar} />
                <Typography variant="h5" component="div">
                  {data.username}
                </Typography>
              </Stack>
              <Typography variant="caption" component="div">
                {data.about}
              </Typography>
            </CardContent>
          )}
        </Card>
      </Container>
    </Grid>
  );
};

export default Main;
