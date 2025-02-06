import { TUserRole } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

function ProtectedRoute({
  children,
  role,
}: {
  children: React.ReactNode;
  role: TUserRole[];
}) {
  const { currentUser } = useAuth();

  if (!currentUser || !role.includes(currentUser?.role as TUserRole))
    return <Navigate to="/dashboard" replace />;

  return children;
}

export default ProtectedRoute;
