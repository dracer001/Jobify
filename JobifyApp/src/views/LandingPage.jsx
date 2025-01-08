import { Navigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from "react";
import LogoIcon from "../components/core/LogoIcon";
import TButton from "../components/core/TButton";



export default function LandingPage () {
  const { authToken } = useStateContext();

  if (authToken) {
    console.log(authToken);
    return <Navigate to="/home" />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-center lg:space-x-8 p-8">
        {/* Logo and Catchy Tagline */}
        <div className="text-center lg:text-left mb-8 lg:mb-0 lg:w-1/2">
          <div className="mb-6">
            {/* Logo Placeholder */}
            <LogoIcon type="light" className="w-32 h-auto mx-auto lg:mx-0" />
          </div>
          <h1 className="mb-4 text-5xl font-semibold tracking-tight text-balance sm:text-7xl">Find Your Future. Faster.</h1>
          <p className="text-lg mb-6 mt-8 font-medium text-pretty text-gray-400 sm:text-xl/8">
            Jobify connects you to the best opportunities. Whether you’re looking to hire or get hired, we’ve got you covered.
          </p>
          <p className="text-md text-gray-500 mb-8">
            Join the revolution in job hunting. Let’s make your next move, your best move.
          </p>
          <div className="flex justify-center lg:justify-start gap-4 mt-6">
            <TButton
              to="/auth/signup"
            >Sign Up</TButton>
            {/* <a href="/auth/signup" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300">
              Sign Up
            </a> */}
            <TButton 
              transparent={true} 
              to="/auth/signin">
              Sign In
            </TButton>
            {/* <a href="/auth/signin" className="bg-transparent border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-md hover:border-slate-400 hover:text-slate-400 transition duration-300">
              Sign In
            </a> */}
          </div>
        </div>

        {/* Animated Section */}
        <div className="hidden lg:block lg:w-1/2">
          {/* Example of an animation */}
          <div className="relative w-full h-64">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg animate-pulse"></div>
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-spin"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

}
