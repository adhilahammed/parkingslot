import { useForm } from "react-hook-form";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useUserSessionStore } from "../../store/userSession";
import { toast } from "react-toastify";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const setUserSession = useUserSessionStore((state) => state.setSession);
  const navigate = useNavigate();

  const createUser = async (newUser) => {
    const response = await axios.post(
      `https://${import.meta.env.VITE_API}/user/login`,
      newUser
    );
    return response.data;
  };

  const mutation = useMutation(createUser, {
    onSuccess: (data) => {
      console.log("haiddd");

      // alert('User created successfully!');
      reset(); // Reset the form on success
      setUserSession({
        token: data.token,
        userId: data.userId,
      });
      toast.success("login successful");
      navigate("/home");
    },
    onError: (error) => {
      toast.error("login failed");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data); // Pass form data to the mutation
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Login
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
              {...register("email", { required: "Email is required" })}
              type="text"
              id="name"
              name="email"
              placeholder="Enter your name"
              className="mt-1 block w-full  border border-gray-300 rounded-md box-border shadow-sm focus:ring-blue-600 focus:border-blue-600 sm:text-sm p-2"
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
          Dont have an account?{" "}
          <a
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/signup");
            }}
            className="text-blue-800 hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};
