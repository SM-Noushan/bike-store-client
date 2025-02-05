import { TUserRole } from "@/types";
import { useAppSelector } from "@/app/hook";
import { Navigate } from "react-router-dom";
import { selectCurrentUser } from "@/app/features/api/authSlice";

function ProtectedRoute({
  children,
  role,
}: {
  children: React.ReactNode;
  role: TUserRole[];
}) {
  const currentUser = useAppSelector(selectCurrentUser);

  if (!currentUser || !role.includes(currentUser?.role as TUserRole))
    return <Navigate to="/dashboard" replace />;

  return children;
}

export default ProtectedRoute;
