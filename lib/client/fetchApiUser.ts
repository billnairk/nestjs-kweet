import { useState } from "react";

interface fetchApiUserType<T> {
  loading: boolean;
  data?: T;
  error?: object;
}

type fetchApiUserResultType<T> = [
  (validForm: any) => void,
  fetchApiUserType<T>
];

export default function fetchApiUser<T>(
  url: string
): fetchApiUserResultType<T> {
  const [state, setState] = useState<fetchApiUserType<T>>({
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
      })
      .catch((error) => setState((prev) => ({ ...prev, error })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }
  return [fetchApi, { ...state }];
}
