import { useState, type ReactNode } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  Link as RouterLink,
  useNavigate,
} from "react-router-dom";

import {
  Apple,
  Facebook,
  Google,
  Visibility,
  VisibilityOff,
  
} from "@mui/icons-material";

import { signInWithPopup , signInWithEmailAndPassword,} from "firebase/auth";
import { Controller, useForm } from "react-hook-form";

import loginIllustration from "../assets/login-illustration.svg";
import { auth, googleProvider } from "../config/firebase";

type LoginFormValues = {
  email: string;
  password: string;
};

type SocialButtonProps = {
  label: string;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

const green = "#85c67a";

const fieldStyles = {
  "& .MuiOutlinedInput-root": {
    minHeight: 48,
    borderRadius: 99,
    backgroundColor: "#ffffff",
    fontSize: 13,

    "& fieldset": {
      borderColor: "#919191",
    },

    "&:hover fieldset": {
      borderColor: "#333333",
    },

    "&.Mui-focused fieldset": {
      borderColor: green,
      borderWidth: 2,
    },
  },

  "& .MuiOutlinedInput-input": {
    paddingLeft: 2.5,
    paddingRight: 2.5,
    paddingTop: 1.4,
    paddingBottom: 1.4,
  },

  "& .MuiFormHelperText-root": {
    marginLeft: 2.5,
  },
};

function SocialButton({
  label,
  children,
  onClick,
  disabled,
}: SocialButtonProps) {
  return (
    <IconButton
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      sx={{
        width: 52,
        height: 52,
        backgroundColor: "#050505",
        color: "#ffffff",

        transition:
          "transform 160ms ease, background-color 160ms ease",

        "&:hover": {
          backgroundColor: "#272727",
          transform: "translateY(-2px)",
        },

        "&.Mui-disabled": {
          backgroundColor: "#555555",
          color: "#ffffff",
        },
      }}
    >
      {children}
    </IconButton>
  );
}

export function LoginPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [isGoogleLoading, setIsGoogleLoading] =
    useState(false);

  const [authError, setAuthError] =
    useState("");

  const {
    control,
    handleSubmit,

    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },

    mode: "onBlur",
  });

  const handleEmailLogin = async (
  values: LoginFormValues,
) => {
  setAuthError("");

  try {
    await signInWithEmailAndPassword(
      auth,
      values.email,
      values.password,
    );

    navigate("/token");
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message.includes(
          "auth/invalid-credential",
        )
      ) {
        setAuthError(
          "Incorrect email address or password.",
        );
      } else if (
        error.message.includes(
          "auth/invalid-email",
        )
      ) {
        setAuthError(
          "Please enter a valid email address.",
        );
      } else if (
        error.message.includes(
          "auth/too-many-requests",
        )
      ) {
        setAuthError(
          "Too many login attempts. Please try again later.",
        );
      } else {
        setAuthError(
          "Login failed. Please try again.",
        );
      }
    } else {
      setAuthError(
        "Login failed. Please try again.",
      );
    }
  }
};

  const handleGoogleLogin = async () => {
    setAuthError("");
    setIsGoogleLoading(true);

    try {
      await signInWithPopup(
        auth,
        googleProvider,
      );

      navigate("/token");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Google login failed.";

      setAuthError(message);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        display: "grid",

        gridTemplateColumns: {
          xs: "1fr",
          md: "0.9fr 1.1fr",
        },

        padding: {
          xs: 0,
          md: 3,
        },

        gap: {
          md: 2,
        },
      }}
    >
      {/*login  */}

      <Box
        component="main"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          paddingX: {
            xs: 3,
            sm: 7,
            md: 5,
          },

          paddingY: {
            xs: 5,
            md: 2,
          },
        }}
      >
        <Stack
          spacing={0}
          sx={{
            width: "100%",
            maxWidth: 410,
          }}
        >
          <Typography
            component="h1"
            sx={{
              fontSize: {
                xs: "2.35rem",
                sm: "2.75rem",
              },

              lineHeight: 1.1,
              fontWeight: 600,
              letterSpacing: "-0.045em",
              textAlign: "center",
              color: "#0a0a0a",
            }}
          >
            Welcome back !
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              marginTop: 1.5,
              marginBottom: 5,
              marginX: "auto",
              maxWidth: 345,
              fontSize: 13,
              lineHeight: 1.55,
              textAlign: "center",
            }}
          >
            Simplify your workflow and boost your
            productivity
            <br />

            with{" "}
            <Box
              component="span"
              sx={{
                fontWeight: 700,
                color: "#222222",
              }}
            >
              Tuga's App.
            </Box>{" "}
            Get started for free.
          </Typography>

          {authError && (
            <Alert
              severity="error"
              sx={{ marginBottom: 2 }}
            >
              {authError}
            </Alert>
          )}

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(
              handleEmailLogin,
            )}
          >
            <Stack spacing={1.5}>
              {/* Email  */}

              <Controller
                name="email"
                control={control}
                rules={{
                  required:
                    "Email address is required",

                  pattern: {
                    value:
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

                    message:
                      "Enter a valid email address",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Username "
                    type="email"
                    autoComplete="email"
                    error={Boolean(
                      errors.email,
                    )}
                    helperText={
                      errors.email?.message
                    }
                    size="small"
                    fullWidth
                    sx={fieldStyles}
                  />
                )}
              />

              {/* Password  */}

              <Controller
                name="password"
                control={control}
                rules={{
                  required:
                    "Password is required",

                  minLength: {
                    value: 6,

                    message:
                      "Password must contain at least 6 characters",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Password"

                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }

                    autoComplete="current-password"

                    error={Boolean(
                      errors.password,
                    )}

                    helperText={
                      errors.password?.message
                    }

                    size="small"
                    fullWidth
                    sx={fieldStyles}

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
                                  (value) =>
                                    !value,
                                )
                              }

                              edge="end"
                              size="small"
                            >
                              {showPassword ? (
                                <VisibilityOff fontSize="small" />
                              ) : (
                                <Visibility fontSize="small" />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                )}
              />

              <Link
                href="#"
                underline="hover"
                sx={{
                  alignSelf: "flex-end",
                  color: "#111111",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                Forgot Password?
              </Link>

              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                fullWidth

                sx={{
                  marginTop: "8px !important",
                  minHeight: 48,
                  backgroundColor: "#050505",
                  borderRadius: 99,
                  boxShadow: "none",
                  fontSize: 14,
                  textTransform: "none",

                  "&:hover": {
                    backgroundColor: "#202020",
                    boxShadow: "none",
                  },
                }}
              >
                {isSubmitting
                  ? "Logging in..."
                  : "Login"}
              </Button>
            </Stack>
          </Box>

          <Divider
            sx={{
              marginY: 4,
              color: "#777777",
              fontSize: 12,

              "&::before, &::after": {
                borderColor: "#dedede",
              },
            }}
          >
            or continue with
          </Divider>

          {/* Social buttons */}

          <Stack
            direction="row"
            spacing={3}
            sx={{
              alignSelf: "center",
              justifyContent: "center",
            }}
          >
            <SocialButton
              label="Continue with Google"
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
            >
              {isGoogleLoading ? (
                <CircularProgress
                  size={18}
                  color="inherit"
                />
              ) : (
                <Google fontSize="small" />
              )}
            </SocialButton>

            <SocialButton label="Continue with Apple">
              <Apple fontSize="small" />
            </SocialButton>

            <SocialButton label="Continue with Facebook">
              <Facebook fontSize="small" />
            </SocialButton>
          </Stack>

          <Typography
            sx={{
              marginTop: 8,
              textAlign: "center",
              color: "#555555",
              fontSize: 12.5,
            }}
          >
            Not a member?{" "}

           <Link
  component={RouterLink}
  to="/register"
  underline="hover"
  sx={{
    color: green,
    fontWeight: 700,
  }}
>
  Register now
</Link>
          </Typography>
        </Stack>
      </Box>

      {/* Right  */}

      <Box
        component="aside"
        sx={{
          display: {
            xs: "none",
            md: "flex",
          },

          minHeight: "calc(100vh - 48px)",
          borderRadius: 5,
          backgroundColor: "#f1f8ee",
          alignItems: "center",
          justifyContent: "center",
          padding: 5,
          overflow: "hidden",
        }}
      >
        <Stack
          sx={{
            width: "100%",
            maxWidth: 590,
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={loginIllustration}
            alt="Person organizing tasks"

            sx={{
              width: "100%",
              maxWidth: 520,
              height: "auto",
            }}
          />

          <Stack
            direction="row"
            spacing={0.7}
            sx={{
              marginTop: 1.5,
              marginBottom: 3,
              alignSelf: "center",
            }}
          >
            <Box
              sx={{
                width: 7,
                height: 7,
                borderRadius: 99,
                backgroundColor: "#d5ded2",
              }}
            />

            <Box
              sx={{
                width: 7,
                height: 7,
                borderRadius: 99,
                backgroundColor: "#d5ded2",
              }}
            />

            <Box
              sx={{
                width: 18,
                height: 7,
                borderRadius: 99,
                backgroundColor: "#111111",
              }}
            />
          </Stack>

          <Typography
            sx={{
              fontSize: {
                md: 22,
                lg: 25,
              },

              lineHeight: 1.35,
              textAlign: "center",
              color: "#171717",
            }}
          >
            Make your work easier and organized
            <br />

            with{" "}
            <Box
              component="span"
              sx={{ fontWeight: 800 }}
            >
              Tuga's App
            </Box>
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}

export default LoginPage;