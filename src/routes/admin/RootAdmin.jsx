import { Outlet } from "react-router-dom";
import { createContext } from "react";
import { useReducer } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const AdminAuthContext = createContext({
  user: null,
  userSetter: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        user: action.user,
      };
    case "data":
      return {
        user: action.user,
        data: action.data,
      };
    case "logout":
      return {
        user: null,
      };
  }
}

/**
 * Componente base de las rutas que inician con /docente
 */
function RootAdmin() {
  const [auth, dispatchAuth] = useReducer(authReducer, { user: null });
  const queryClient = new QueryClient();  
  return (
    <QueryClientProvider client={queryClient}>
      <AdminAuthContext.Provider value={{ user: auth, userSetter: dispatchAuth }}>
        <Outlet />
      </AdminAuthContext.Provider>
    </QueryClientProvider>
  );  
}

export { RootAdmin, AdminAuthContext };
