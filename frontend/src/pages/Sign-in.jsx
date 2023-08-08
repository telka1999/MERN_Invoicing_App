import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LoadingButton from "@mui/lab/LoadingButton";
import { useAuth } from "../context/authContext";
import { useToast } from "../context/toastContext";
import { useState } from "react";
import { Link as LinkRouter } from "react-router-dom";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUpdate } = useAuth();
  const { setOpen, setMessage } = useToast();

  const loginUser = async (e) => {
    e.preventDefault();
    if (!loading && email !== "" && password !== "") {
      setLoading(true);
      try {
        const raw = JSON.stringify({
          email: email,
          password: password,
        });

        const res = await fetch("/api/users/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: raw,
          redirect: "follow",
        });
        const data = await res.json();
        if (data?.message) {
          setOpen(true);
          setMessage(data.message);
          setEmail("");
          setPassword("");
          setLoading(false);
        } else {
          setEmail("");
          setPassword("");
          setLoading(false);
          setUpdate(data);
        }
      } catch (error) {
        setLoading(false);
        setOpen(true);
        setMessage(error.message);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => loginUser(e)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <LoadingButton
            type="submit"
            loading={loading}
            loadingIndicator="Loading…"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            <span>Sign In</span>
          </LoadingButton>
          <Grid container>
            <Grid item>
              <LinkRouter
                style={{
                  color: "#1976d2",
                  textDecorationLine: "underline",
                  fontSize: "14px",
                }}
                to="/sign-up"
              >
                Don't have an account? Sign Up
              </LinkRouter>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
