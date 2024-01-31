import { createContext, useEffect, useContext, useReducer } from "react";

//Created a json fake api file and applications context before realising it has all been provided....

const ApplicationsContext = createContext();
const BASE_URL = "http://localhost:9000";

const initialState = {
  applications: [],
  isLoading: false,
  currentApplication: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "applications/loaded":
      return { ...state, isLoading: false, applications: action.payload };
    case "application/created":
      return {
        ...state,
        isLoading: false,
        applications: [...state.applications, action.payload],
        currentApplication: action.payload,
      };

    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Error creating application");
  }
}

function ApplicationProvider({ children }) {
  const [{ applications, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchApplications() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/singleAppFixture`);
        const data = await res.json();
        dispatch({ type: "applications/loaded", payload: data });
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "Error loading applications...",
        });
      }
    }
    fetchApplications();
  }, []);

  async function createApplication(newApplication) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/`, {
        method: "POST",
        body: JSON.stringify(newApplication),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "application/created", payload: data });
    } catch (err) {
      dispatch({ type: "rejected", payload: "Error creating application..." });
    }
  }

  return (
    <ApplicationsContext.Provider
      value={{
        applications,
        isLoading,
        createApplication,
        error,
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
}

function useApplications() {
  const context = useContext(ApplicationsContext);
  if (context === undefined)
    throw new Error(
      "ApplicationsContext was used outside ApplicationsProvider"
    );
  return context;
}

export { ApplicationProvider, useApplications };
