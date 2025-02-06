import { FC, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import MyDataTable from "@/component/dataTable/MyDataTable";
import { TDataTableAction, TQueryParams, TUser } from "@/types";
import { useGetAllUserQuery } from "@/app/features/user/userApi";
import { firstPage, itemPerDataTable } from "@/constants/Constant";
import ChangeUserStatus from "@/component/pages/manageUsers/ChangeStatusModal";

const columns: ColumnDef<TUser>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];

// Filter options for the select
const filterOptions = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

const ManageUsers: FC = () => {
  const [params, setParams] = useState<TQueryParams[]>([
    {
      key: "role",
      value: "customer",
    },
    itemPerDataTable,
    firstPage,
  ]);
  const [open, setOpen] = useState(false);
  const [targetId, setTargetId] = useState("");
  const { data: users, isFetching } = useGetAllUserQuery(params);

  const userActions: TDataTableAction<TUser>[] = [
    {
      label: (user: TUser) => (user.isActive ? "Block" : "Unblock"),
      variant: (user: TUser) => (user.isActive ? "danger" : "success"),
      onClick: (user: TUser) => {
        const id = user._id;
        setTargetId(user?.isActive ? `Block ${id}` : `Unblock ${id}`);
        setOpen(true);
      },
    },
  ];

  return (
    <>
      <MyDataTable
        hasSerial
        data={users ? (users.data as TUser[]) : []}
        columns={columns}
        actionColumn={userActions}
        isFetching={isFetching}
        showSearch={true}
        searchPlaceholder="Search by name or email..."
        showFilter={true}
        filterOptions={filterOptions}
        filterKeys={["isActive"]}
        filterPlaceholder="Status"
        setParams={setParams}
        meta={users?.meta}
      />
      {/* Change User Status Modals */}
      {open && targetId && (
        <ChangeUserStatus
          initialValue={targetId}
          open
          setOpen={setOpen}
          resetTargetId={setTargetId}
        />
      )}
    </>
  );
};

export default ManageUsers;
