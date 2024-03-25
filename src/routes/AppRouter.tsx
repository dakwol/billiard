import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { RouteNames, privateRoutes, publicRoutes } from "./index";
import { useTypeSelector } from "../hooks/useTypedSelector";
import Loader from "../components/Loader/Loader";

const AppRouter = () => {
  // const isAuthenticated = !!localStorage.getItem("access");
  const isAuthenticated = true;
  const navigate = useNavigate();
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedRoute = localStorage.getItem("currentRoute");

    if (storedRoute) {
      setInitialRoute(storedRoute);
    } else {
      setInitialRoute(RouteNames.HOMEPAGE);
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      localStorage.setItem("currentRoute", window.location.pathname);
    };

    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [window.location.pathname]);

  return (
    <>
      <Loader isLoading={isLoading} />
      <Routes>
        {isAuthenticated
          ? privateRoutes.map((route) => (
              <Route
                path={route.path}
                element={<route.element />}
                key={route.path}
              />
            ))
          : publicRoutes.map((route) => (
              <Route
                path={route.path}
                element={<route.element />}
                key={route.path}
              />
            ))}
      </Routes>
    </>
  );
};

export default AppRouter;
