import { FC, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import profileBanner from "@/assets/profileBanner.jpg";
import SetAddress from "@/component/pages/profile/SetAddress";
import { useProfileQuery } from "@/app/features/user/userApi";
import UpdatePassword from "@/component/pages/profile/UpdatePassword";
import ProfileSection from "@/component/pages/profile/ProfileSection";

const Profile: FC = () => {
  const { data: profile, isFetching } = useProfileQuery(undefined);

  // Dialog open state for address and password
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);

  return (
    <div className="flex w-full flex-col max-lg:justify-center max-lg:items-center lg:flex-row h-full">
      {/* Profile Banner Section */}
      <section className="flex flex-col items-center justify-center gap-4 p-4 border rounded-md lg:w-1/2">
        {isFetching ? (
          <Skeleton className="w-full h-72" />
        ) : (
          <>
            <img
              src={profileBanner}
              alt="profile-banner"
              className="w-72 md:w-80 object-cover rounded-md"
            />
            <h1 className="text-2xl font-semibold">
              <span className="font-bold">Hello, </span>
              {profile?.data?.name}
            </h1>
            <p className="text-base">Welcome to BikeStore Dashboard</p>
          </>
        )}
      </section>

      {/* Profile Info Sections */}
      <section className="flex flex-col max-lg:w-full lg:w-1/2 lg:px-12 gap-y-4 max-lg:mt-4">
        <ProfileSection
          title="Delivery Address"
          content={profile?.data?.deliveryAddress || "Set delivery address"}
          onEdit={() => setAddressDialogOpen(true)}
          isLoading={isFetching}
        />
        <ProfileSection
          title="Password"
          content="******"
          onEdit={() => setPasswordDialogOpen(true)}
        />
      </section>

      {/* Modals for editing */}
      <SetAddress
        key={profile?.data?.deliveryAddress}
        open={addressDialogOpen}
        initialValue={profile?.data?.deliveryAddress || ""}
        setOpen={setAddressDialogOpen}
      />
      <UpdatePassword
        open={passwordDialogOpen}
        setOpen={setPasswordDialogOpen}
      />
    </div>
  );
};

export default Profile;
