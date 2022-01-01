import React, { useState } from 'react';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import Box from '@mui/material/Box';
import { makeStyles } from "@mui/styles";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Typography } from '@mui/material';
import { signUp } from '../../services/http/http';

const SignUpForm = (props) => {

    const [showPassword, setShowPassword] = useState(false);

    const validationSchema = yup.object({
        firstName: yup
            .string()
            .trim()
            .required('Please enter first name'),
        lastName: yup
            .string()
            .trim()
            .required('Please enter last name'),
        email: yup
            .string()
            .trim()
            .required('Please enter email')
            .email('Please enter a valid email'),
        password: yup
            .string()
            .trim()
            .required('Please enter password')
            .matches(
                /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                'Password must contain at least one number, one special character & length must be 6 to 16 character/digits.'
            )
    });

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                // setLoader(true);
                let res = await signUp(values);
                if (res.data.statusCode === 200) {
                    // toast.success(res.data.message);
                    // setLoader(false);
                    let user = res.data.data;
                }
            } catch (error) {
                // setLoader(false);
                // toast.error(error.response && error.response.data && error.response.data.message && error.response.data.message);
            }
        },
    });

    return (
        <Box sx={{ textAlign: "center" }}>
            <Typography sx={{ fontSize: "24px", lineHeight: "24px", textAlign: "center", marginBottom: "24px" }}>
                Sign Up
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <FormControl sx={{ m: 1, width: { xs: '90%' } }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-first-name">First Name</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-email-id"
                        name='firstName'
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        // error={formik.touched.email && Boolean(formik.errors.email)}
                        label="First Name"
                    />
                    {formik.touched.firstName && Boolean(formik.errors.firstName) && <Box sx={{ textAlign: "left", color: "red" }} component="span">{formik.errors.firstName}</Box>}
                </FormControl>
                <FormControl sx={{ m: 1, width: { xs: '90%' } }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-last-name">Last Name</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-email-id"
                        name='lastName'
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        // error={formik.touched.email && Boolean(formik.errors.email)}
                        label="Last Name"
                    />
                    {formik.touched.lastName && Boolean(formik.errors.lastName) && <Box sx={{ textAlign: "left", color: "red" }} component="span">{formik.errors.lastName}</Box>}
                </FormControl>
                <FormControl sx={{ m: 1, width: { xs: '90%' } }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-email">Email ID</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-email"
                        name='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        // error={formik.touched.email && Boolean(formik.errors.email)}
                        label="Email ID"
                    />
                    {formik.touched.email && Boolean(formik.errors.email) && <Box sx={{ textAlign: "left", color: "red" }} component="span">{formik.errors.email}</Box>}
                </FormControl>
                <FormControl sx={{ m: 1, width: { xs: '90%' } }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        name='password'
                        type={showPassword ? 'text' : 'password'}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        // error={formik.touched.password && Boolean(formik.errors.password)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}
                                    // onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                    {formik.touched.password && Boolean(formik.errors.password) && <Box sx={{ textAlign: "left", color: "red" }} component="span">{formik.errors.password}</Box>}
                </FormControl>
                <Box mt={2}>
                    <Button sx={{ padding: "11px 48px", fontSize: "16px", fontWeight: "700" }} variant="contained" type='submit'>Sign Up</Button>
                </Box>
            </form>
        </Box>
    );
}

export default SignUpForm;