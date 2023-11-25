import {
  Box,
  Grid,
  Stack,
  Typography,
  Button,
  Link as MuiLink,
  TextField,
  AlertColor,
  useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import Hero from "../components/Hero";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import Toast from "../components/Toast";
import { fetchRegisteredInfoByEmail } from "../services/users";

function View() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const theme = useTheme();
  const [toastConfig, setToastConfig] = useState({
    open: false,
    message: "",
    type: "success" as AlertColor,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(
      z.object({
        email: z.string().min(5).max(255),
      })
    ),
  });

  const handleGetRegisteredDetails = (info: { email: string }) => {
    fetchRegisteredInfoByEmail(info)
      .then((response) => response.json())
      .then((result) => {
        setToastConfig({
          ...toastConfig,
          open: true,
          message: "Successfully fetched.",
        });

        setUser(result.data);
        setTimeout(() => {
          navigate("/info");
        }, 500);
      })
      .catch((err) => {
        console.log("Error Occured: ", err.message);
      });
  };

  return (
    <Box component="main">
      <Grid container>
        <Grid xs={12} lg={6}>
          <Box
            component="header"
            sx={{ left: 0, top: 0, p: 3, position: "fixed", width: "100%" }}
          >
            <Box
              component={Link}
              to="/"
              sx={{
                display: "inline-block",
                height: 32,
                width: 32,
              }}
            >
              <Logo />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              position: "relative",
              zIndex: 100,
              [theme.breakpoints.down("lg")]: {
                paddingY: "200px",
              },
              [theme.breakpoints.down("md")]: {
                paddingY: "150px",
              },
            }}
          >
            <Box
              sx={{
                maxWidth: 550,
                px: 3,
                width: "100%",
              }}
            >
              <Stack spacing={1} sx={{ mb: 3 }}>
                <Typography variant="h4">Registered Info</Typography>
                <Typography color="text.secondary" variant="body2">
                  Don't have registered? &nbsp;
                  <MuiLink
                    component={Link}
                    to={"/register"}
                    underline="hover"
                    variant="subtitle2"
                  >
                    Register
                  </MuiLink>
                </Typography>
              </Stack>
              <form
                noValidate
                onSubmit={handleSubmit(handleGetRegisteredDetails)}
              >
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="E-Mail"
                    {...register("email")}
                    type="email"
                  />
                </Stack>
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                  disabled={Object.keys(errors).length > 0}
                >
                  Get Registered Details
                </Button>
              </form>
            </Box>
          </Box>
        </Grid>
        <Grid
          xs={12}
          lg={6}
          sx={{
            background:
              "radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)",
            color: "white",
            position: "relative",
            minHeight: `${window.innerHeight}px`,
          }}
        >
          <Hero />
        </Grid>
      </Grid>
      <Toast
        {...toastConfig}
        handleClose={() => setToastConfig({ ...toastConfig, open: false })}
      />
    </Box>
  );
}

export default View;
