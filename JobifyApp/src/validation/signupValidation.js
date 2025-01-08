import * as Yup from 'yup';
import {axiosClient} from '../context/axios';

const profileRegValidation = (currentUserEmail = null) => {
  return Yup.object().shape({
    first_name: Yup.string().required('please input your firstname').min(3, 'First name must be at least 3 characters'),
    last_name: Yup.string().required('please input your lastname').min(3, 'Last name must be at least 3 characters'),
    title: Yup.string().required('please input a title/role').max(50, "title field cannot be more than 50 characters"),
    email: Yup.string()
      .required('please input your email address')
      .email('email address must be valid')
      .test('check-email', 'email address already exists', async (value) => {
        if (value && Yup.string().email().isValidSync(value)) {  // Check if the email is a valid format first
          if (value === currentUserEmail) {
            return true;  // Skip backend validation for same email
          }
          try {
            const response = await axiosClient.post('/check-email', { email: value });
            // If email is available (status 200), return true
            return response.status === 200;
          } catch (error) {
            // If error occurs (email already exists), return false
            if (error.response && error.response.status === 400) {
              return false;
            }
            return true;
          }
        }
        return true;  // If not a valid email format, skip the backend check
      }),
    phone_number: Yup.string().required("please input you phone number").matches(
        /^(?:\+234|0)9\d{9}$/, 
        'Phone number must be in the format +2348010000000 or 08010000000'
    ),
    gender: Yup.string().required('please choose a gender'),
    address: Yup.string().required('please input an address'),
    country: Yup.string().required('please select a country'),
    city: Yup.string().required("please select a city"),
});
}
  
const companyRegValidation = (currentUserEmail = null) => {

  return Yup.object().shape({
    company_name: Yup.string().required('Company name is required'),
    company_website: Yup.string().url('Invalid URL format'),
    email: Yup.string()
    .required('Email is required')
    .email('Invalid email address')
    .test('check-email', 'Email already exists', async (value) => {
      if (value && Yup.string().email().isValidSync(value)) {  // Check if the email is a valid format first
        // If the email is the same as the current user's email, skip the backend check
        if (value === currentUserEmail) {
          return true;  // Skip backend validation for same email
        }

        try {
          const response = await axiosClient.post('/check-email', { email: value });
          // If email is available (status 200), return true
          return response.status === 200;
        } catch (error) {
          // If error occurs (email already exists), return false
          if (error.response && error.response.status === 400) {
            return false;
          }
          return true;
        }
      }
      return true;  // If not a valid email format, skip the backend check
    }),

    address: Yup.string().required('please input an address'),
    country: Yup.string().required('please select a country'),
    city: Yup.string().required("please select a city"),
  });
}
  

  const profileImgValidation = Yup.object().shape({
    profile_photo: Yup.mixed()
    .test('fileType', 'Only image files are allowed', (value) => {
      return value && value[0]?.type.startsWith('image/');
    })
    .test('fileSize', 'File size is too large', (value) => {
      return value && value[0]?.size <= 5 * 1024 * 1024; // 5MB max file size
    })

  });
  

  const passwordValidation = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/\d/, 'Password must contain at least one number')
      .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),

    password_confirmation: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
  })


  const credentialValidation = Yup.object().shape({
    credential: Yup.mixed()
        .test('fileSize', 'File size is too large (max 2MB)', (value) => {
        return value && value[0]?.size <= 2 * 1024 * 1024; // 2MB max file size
        })
        .test('fileType', 'Only .doc, .txt, or .pdf files are allowed', (value) => {
        return value && ['application/pdf', 'application/msword', 'text/plain'].includes(value[0]?.type);
        }),
  })

  export {
    credentialValidation,
    profileRegValidation,
    companyRegValidation,
    profileImgValidation,
    passwordValidation,
  }
