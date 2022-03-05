import { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { getApolloError } from "../../utils/form.utils";
import { ApolloError } from "@apollo/client";

interface IToastMsgs {
  loading: string;
  success: string;
}

export function useLoadingToast(
  loading: boolean,
  error: ApolloError | undefined,
  msgs: IToastMsgs
) {
  const toastId = useRef<string | null>(null);

  useEffect(() => {
    if (loading && !toastId.current)
      toastId.current = toast.loading(msgs.loading);
    if (!loading && toastId.current) {
      if (error) toast.error(getApolloError(error), { id: toastId.current });
      else toast.success(msgs.success, { id: toastId.current });
      toastId.current = null;
    }
  }, [loading, error]);
}
