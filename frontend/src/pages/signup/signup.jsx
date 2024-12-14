import React, { useState } from "react";
import styles from "./signup.module.css";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const Signup = () => {
  const [passwordError, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, defaultValues },
    reset,
    control,
  } = useForm();

  const password = useWatch({
    control,
    name: "password",
  });

  const confirmPassword = useWatch({
    control,
    name: "confirmPassword",
  });

  React.useEffect(() => {
    setTimeout(() => {
      if (password !== confirmPassword) {
        setError("passwords does not match");
      } else {
        setError("");
      }
    }, 2000);
  }, [confirmPassword]);

  const navigate = useNavigate();
  console.log(defaultValues, "errors");

  const mutation = useMutation(
    async (newUser) => {
      const response = await axios.post(
        `https://${import.meta.env.VITE_API}/user/signup`,
        newUser
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log("User created successfully:", data);
        toast.success("Signup Successful");
        reset(); // Reset the form on success

        navigate("/");
      },
      onError: (error) => {
        console.error("Error creating user:", error);
        toast.error("Failed to create user. Please try again.");
      },
    }
  );

  const onSubmit = (data) => {
    console.log("hai");

    mutation.mutate(data); // Pass form data to the mutation
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Field */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              className="mt-1 block w-full  border border-gray-300 rounded-md box-border shadow-sm focus:ring-blue-600 focus:border-blue-600 sm:text-sm p-2"
            />
            {errors.name && (
              <label className="text-red-500 text-sm">
                *{String(errors.name?.message)}
              </label>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="mt-1 block w-full rounded-md border  box-border border-gray-300 shadow-sm focus:ring-blue-600 focus:border-blue-600 sm:text-sm p-2"
            />
            {errors.email && (
              <label className="text-red-500 text-sm">
                *{String(errors.email?.message)}
              </label>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              autoComplete=""
              className="mt-1 block w-full rounded-md border-gray-300 border  box-border shadow-sm focus:ring-blue-600 focus:border-blue-600 sm:text-sm p-2"
            />

            {errors.password && (
              <label className="text-red-500 text-sm">
                *{String(errors.password?.message)}
              </label>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              {...register("confirmPassword", {
                required: "Password do not match",
              })}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              autoComplete=""
              className="mt-1 block w-full  border border-gray-300 rounded-md box-border shadow-sm focus:ring-blue-800 focus:border-blue-800 sm:text-sm p-2"
            />
            {errors.confirmPassword && (
              <label className="text-red-500 text-sm">
                *{String(errors.confirmPassword?.message)}
              </label>
            )}
            {!errors.confirmPassword && passwordError && (
              <label className="text-red-500 text-sm">
                *{String(passwordError)}
              </label>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-800 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/");
            }}
            className="text-blue-800 hover:underline"
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};
