import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { Google, Visibility, VisibilityOff } from "@mui/icons-material";

import { signInWithPopup } from "firebase/auth";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../config/firebase";

type LoginFormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export function LoginPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [showDemoMessage, setShowDemoMessage] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onBlur",
  });

  const handleEmailLogin = async (values: LoginFormValues) => {
    console.log("Validated values:", values);
    setShowDemoMessage(true);
  };

  const handleGoogleLogin = async () => {
    setAuthError("");
    setIsGoogleLoading(true);

    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/token");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Google login failed.";
      setAuthError(errorMessage);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "1fr 1fr",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: {
            xs: 2.5,
            sm: 5,
          },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 500,
            padding: {
              xs: 2,
              sm: 4,
            },
            backgroundColor: "transparent",
          }}
        >
          <Stack spacing={1}>
            <Box>
       <Typography
  variant="h4"
  sx={{
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Poppins, sans-serif",
    fontSize: "3.2rem",
  }}
>
  Welcome back!
</Typography>

         
<Typography
  color="text.secondary"
  sx={{
    marginTop: 1,
    marginBottom: 5,
    paddingX: 3,
    textAlign: "center",
  }}
>
  <Box component="div" sx={{ whiteSpace: "nowrap" }}>
    Simplify your workflow and boost your productivity
  </Box>

  <Box component="div" sx={{ whiteSpace: "nowrap", }}>
    with{" "}
    <Box component="span" sx={{ fontWeight: "bold" }}>
      Tugas's
    </Box>{" "}
    App. Get started for free.
  </Box>
</Typography>
           
            </Box>

            {authError && <Alert severity="error">{authError}</Alert>}

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(handleEmailLogin)}
            >
              <Stack spacing={1}>
  {/* Email field */}
  <Controller
    name="email"
    control={control}
    rules={{
      required: "Email address is required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Enter a valid email address",
      },
    }}
    render={({ field }) => (
      <TextField
        {...field}
        label="Email address"
        type="email"
        autoComplete="email"
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#22c55e",
              borderWidth: "2px",
            },
          },

          "& .MuiOutlinedInput-input": {
            paddingLeft: "16px",
          },

          "& .MuiInputLabel-root.Mui-focused": {
            color: "#22c55e",
          },
        }}
      />
    )}
  />

  {/* Password field */}
  <Controller
    name="password"
    control={control}
    rules={{
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must contain at least 6 characters",
      },
    }}
    render={({ field }) => (
      <TextField
        {...field}
        label="Password"
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#22c55e",
              borderWidth: "2px",
            },
          },

          "& .MuiOutlinedInput-input": {
            paddingLeft: "16px",
          },

          "& .MuiInputLabel-root.Mui-focused": {
            color: "#22c55e",
          },
        }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  onClick={() =>
                    setShowPassword(
                      (currentValue) => !currentValue
                    )
                  }
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    )}
  />

 {/* Forgot password */}
<Link
  href="#"
  underline="hover"
  sx={{
    fontWeight: "bold",
    fontSize: 12,
    color: "black",
    textAlign: "right",
    alignSelf: "flex-end",
    cursor: "pointer",
    marginTop: "40px",
  }}
>
  Forgot password?
</Link>

  {/* Login button */}
  <Button
    type="submit"
    variant="contained"
    size="large"
    disabled={isSubmitting}
    fullWidth
    sx={{
      borderRadius: 2,
      textTransform: "none",
      fontWeight: "bold",
      marginTop: 2,
      backgroundColor: "black",

      "&:hover": {
        backgroundColor: "#16a34a",
      },
    }}
  >
    {isSubmitting ? "Logging in..." : "Login"}
  </Button>
</Stack>
            </Box>

            <Divider>or continue with</Divider>

            <Button
              variant="outlined"
              color="inherit"
              startIcon={
                isGoogleLoading ? <CircularProgress size={19} /> : <Google />
              }
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
            >
              Continue with Google
            </Button>

            <Typography align="center" color="text.secondary">
              Not a member? {""}
              <Link href="#" sx={{ fontWeight: 700,
                color: "green",
               }}>
                Register now
              </Link>
            </Typography>
          </Stack>
        </Paper>
      </Box>
     


      <Box
        sx={{
          display: {
            xs: "none",
            md: "flex",
          },
          position: "relative",
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
          padding: 8,
          color: "white",
          background:
            "linear-gradient(145deg, #5548e8 0%, #7c65ff 52%, #9b8aff 100%)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: 310,
            height: 310,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.09)",
            top: -90,
            left: -80,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            width: 420,
            height: 420,
            borderRadius: "50%",
            border: "65px solid rgba(255,255,255,0.08)",
            bottom: -170,
            right: -140,
          }}
        />

        <Stack
          spacing={3}
          sx={{
            position: "relative",
            zIndex: 1,
            maxWidth: 480,
          }}
        >
        

          <Typography variant="h3" sx={{ lineHeight: 1.12 }}>
            Start your journey with us.
          </Typography>

          <Typography
            sx={{
              fontSize: 18,
              color: "rgba(255,255,255,0.82)",
              lineHeight: 1.7,
            }}
          >
            Sign in to continue and discover a simple, secure experience
            designed around you.
          </Typography>
        </Stack>
      </Box>

     

      <Snackbar
        open={showDemoMessage}
        autoHideDuration={4500}
        onClose={() => setShowDemoMessage(false)}
      >
        <Alert
          severity="info"
          variant="filled"
          onClose={() => setShowDemoMessage(false)}
        >
          Validation passed. Email/password backend login is outside this
          assessment.
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default LoginPage;
