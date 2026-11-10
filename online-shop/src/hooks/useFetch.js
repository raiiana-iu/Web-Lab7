import { useEffect, useReducer } from "react";
const initialState = {
  loading: true,
  error: null,
  data: null,
};

function fetchReducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return {
        loading: true,
        error: null,
        data: null,
      };

    case "SUCCESS":
      return {
        loading: false,
        error: null,
        data: action.payload,
      };

    case "ERROR":
      return {
        loading: false,
        error: action.payload,
        data: null,
      };

    default:
      return state;
  }
}

export function useFetch(fetchFunction, dependencies) {
  const [state, dispatch] = useReducer(
    fetchReducer,
    initialState
  );

  useEffect(() => {
    const controller = new AbortController();

    async function loadData() {
      dispatch({ type: "LOADING" });

      try {
        const result = await fetchFunction(controller.signal);

        dispatch({
          type: "SUCCESS",
          payload: result,
        });
      } catch (error) {
        if (error.name !== "AbortError") {
          dispatch({
            type: "ERROR",
            payload: error.message,
          });
        }
      }
    }

    loadData();

    return () => {
      controller.abort();
    };
  }, dependencies);

  return state;
}
