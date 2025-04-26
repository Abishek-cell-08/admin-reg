'use client'
import { supabase } from '../../../utils/supabase';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function AdminReg() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    libraryName: '',
    library_address: '',
    library_city:'',
    library_country:'',
    library_state:'',
    phoneNumber: '',
    gender: '',
    role: "admin"
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [step, setStep] = useState(1);
  const [accessToken, setAccessToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let tempErrors = {};
    
    if (step === 1) {
      if (!formData.firstName) tempErrors.firstName = "First name is required";
      if (!formData.lastName) tempErrors.lastName = "Last name is required";
      
      if (!formData.email) {
        tempErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        tempErrors.email = "Email is invalid";
      }
      
      if (!formData.password) {
        tempErrors.password = "Password is required";
      } else if (formData.password.length < 8) {
        tempErrors.password = "Password must be at least 8 characters";
      }
      
      if (formData.password !== formData.confirmPassword) {
        tempErrors.confirmPassword = "Passwords do not match";
      }
      
      if (!formData.phoneNumber) {
        tempErrors.phoneNumber = "Phone number is required";
      } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
        tempErrors.phoneNumber = "Please enter a valid 10-digit phone number";
      }
      
      if (!formData.gender) {
        tempErrors.gender = "Please select a gender";
      }
    } else if (step === 2) {
      if (!formData.libraryName) {
        tempErrors.libraryName = "Library name is required";
      }
    }
    
    return tempErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  const validationErrors = validate();
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length === 0) {
    setIsSubmitting(true);
    
    try {
      if (step === 1) {
        // Step 1: Create account in Supabase Auth
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;
        
        console.log("Supabase Auth Response:", data);
        
        // Store the access token from response
        if (data.session && data.session.access_token) {
          setAccessToken(data.session.access_token);
        } else {
          // For email confirmation required setups, there may not be a session yet
          console.log("No session returned - email confirmation may be required");
        }
        
        // Proceed to Step 2
        setStep(2);
        
      } else if (step === 2) {
        // Format data according to API expectations
        const apiData = {
          library_name: formData.libraryName,
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          jwt: accessToken, // Using the stored access token
          library_address: formData.library_address,
          library_city: formData.library_city,
          library_state: formData.library_state,
          library_country: formData.library_country,
          phone_number: formData.phoneNumber,
          gender: formData.gender
        };
        
        // Step 2: Send formatted data to API
        const response = await axios.post(
          'https://lms-temp-be.vercel.app/api/v1/admin',
          apiData
        );

        console.log("API Response:", response.data);
        setSubmitSuccess(true);
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setErrors({ submit: err.message || "Registration failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  }
  };
  
  return (
    <div className="min-h-screen bg-slate-50">
      <Head>
        <title>Admin Registration | ShelfSpace</title>
        <meta name="description" content="Administrator Registration for ShelfSpace - Modern library management system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/">
                  <h1 className="text-2xl font-bold text-blue-800">ShelfSpace</h1>
                </Link>
              </div>
              <div className="hidden md:ml-10 md:flex md:space-x-8">
                <Link href="/" className="text-gray-500 hover:text-gray-700 font-medium px-1 pt-1">
                  Home
                </Link>
                <Link href="/features" className="text-gray-500 hover:text-gray-700 font-medium px-1 pt-1">
                  Features
                </Link>
                <Link href="/about" className="text-gray-500 hover:text-gray-700 font-medium px-1 pt-1">
                  About
                </Link>
                <Link href="/contact" className="text-gray-500 hover:text-gray-700 font-medium px-1 pt-1">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Registration Form */}
      <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Administrator Registration</h1>
            <p className="mt-2 text-gray-600">
              Create your administrator account to manage your library
            </p>
            {/* Step indicator */}
            <div className="mt-4 flex justify-center">
              <div className={`h-2 w-12 rounded-full mr-2 ${step === 1 ? 'bg-blue-800' : 'bg-gray-300'}`}></div>
              <div className={`h-2 w-12 rounded-full ${step === 2 ? 'bg-blue-800' : 'bg-gray-300'}`}></div>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              {step === 1 ? 'Step 1: Account Information' : 'Step 2: Library Information'}
            </p>
          </div>

          {errors.submit && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
              {errors.submit}
            </div>
          )}

          {submitSuccess ? (
            <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Registration successful!</h3>
              <p className="mt-1 text-sm text-gray-500">
                Thank you for registering as an administrator with ShelfSpace. We'll review your information and send you access credentials shortly.
              </p>
              <div className="mt-6">
                <Link href="/" className="text-blue-800 hover:text-blue-700 font-medium">
                  Return to homepage
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <>
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                      <input name="firstName" value={formData.firstName} onChange={handleChange} className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 text-black" />
                      {errors.firstName && <p className="text-sm text-red-600">{errors.firstName}</p>}
                    </div>
                    <div className="w-1/2">
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                      <input name="lastName" value={formData.lastName} onChange={handleChange} className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 text-black" />
                      {errors.lastName && <p className="text-sm text-red-600">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input name="email" type="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 text-black" />
                    {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 text-black" />
                    {errors.phoneNumber && <p className="text-sm text-red-600">{errors.phoneNumber}</p>}
                  </div>

                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 text-black">
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="others">Others</option>
                    </select>
                    {errors.gender && <p className="text-sm text-red-600">{errors.gender}</p>}
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input name="password" type="password" value={formData.password} onChange={handleChange} className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 text-black" />
                    {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 text-black" />
                    {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
                  </div>

                  <button type="submit" disabled={isSubmitting} className="w-full py-2 px-4 bg-blue-800 text-white font-medium rounded-md hover:bg-blue-700">
                    {isSubmitting ? 'Creating account...' : 'Continue'}
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <div>
                    <label htmlFor="libraryName" className="block text-sm font-medium text-gray-700">Library Name</label>
                    <input name="libraryName" value={formData.libraryName} onChange={handleChange} className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 text-black" />
                    {errors.libraryName && <p className="text-sm text-red-600">{errors.libraryName}</p>}
                  </div>

                  <div>
                    <label htmlFor="library_address" className="block text-sm font-medium text-gray-700">Library Address</label>
                    <input name="library_address" value={formData.library_address} onChange={handleChange} className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 text-black" />
                  </div>

                  <div className="flex gap-4">
                    <div className="w-1/3">
                      <label htmlFor="library_city" className="block text-sm font-medium text-gray-700">City</label>
                      <input name="library_city" value={formData.library_city} onChange={handleChange} className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 text-black" />
                    </div>
                    <div className="w-1/3">
                      <label htmlFor="library_state" className="block text-sm font-medium text-gray-700">State</label>
                      <input name="library_state" value={formData.library_state} onChange={handleChange} className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 text-black" />
                    </div>
                    <div className="w-1/3">
                      <label htmlFor="library_country" className="block text-sm font-medium text-gray-700">Country</label>
                      <input name="library_country" value={formData.library_country} onChange={handleChange} className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 text-black" />
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <button 
                      type="button" 
                      onClick={() => setStep(1)} 
                      className="w-1/3 py-2 px-4 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300"
                    >
                      Back
                    </button>
                    <button 
                      type="submit" 
                      disabled={isSubmitting} 
                      className="w-2/3 py-2 px-4 bg-green-700 text-white font-medium rounded-md hover:bg-green-600"
                    >
                      {isSubmitting ? 'Creating library...' : 'Create Library'}
                    </button>
                  </div>
                </>
              )}
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white mt-12">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap justify-center space-x-6">
            <Link href="/about" className="text-base text-gray-500 hover:text-gray-900">
              About
            </Link>
            <Link href="/features" className="text-base text-gray-500 hover:text-gray-900">
              Features
            </Link>
            <Link href="/privacy" className="text-base text-gray-500 hover:text-gray-900">
              Privacy
            </Link>
            <Link href="/terms" className="text-base text-gray-500 hover:text-gray-900">
              Terms
            </Link>
            <Link href="/contact" className="text-base text-gray-500 hover:text-gray-900">
              Contact
            </Link>
          </nav>
          <p className="mt-8 text-center text-base text-gray-400">
            &copy; {new Date().getFullYear()} ShelfSpace. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}