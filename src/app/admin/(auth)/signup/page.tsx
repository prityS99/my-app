"use client";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { AlertTriangle, Loader2, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { AppDispatch, RootState } from "@/hooks/utils/redux";
import { signupSchema } from "@/services/validtions/auth.validations";
import { SignupFormData } from "@/typescript/type/signup.type";
import { RegisterUser } from "@/hooks/redux-toolkit/slice/auth.slice";

const AdminSignup = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { status, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: { email: "", password: "" },
  });


  const onSubmit = (data: SignupFormData) => {
    // data.image is a FileList object from the register function
    dispatch(
      RegisterUser({
        name: data.name,
        email: data.email,
        password: data.password,
        mobile: data.mobile,
        first_school: data.first_school,
        image: data.image as FileList,
      })
    ) .unwrap()
      .then((res) => {
        console.log("res", res);
        // toast.success(res.message);
        // router.push("/admin/dashboard");
      })
      .catch((error) => {
        console.log("err", error);
        toast.error(error?.response?.data?.message)
      });
  };

  const isLoading = status === "loading" || isSubmitting;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm md:max-w-md p-8 bg-white rounded-2xl shadow-2xl border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <UserPlus className="w-10 h-10 text-indigo-600 mb-4" />
          <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
          <p className="mt-2 text-sm text-gray-500">
            Start your journey with us
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="email">Name</Label>
            <Input
              id="name"
              type="text"
              {...register("name")}
              placeholder="Name"
              className="mt-1 block w-full"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name?.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="your.email@example.com"
              className="mt-1 block w-full"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="email">Mobile Number</Label>
            <Input
              id="mobile"
              type="text"
              {...register("mobile")}
              placeholder="9999999999"
              className="mt-1 block w-full"
            />
            {errors.mobile && (
              <p className="mt-1 text-sm text-red-500">
                {errors.mobile?.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="email">Secret Question</Label>
            <Input
              id="first_school"
              type="text"
              {...register("first_school")}
              placeholder="Secret Qustions"
              className="mt-1 block w-full"
            />
            {errors.first_school && (
              <p className="mt-1 text-sm text-red-500">
                {errors.first_school?.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              placeholder="••••••••"
              className="mt-1 block w-full"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password?.message}
              </p>
            )}
          </div>
           <div>
            <Label htmlFor="email">Profile Image</Label>
            <Input
              id="image"
              type="file"
              {...register("image")}
              className="mt-1 block w-full"
            />
            {errors.image && (
              <p className="mt-1 text-sm text-red-500">
                {errors.image?.message}
              </p>
            )}
          </div>

          {/* API/Form Error Box (Conditional) */}
          {/* ✅ Now using 'error' from Redux directly for rendering */}
          {error && (
            <div
              className="flex items-center p-3 text-sm font-medium text-red-800 bg-red-50 rounded-lg border border-red-200"
              role="alert"
            >
              <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="font-medium">{error}</span>
            </div>
          )}
          <Button
            type="submit"
            className="w-full py-2 flex items-center justify-center transition duration-150"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Registering..." : "Register Account"}
          </Button>
        </form>
        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/")}
            className="font-semibold text-indigo-600 hover:text-indigo-500 transition duration-150 underline-offset-4 hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default AdminSignup;
