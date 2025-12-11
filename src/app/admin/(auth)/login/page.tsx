"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
// import { clearStatus, loginUser } from "@/hooks/redux-toolkit/slice/auth.slice";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Loader2, LogIn } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { LoginData } from "@/typescript/interface/auth.interface";
import { AppDispatch, RootState } from "@/hooks/utils/redux";
import { loginSchema } from "@/services/validtions/auth.validations";
import { loginUser } from "@/hooks/redux-toolkit/slice/auth.slice";


export default function AdminLogin() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { status, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  // console.log("isauth, error", isAuthenticated, status)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

useEffect(()=>{
if(isAuthenticated){
  router.push("/admin/dashboard")
}
},[isAuthenticated, router])

  const onSubmit = (data: LoginData) => {
    dispatch(loginUser({ email: data.email, password: data.password }))
      .unwrap()
      .then((res) => {
        console.log("res", res);
        toast.success(res.message);
        router.push("/admin/dashboard");
      })
      .catch((error) => {
        console.log("err", error);
        toast.error(error?.response?.data?.message);
      });
  };

  const isLoading = status === "loading" || isSubmitting;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm md:max-w-md p-8 bg-white rounded-2xl shadow-2xl border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <LogIn className="w-10 h-10 text-indigo-600 mb-4" />
          <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
          <p className="mt-2 text-sm text-gray-500">
            Access your Admin Dashboard
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            {isLoading ? "Signing In..." : "Login"}
          </Button>
        </form>
        <p className="mt-8 text-center text-sm text-gray-600">
          Dont have an account?{" "}
          <button
            onClick={() => router.push("/admin/signup")}
            className="font-semibold text-indigo-600 hover:text-indigo-500 transition duration-150 underline-offset-4 hover:underline"
          >
            Register Now
          </button>
        </p>
      </div>
    </div>
  );
}
