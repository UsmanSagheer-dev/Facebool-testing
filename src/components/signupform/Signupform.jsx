import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signupUser } from "../../store/authSlice/authslice";
import { Container, CssBaseline, Box, Typography, Grid, TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export const SignupForm = ({ toggleForm }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Add useNavigate

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await dispatch(
        signupUser({ firstName, lastName, email, password })
      );

      alert("Signup Successful");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

 
      navigate("/dashboard");
    } catch (error) {
      console.log(`Error signing up: ${error.message}`);
      alert(`Error signing up: ${error.message}`);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: 8,
          p: 2,
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h5">Sign Up</Typography>
        <Typography variant="body2" sx={{ mb: 3 }}>
          It's quick and easy.
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
          </Grid>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
          >
            Sign Up
          </Button>
        </form>
        <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
          Already have an account?{" "}
          <Link to="/" style={{ textDecoration: "none", color: "blue" }}>
            Log in
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};
