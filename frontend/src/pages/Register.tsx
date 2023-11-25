import {
  Box,
  Grid,
  Stack,
  Typography,
  Button,
  Link as MuiLink,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  AlertColor,
  useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Logo from "../components/Logo";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Hero from "../components/Hero";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import User from "../interfaces/user";
import { useState, useContext, useEffect } from "react";
import Toast from "../components/Toast";
import { UserContext } from "../contexts/UserContext";
import { CountriesContext } from "../contexts/CountriesContext";
import { getCountries } from "../services/countries";
import { State } from "../interfaces/country";
import {
  userSchema,
  defaultUserRegistrationValues,
} from "../utils/validateUser";
import { saveUserRegistration } from "../services/users";

const years = dayjs().subtract(14, "year").subtract(1, "day");

function Register() {
  const [toastConfig, setToastConfig] = useState({
    open: false,
    message: "",
    type: "success" as AlertColor,
  });
  const theme = useTheme();
  const { setUser } = useContext(UserContext);
  const { countries, setCountries } = useContext(CountriesContext);
  const navigate = useNavigate();
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<String[]>([]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await getCountries();
      const { data } = await response.json();

      setCountries(data);
    } catch (error) {
      setToastConfig({
        ...toastConfig,
        open: true,
        message: "An unexpected error occured. Please try again",
        type: "error",
      });
    }
  };

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultUserRegistrationValues,
    resolver: zodResolver(userSchema),
  });

  const handleRegister = (user: User) => {
    saveUserRegistration(user)
      .then((response) => response.json())
      .then((result) => {
        if (result.message) {
          setToastConfig({
            ...toastConfig,
            open: true,
            message: result.message,
            type: "info",
          });
          setTimeout(() => {
            navigate("/view");
          }, 1500);
        } else {
          setToastConfig({
            ...toastConfig,
            open: true,
            message: "You have succesfully registered.",
          });
          setUser(result.data);
          navigate("/info");
        }
      })
      .catch(() => {
        setToastConfig({
          ...toastConfig,
          open: true,
          message: "An unexpected error occured. Please try again",
          type: "error",
        });
      });
  };

  return (
    <Box component="main">
      <Grid container>
        <Grid xs={12} lg={6} item>
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
              position: "relative",
              zIndex: 100,
            }}
          >
            <Box
              sx={{
                maxWidth: 550,
                px: 3,
                width: "100%",
                py: "125px",
              }}
            >
              <Stack spacing={1} sx={{ mb: 3 }}>
                <Typography variant="h4">Register</Typography>
                <Typography color="text.secondary" variant="body2">
                  Already registered? &nbsp;
                  <MuiLink
                    component={Link}
                    to={"/view"}
                    underline="hover"
                    variant="subtitle2"
                  >
                    View
                  </MuiLink>
                </Typography>
              </Stack>
              <form noValidate onSubmit={handleSubmit(handleRegister)}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="First Name"
                    {...register("firstName")}
                  />
                  <TextField
                    fullWidth
                    label="Last Name"
                    {...register("lastName")}
                  />
                  <TextField
                    fullWidth
                    label="E-Mail"
                    {...register("email")}
                    type="email"
                  />
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Country
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      {...register("country")}
                      label="Country"
                      sx={{
                        "& fieldset": {
                          boxShadow: "none !important",
                        },
                        "& .Mui-focused fieldset": {
                          borderWidth: "3px !important",
                        },
                      }}
                    >
                      <MenuItem value={""}></MenuItem>
                      {Array.isArray(countries) &&
                        countries.map((country) => (
                          // @ts-ignore
                          <MenuItem
                            value={country?.name}
                            onClick={() => setStates(country.states)}
                          >
                            {country.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">State</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="State"
                      {...register("state")}
                      sx={{
                        "& fieldset": {
                          boxShadow: "none !important",
                        },
                      }}
                    >
                      <MenuItem value={""}></MenuItem>
                      {Array.isArray(states) &&
                        states.map((s) => (
                          // @ts-ignore
                          <MenuItem
                            value={s?.name}
                            onClick={() => setCities(s.cities)}
                          >
                            {s.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">City</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="State"
                      {...register("city")}
                      sx={{
                        "& fieldset": {
                          boxShadow: "none !important",
                        },
                      }}
                    >
                      <MenuItem value={""}></MenuItem>
                      {Array.isArray(cities) &&
                        cities.map((city) => (
                          // @ts-ignore
                          <MenuItem key={city} value={city}>
                            {city}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                  <FormControl
                    sx={{
                      paddingLeft: "14px",
                    }}
                  >
                    <FormLabel id="demo-radio-buttons-group-label">
                      Gender
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      row
                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio {...register("gender")} />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio {...register("gender")} />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio {...register("gender")} />}
                        label="Other"
                      />
                    </RadioGroup>
                  </FormControl>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="Date of Birth"
                        maxDate={years}
                        onChange={(date) => {
                          if (date?.toISOString()) {
                            setValue("dateOfBirth", date?.toISOString());
                          }
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Stack>
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                  disabled={Object.keys(errors).length > 0}
                >
                  Register
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
            [theme.breakpoints.down("lg")]: {
              paddingTop: "820px",
            },
          }}
          item
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

export default Register;
