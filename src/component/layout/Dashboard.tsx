import MySidebar from "./Sidebar/SidebarLayout";
import { USER_ROLE } from "@/constants/Constant";
import ProtectedRoute from "./Sidebar/ProtectedRoute";

const Dashboard = ({ role = [USER_ROLE.admin, USER_ROLE.customer] }) => {
  return (
    <ProtectedRoute role={role}>
      <MySidebar />
    </ProtectedRoute>
  );
};

export default Dashboard;
