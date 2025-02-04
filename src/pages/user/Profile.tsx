import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit3 } from "lucide-react";
import Modal from "@/component/modal/Modal";
import SetAddress from "@/component/pages/profile/SetAddress";
import UpdatePassword from "@/component/pages/profile/UpdatePassword";

// ---------------------------------------------------------------------

const Profile: FC = () => {
  // Dummy profile info
  const [userName, setUserName] = useState("John Doe");
  const [userProfileImage, setUserProfileImage] = useState(
    "https://i.pinimg.com/originals/de/32/1e/de321e9f2fd4254c00b6111e7148cfa0.jpg"
  );
  // Dummy delivery address & password info
  const [deliveryAddress, setDeliveryAddress] = useState(
    "123 Bike Lane, Cyclerville, CT 12345"
  );
  const [password, setPassword] = useState("********");

  // Dialog open state for address and password
  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);

  return (
    <div className="flex w-full flex-col max-lg:justify-center max-lg:items-center lg:flex-row h-full">
      {/* Profile Section */}
      <section className="flex flex-col items-center justify-center gap-4 p-4 border rounded-md lg:w-1/2">
        <img
          src={userProfileImage}
          alt={userName}
          className="size-72 md:size-80 object-cover rounded-md"
        />
        <h1 className="text-2xl font-bold">{userName}</h1>
        <p className="text-base">Welcome to BikeStore Dashboard</p>
      </section>

      <section className="flex flex-col max-lg:w-full lg:w-1/2 lg:px-12 gap-y-4 max-lg:mt-4">
        {/* Delivery Address Section */}
        <section className="p-4 border rounded-md lg:flex-1 w-80 md:w-[355px] lg:w-full mx-auto">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Delivery Address</h2>
            <Button variant="ghost" onClick={() => setAddressDialogOpen(true)}>
              <Edit3 size={16} />
            </Button>
          </div>
          <p className="mt-2 text-base">{deliveryAddress}</p>
        </section>

        {/* Password Section */}
        <section className="p-4 border rounded-md lg:flex-1 w-80 md:w-[355px] lg:w-full mx-auto">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Password</h2>
            <Button variant="ghost" onClick={() => setPasswordDialogOpen(true)}>
              <Edit3 size={16} />
            </Button>
          </div>
          <p className="mt-2 text-base">{password}</p>
        </section>
      </section>

      {/* Save Address */}
      <SetAddress
        open={addressDialogOpen}
        initialValue={deliveryAddress}
        setOpen={setAddressDialogOpen}
      />

      {/* Update Password */}
      <UpdatePassword
        open={passwordDialogOpen}
        setOpen={setPasswordDialogOpen}
      />
    </div>
  );
};

export default Profile;
