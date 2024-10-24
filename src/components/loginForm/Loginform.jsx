import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CssBaseline,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/authSlice/authslice";
import { Link, useNavigate } from "react-router-dom"; 
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate(); 

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/"); // Redirect to dashboard/home after login
    }
  }, [user, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(loginUser({ email, password }));

    setEmail("");
    setPassword("");
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
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
        <Typography variant="h5">Facebook</Typography>
        <Typography variant="body2" sx={{ mb: 3 }}>
          Log into your account
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email or Phone Number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </form>
        {error && <Typography color="error">{error}</Typography>}
        <Typography variant="body2" sx={{ textAlign: "center" }}>
          <a href="#" style={{ textDecoration: "none" }}>
            Forgot password?
          </a>
        </Typography>
        <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ textDecoration: "none", color: "blue" }}>
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginForm;
