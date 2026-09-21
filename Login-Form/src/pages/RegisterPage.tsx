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
  Apple,
  Close,
  Facebook,
  Google,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

import {
  Controller,
  useForm,
} from "react-hook-form";

import {
  Link as RouterLink,
  useNavigate,
} from "react-router-dom";

import loginIllustration from "../assets/login-illustration.svg";

import {
  auth,
  googleProvider,
} from "../config/firebase";

type RegisterFormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
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

        "&:hover": {
          backgroundColor: "#272727",
          transform: "translateY(-2px)",
        },

        "&.Mui-disabled": {
          backgroundColor: "#555555",
          color: "#ffffff",
        },

        transition:
          "transform 160ms ease, background-color 160ms ease",
      }}
    >
      {children}
    </IconButton>
  );
}

export function RegisterPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [
    isGoogleLoading,
    setIsGoogleLoading,
  ] = useState(false);

  const [registerError, setRegisterError] =
    useState("");

  const [showSuccess, setShowSuccess] =
    useState(false);

  const {
    control,
    handleSubmit,
    watch,

    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    mode: "onBlur",
  });

  const passwordValue = watch("password");

  const handleRegister = async (
    values: RegisterFormValues,
  ) => {
    setRegisterError("");

    try {
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password,
        );

      await updateProfile(
        userCredential.user,
        {
          displayName: values.fullName,
        },
      );

      setShowSuccess(true);

      setTimeout(() => {
        navigate("/token");
      }, 800);
    } catch (error) {
      if (error instanceof Error) {
        if (
          error.message.includes(
            "auth/email-already-in-use",
          )
        ) {
          setRegisterError(
            "This email address is already registered.",
          );
        } else if (
          error.message.includes(
            "auth/weak-password",
          )
        ) {
          setRegisterError(
            "Please enter a stronger password.",
          );
        } else if (
          error.message.includes(
            "auth/invalid-email",
          )
        ) {
          setRegisterError(
            "Please enter a valid email address.",
          );
        } else {
          setRegisterError(error.message);
        }
      } else {
        setRegisterError(
          "Registration failed. Please try again.",
        );
      }
    }
  };

  const handleGoogleRegister =
    async () => {
      setRegisterError("");
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
            : "Google registration failed.";

        setRegisterError(message);
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
      {/* Registration form */}

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
                xs: "2.25rem",
                sm: "2.65rem",
              },

              lineHeight: 1.1,
              fontWeight: 800,
              letterSpacing: "-0.045em",
              textAlign: "center",
              color: "#0a0a0a",
            }}
          >
            Create account
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              marginTop: 1.5,
              marginBottom: 3,
              textAlign: "center",
              fontSize: 13,
              lineHeight: 1.55,
            }}
          >
            Register and start organizing your
            work with{" "}

            <Box
              component="span"
              sx={{
                fontWeight: 700,
                color: "#222222",
              }}
            >
              Tuga&apos;s App.
            </Box>
          </Typography>

          {registerError && (
            <Alert
              severity="error"
              sx={{ marginBottom: 2 }}
            >
              {registerError}
            </Alert>
          )}

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(
              handleRegister,
            )}
          >
            <Stack spacing={1.4}>
              {/* Full name */}

              <Controller
                name="fullName"
                control={control}
                rules={{
                  required:
                    "Full name is required",

                  minLength: {
                    value: 2,
                    message:
                      "Name must contain at least 2 characters",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Full name"
                    autoComplete="name"
                    error={Boolean(
                      errors.fullName,
                    )}
                    helperText={
                      errors.fullName?.message
                    }
                    size="small"
                    fullWidth
                    sx={fieldStyles}
                  />
                )}
              />

              {/* Email */}

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
                    placeholder="Email address"
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

              {/* Password */}

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

                    autoComplete="new-password"

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

                              size="small"
                            >
                              {showPassword ? (
                                <VisibilityOff fontSize="small" />
                              ) : (
                                <Visibility fontSize="small" />
                              )}
                            </IconButton>

                            {field.value && (
                              <IconButton
                                aria-label="Clear password"

                                onClick={() =>
                                  field.onChange(
                                    "",
                                  )
                                }

                                edge="end"
                                size="small"
                              >
                                <Close fontSize="small" />
                              </IconButton>
                            )}
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                )}
              />

              {/* Confirm password */}

              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required:
                    "Please confirm your password",

                  validate: (value) =>
                    value === passwordValue ||
                    "Passwords do not match",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Confirm password"

                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }

                    autoComplete="new-password"

                    error={Boolean(
                      errors.confirmPassword,
                    )}

                    helperText={
                      errors.confirmPassword
                        ?.message
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
                                showConfirmPassword
                                  ? "Hide password"
                                  : "Show password"
                              }

                              onClick={() =>
                                setShowConfirmPassword(
                                  (value) =>
                                    !value,
                                )
                              }

                              size="small"
                            >
                              {showConfirmPassword ? (
                                <VisibilityOff fontSize="small" />
                              ) : (
                                <Visibility fontSize="small" />
                              )}
                            </IconButton>

                            {field.value && (
                              <IconButton
                                aria-label="Clear confirmed password"

                                onClick={() =>
                                  field.onChange(
                                    "",
                                  )
                                }

                                edge="end"
                                size="small"
                              >
                                <Close fontSize="small" />
                              </IconButton>
                            )}
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                )}
              />

              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                fullWidth

                sx={{
                  marginTop: "10px !important",
                  minHeight: 48,
                  borderRadius: 99,
                  backgroundColor: "#050505",
                  boxShadow: "none",
                  textTransform: "none",

                  "&:hover": {
                    backgroundColor: "#202020",
                    boxShadow: "none",
                  },
                }}
              >
                {isSubmitting ? (
                  <CircularProgress
                    size={21}
                    color="inherit"
                  />
                ) : (
                  "Register"
                )}
              </Button>
            </Stack>
          </Box>

          <Divider
            sx={{
              marginY: 2.5,
              color: "#777777",
              fontSize: 12,

              "&::before, &::after": {
                borderColor: "#dedede",
              },
            }}
          >
            or continue with
          </Divider>

          <Stack
            direction="row"
            spacing={3}
            sx={{
              alignSelf: "center",
              justifyContent: "center",
            }}
          >
            <SocialButton
              label="Register with Google"
              onClick={handleGoogleRegister}
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

            <SocialButton label="Register with Apple">
              <Apple fontSize="small" />
            </SocialButton>

            <SocialButton label="Register with Facebook">
              <Facebook fontSize="small" />
            </SocialButton>
          </Stack>

          <Typography
            sx={{
              marginTop: 3,
              textAlign: "center",
              color: "#555555",
              fontSize: 12.5,
            }}
          >
            Already a member?{" "}

            <Link
              component={RouterLink}
              to="/"
              underline="hover"

              sx={{
                color: green,
                fontWeight: 700,
              }}
            >
              Login now
            </Link>
          </Typography>
        </Stack>
      </Box>

      {/* Right illustration */}

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
            Create your account and organize
            your work
            <br />

            with{" "}
            <Box
              component="span"
              sx={{ fontWeight: 800 }}
            >
              Tuga&apos;s App
            </Box>
          </Typography>
        </Stack>
      </Box>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}

        onClose={() =>
          setShowSuccess(false)
        }
      >
        <Alert
          severity="success"
          variant="filled"

          onClose={() =>
            setShowSuccess(false)
          }
        >
          Account created successfully.
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default RegisterPage;