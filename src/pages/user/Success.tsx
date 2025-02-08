import { toast } from "sonner";
import { useEffect, useState } from "react";
import Loading from "@/component/shared/loader/Loader";
import { useCartHandler } from "@/hooks/useCartHandler";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { resetCartItems } = useCartHandler();
  const [isProcessing, setIsProcessing] = useState(false);
  const sessionId = new URLSearchParams(location.search).get("session_id");
  useEffect(() => {
    if (!sessionId) navigate("/");
    else {
      if (!isProcessing) {
        setIsProcessing(true);
        resetCartItems();
        setTimeout(() => {
          setIsProcessing(false);
          toast.success("Payment successful");
        }, 1000);
      }
    }
  }, []);

  return (
    <>
      {isProcessing && <Loading />}
      <div className="md:min-h-[calc(100dvh-35rem)] flex flex-col items-center justify-center gap-y-5 my-6 px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center mx-auto">
          {isProcessing
            ? "Order payment is processing"
            : "Payment accepted by BIKESTORE"}
        </h2>
        <p className="text-center">
          {isProcessing ? "Once done" : "Now"} you can view your Orders or
          continue Shopping with us
        </p>
        <div className="flex items-center max-md:flex-col gap-5">
          <Link to={"/dashboard/my-orders"}>
            <button className="bg-black text-slate-100 w-52 h-12 rounded-full text-base font-semibold hover:bg-primeColor duration-300">
              View Orders
            </button>
          </Link>
          <Link to={"/bikes"}>
            <button className="bg-black text-slate-100 w-52 h-12 rounded-full text-base font-semibold hover:bg-primeColor duration-300">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Success;
