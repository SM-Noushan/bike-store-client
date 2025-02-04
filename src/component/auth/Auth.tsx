import { toast } from "sonner";
import {
  IAuthModalProps,
  TCustomError,
  TFieldConfig,
  TLoginFormValues,
  TRegisterFormValues,
} from "@/types";
import Modal from "../modal/Modal";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useLoginMutation,
  useRegisterMutation,
} from "@/app/features/api/authApi";
import { verifyToken } from "@/utils";
import { useAppDispatch } from "@/app/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import FormWrapper from "@/component/form/FormWrapper";
import { setUser } from "@/app/features/api/authSlice";
import { loginSchema, registerSchema } from "@/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const loginFields: TFieldConfig[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
  },
];

const registerFields: TFieldConfig[] = [
  { name: "name", label: "Name", type: "text", placeholder: "Enter your name" },
  ...loginFields,
];

const AuthTabs: FC<IAuthModalProps> = ({ initialTab, open, setOpen }) => {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [login, { error: loginError, isLoading: isLoginLoading }] =
    useLoginMutation();
  const [register, { error: registerError, isLoading: isRegisterLoading }] =
    useRegisterMutation();

  // Initialize form methods for each tab.
  const loginForm = useForm<TLoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
  const registerForm = useForm<TRegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  // Form submission handlers.
  const onLoginSubmit = async (data: TLoginFormValues) => {
    // console.log("Login data:", data);
    const toastId = toast.loading("Logging in...");
    try {
      const res = await login(data).unwrap();
      const token = res.data.accessToken;
      const decoded = verifyToken(token);
      dispatch(setUser({ user: decoded, token }));
      toast.success("Login successful", { id: toastId });
      setOpen(false);
      // console.log(decoded);
    } catch (err) {
      toast.error((err as TCustomError)?.data?.message, { id: toastId });
    }
  };

  const onRegisterSubmit = async (data: TRegisterFormValues) => {
    // console.log("Register data:", data);
    const toastId = toast.loading("Registering...");
    try {
      const res = await register(data).unwrap();
      const token = res.data.accessToken;
      const decoded = verifyToken(token);
      dispatch(setUser({ user: decoded, token }));
      toast.success("Register successful", { id: toastId });
      setOpen(false);
      // console.log(res);
    } catch (err) {
      toast.error((err as TCustomError)?.data?.message, { id: toastId });
    }
  };

  return (
    <Modal
      open={open}
      title="BikeStore Account"
      onClose={setOpen}
      onSave={
        activeTab === "login"
          ? loginForm.handleSubmit(onLoginSubmit)
          : registerForm.handleSubmit(onRegisterSubmit)
      }
      onSaveLabel={activeTab === "login" ? "Login" : "Register"}
      disabled={activeTab === "login" ? isLoginLoading : isRegisterLoading}
    >
      <Tabs
        defaultValue={activeTab}
        onValueChange={(value: string) =>
          setActiveTab(value as "login" | "register")
        }
      >
        <TabsList className="grid w-full grid-cols-2 ">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <FormWrapper
            fields={loginFields}
            formMethods={loginForm}
            error={loginError}
          />
        </TabsContent>
        <TabsContent value="register">
          <FormWrapper
            fields={registerFields}
            formMethods={registerForm}
            error={registerError}
          />
        </TabsContent>
      </Tabs>
    </Modal>
  );
};

export default AuthTabs;
