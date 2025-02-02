import { FC } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Error404: FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleTakeMeHome = () => {
    navigate("/");
  };

  return (
    <section className="bg-neutral-200/65">
      <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
        <div>
          <p className="font-medium text-neutral-800">404 error</p>
          <h1 className="mt-3 text-2xl font-semibold text-neural-800 md:text-3xl">
            We can’t find that page
          </h1>
          <p className="mt-4 text-neural-500">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
          <div className="flex items-center mt-6 gap-x-3">
            <Button
              onClick={handleGoBack}
              variant="outline"
              className="w-1/2 px-5 py-2 text-sm sm:w-auto"
            >
              <ArrowLeft size={16} className="rotate-180" />
              <span>Go back</span>
            </Button>
            <Button
              onClick={handleTakeMeHome}
              className="w-1/2 px-5 py-2 text-sm text-white sm:w-auto "
            >
              Take me home
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Error404;
