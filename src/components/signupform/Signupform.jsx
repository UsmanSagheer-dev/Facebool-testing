import { useDispatch } from "react-redux";
import { signupUser } from "../../store/authSlice/authslice";
import { Container, CssBaseline, Box, Typography, Grid, TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Confirm Password is required"),
    profilePicture: Yup.mixed()
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await dispatch(signupUser(values));
      alert("Signup Successful");
      resetForm();
      navigate("/dashboard"); // Navigate to dashboard after successful signup
    } catch (error) {
      console.log(`Error signing up: ${error.message}`);
      alert(`Error signing up: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", mt: 8, p: 2, border: "1px solid #ddd", borderRadius: "8px" }}>
        <Typography variant="h5">Sign Up</Typography>
        <Typography variant="body2" sx={{ mb: 3 }}>It's quick and easy.</Typography>
        <Formik initialValues={{ firstName: "", lastName: "", email: "", password: "", confirmPassword: "", profilePicture: null }} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Field as={TextField} variant="outlined" margin="normal" fullWidth name="firstName" label="First Name" helperText={<ErrorMessage name="firstName" />} error={Boolean(<ErrorMessage name="firstName" />)} />
                </Grid>
                <Grid item xs={6}>
                  <Field as={TextField} variant="outlined" margin="normal" fullWidth name="lastName" label="Last Name" helperText={<ErrorMessage name="lastName" />} error={Boolean(<ErrorMessage name="lastName" />)} />
                </Grid>
              </Grid>
              <Field as={TextField} variant="outlined" margin="normal" fullWidth name="email" label="Email" helperText={<ErrorMessage name="email" />} error={Boolean(<ErrorMessage name="email" />)} />
              <Field as={TextField} variant="outlined" margin="normal" fullWidth name="password" label="Password" type="password" helperText={<ErrorMessage name="password" />} error={Boolean(<ErrorMessage name="password" />)} />
              <Field as={TextField} variant="outlined" margin="normal" fullWidth name="confirmPassword" label="Confirm Password" type="password" helperText={<ErrorMessage name="confirmPassword" />} error={Boolean(<ErrorMessage name="confirmPassword" />)} />
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="profile-picture-upload"
                type="file"
                onChange={(event) => {
                  setFieldValue("profilePicture", event.currentTarget.files[0]);
                }}
              />
              <label htmlFor="profile-picture-upload">
                <Button
                  variant="outlined"
                  component="span"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Upload Profile Picture
                </Button>
              </label>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }} disabled={isSubmitting}>Sign Up</Button>
            </Form>
          )}
        </Formik>
        <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
          Already have an account? <Link to="/" style={{ textDecoration: "none", color: "blue" }}>Log in</Link>
        </Typography>
      </Box>
    </Container>
  );
};
