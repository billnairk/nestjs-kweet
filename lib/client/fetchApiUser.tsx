import { useState } from "react";

interface fetchApiUserType {
  loading: boolean;
  error?: object;
  data?: {
    existUser: string;
    success: boolean;
  };
}

type fetchApiUserResultType = [(validForm: any) => void, fetchApiUserType];

export default function fetchApiUser(url: string): fetchApiUserResultType {
  const [state, setState] = useState<fetchApiUserType>({
    loading: false,
    error: undefined,
    data: undefined,
  });
  function fetchApi(validForm: any) {
    setState((prev) => ({ ...prev, loading: true }));
    fetch(url, {
      method: "POST",
      body: JSON.stringify(validForm),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json().catch(() => {}))
      .then((data) => {
        setState((prev) => ({ ...prev, data }));
        console.log(state.data?.success);
      })
      .catch((error) => setState((prev) => ({ ...prev, error })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }
  // console.log(state.data);
  return [fetchApi, { ...state }];
}
