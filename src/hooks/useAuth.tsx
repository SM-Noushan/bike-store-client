import { toast } from "sonner";
import { baseApi } from "@/app/api/baseApi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { logout, selectCurrentUser } from "@/app/features/api/authSlice";

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(baseApi.util.resetApiState());
    navigate("/");
    toast.success("Logged out successful");
  };

  return { handleLogout, currentUser };
};
