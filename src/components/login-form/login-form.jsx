import React, { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Typography } from '@mui/material';
import { signIn } from '../../services';
import { useUser } from '../../context/userContext';

const LoginForm = () => {

    const { userDispatch } = useUser();
    const [showPassword, setShowPassword] = useState(false);

    const validationSchema = yup.object({
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

    // const guestLogin = async () => {
    //     try {
    //         let login = { email: 'admin@gmail.com', password: 'admin@123' };
    //         // setLoader(true);
    //         const res = await signIn(login);
    //         if (res.data.status === 200) {
    //             // toast.success(res.data.message);
    //             // setLoader(false);
    //             let user = res.data.data;
    //             localStorage.setItem('setUser', JSON.stringify({ firstName: user.firstName, lastName: user.lastName, email: user.email, token: user.token, view: 'List', screen: 'Notes' }));
    //             userDispatch({ type: 'SIGNIN', payload: user });
    //         }
    //     } catch (error) {
    //         // setLoader(true);
    //         // toast.error(error?.response?.data?.message);
    //     }
    // }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                // setLoader(true);
                const res = await signIn(values);
                if (res.data.statusCode === 200) {
                    // toast.success(res.data.message);
                    // setLoader(false);
                    let user = res.data.data;
                    localStorage.setItem('setUser', JSON.stringify({ firstName: user.firstName, lastName: user.lastName, email: user.email, token: user.token, id: user._id }));
                    userDispatch({ type: 'SIGNIN', payload: user });
                    if (typeof window !== 'undefined') {
                        window.location.href = '/'
                    }
                }
            } catch (error) {
                // setLoader(true);
                // toast.error(error?.response?.data?.message);
            }
        },
    });

    return (
        <Box sx={{ textAlign: "center" }}>
            <Typography sx={{ fontSize: "24px", lineHeight: "24px", textAlign: "center", marginBottom: "24px" }}>
                Sign In
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <FormControl sx={{ m: 1, width: { xs: '90%' } }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-email-id">Email ID</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-email-id"
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
                    <Button sx={{ padding: "11px 48px", fontSize: "16px", fontWeight: "700" }} variant="contained" type='submit'>Sign In</Button>
                </Box>
            </form>
        </Box>
    );
}

export default LoginForm;