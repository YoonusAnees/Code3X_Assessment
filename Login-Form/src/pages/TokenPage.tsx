import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { Logout } from "@mui/icons-material";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";

export function TokenPage() {
  const navigate = useNavigate();

  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/", {
          replace: true,
        });
        return;
      }

      try {
        const firebaseToken = await user.getIdToken();
        setToken(firebaseToken);
      } catch {
        setError("The access token could not be loaded.");
      } finally {
        setIsLoading(false);
      }
    });

    return unsubscribe;
  }, [navigate]);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/", {
      replace: true,
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        paddingY: {
          xs: 4,
          md: 8,
        },
      }}
    >
      <Container maxWidth="md">
        <Paper
          sx={{
            padding: {
              xs: 3,
              md: 5,
            },
            borderRadius: 4,
          }}
        >
          <Stack spacing={3}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 800 }}>
                Google login successful
              </Typography>

              <Typography color="text.secondary" sx={{ marginTop: 1 }}>
                Your Firebase access token is shown below.
              </Typography>
            </Box>

            {isLoading ? (
              <Box
                sx={{
                  paddingY: 8,
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <CircularProgress />
              </Box>
            ) : error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <Box
                component="pre"
                sx={{
                  padding: 2.5,
                  margin: 0,
                  maxHeight: 360,
                  overflow: "auto",
                  whiteSpace: "pre-wrap",
                  overflowWrap: "anywhere",
                  borderRadius: 2,
                  backgroundColor: "#111827",
                  color: "#d1fae5",
                  fontSize: 13,
                }}
              >
                {token}
              </Box>
            )}

            <Alert severity="warning">
              This token is sensitive. It is displayed only to meet the
              assessment requirement.
            </Alert>

            <Button
              variant="outlined"
              startIcon={<Logout />}
              onClick={handleSignOut}
              sx={{
                alignSelf: "flex-start",
              }}
            >
              Sign out
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

export default TokenPage;