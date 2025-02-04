import { FormMessage } from "@/components/ui/form";
import { TCustomError, TResponseError } from "@/types/Global.Types";

const isCustomError = (error: any): error is TCustomError =>
  error?.data?.message;

const ApiError = ({ error }: TResponseError) => {
  if (!error) return null;

  let errorMessage = "An unknown error occurred.";

  if (isCustomError(error)) errorMessage = error.data.message;

  return (
      <FormMessage className="mt-2">{errorMessage}</FormMessage>
  );
};

export default ApiError;
