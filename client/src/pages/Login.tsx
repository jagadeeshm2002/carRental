import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { loginFormSchema } from "@/schemas/zodSchema";
import axios from "axios";
import { useGlobalContext } from "@/context";
import { publicClient, updateToken } from "@/api/client";
import { toast } from "sonner";
import { User } from "@/types/type";

export default function Login() {
  const { updateUser, setToken } = useGlobalContext();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  interface loginResponse {
    user: User;
    message: string;
    accessToken: string;
  }

  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    try {
      const response = await publicClient.get<loginResponse>(
        "/auth",
        {
          params: data,
        }
      );
      if (response.status >= 200 && response.status < 300) {
        updateToken(response.data.accessToken);
        updateUser(response.data.user);
        setToken(response.data.accessToken);
        toast.success(response.data.message || "Login successful");
        const redirectPath =
          response.data.user?.role === "user" ? "/search" : "/";
        toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
          loading: "Redirecting...",
          success: () => {
            navigate(redirectPath);
            return "Redirected successfully";
          },
          error: "Failed to redirect",
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Login error:", error.response?.data || error.message);
        toast.error(error.response?.data.message || "Failed to login");
      } else {
        console.error("Login error:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-Geraldton">Welcome back</h2>
          <p className="mt-2 text-gray-600 font-GeraldtonRegular">
            Please sign in to your account
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>
        </Form>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary hover:text-primary/80">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
