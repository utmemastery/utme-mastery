// src/constants/strings.js


  export const strings = {
    splashTagline: 'Master UTME with Science and Smarts',
    motivationalQuotes: [
      "Master today, conquer tomorrow!",
      "Every question you answer brings you closer to your goal.",
      "Your UTME success starts here!"
    ],
    testimonials: ['"Scored 320 in UTME!" - Ada', '"Best prep app ever!" - Tunde'],
    login: {
      title: 'Welcome Back',
      subtitle: 'Sign in to your account',
      emailPlaceholder: 'Email',
      passwordPlaceholder: 'Password',
      button: 'Login',
      forgotPassword: 'Forgot password?',
      signupPrompt: 'Don’t have an account?',
      signupLink: 'Sign up',
    },
    signup: {
      title: 'Create Account',
      subtitle: 'Sign up to get started',
      firstNamePlaceholder: 'First Name',
      lastNamePlaceholder: 'Last Name',
      emailPlaceholder: 'Email',
      phoneNumberPlaceholder: 'Phone Number',
      passwordPlaceholder: 'Password',
      confirmPasswordPlaceholder: 'Confirm Password',
      button: 'Sign Up',
      loginPrompt: 'Already have an account?',
      loginLink: 'Log in',
    },
    passwordReset: {
      title: 'Reset Password',
      subtitle: 'Enter your email to receive a password reset link',
      emailPlaceholder: 'Email',
      button: 'Send Reset Link',
      success: 'If an account exists for this email, a reset link has been sent.',
      backToLogin: 'Back to Login',
    },
    verifyEmail: {
      title: 'Verify Your Email',
      success: 'Email verified successfully. Please log in.',
      button: 'Continue to Login',
      resend: 'Resend Verification Email',
    },
    errors: {
      emptyFields: 'Please fill in all fields.',
      invalidEmail: 'Please enter a valid email address.',
      weakPassword: 'Password must be at least 8 characters and include a number.',
      passwordsMismatch: 'Passwords do not match.',
      loginFailed: 'Login failed. Please check your credentials.',
      signupFailed: 'Signup failed. Please try again.',
      resetPasswordFailed: 'Failed to send reset link. Please try again.',
      verifyEmailFailed: 'Failed to verify email. The token may be invalid or expired.',
      invalidToken: 'Invalid or missing verification token.',
      profileFetchFailed: 'Failed to fetch user profile.',
      profileUpdateFailed: 'Failed to update profile.',
      progressFetchFailed: 'Failed to fetch progress data.',
      networkError: 'Network error. Please check your connection.',
    },
  };