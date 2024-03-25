import React from "react";
import HomePage from "../pages/HomePage/HomePage";

const isAuthenticated = !!localStorage.getItem("access");

export interface IRoute {
    path: string;
    element : React.ComponentType;
    exact?: boolean;
    params?: { [key: string]: string | number };
}

export enum RouteNames {
    HOMEPAGE = '/',
    // LOGIN = '/login',
}

export const navDate = [
 
    // {
    //   id: 1,
    //   name: "Авторизация",
    //   link: RouteNames.LOGIN,
    // },
    
  ];
export const publicRoutes: IRoute[] = [
  // {path: RouteNames.LOGIN, exact: true, element: HomePage},
  {path: RouteNames.HOMEPAGE, exact: true, element: HomePage},
]

export const privateRoutes: IRoute[] = [
  // {path: RouteNames.LOGIN, exact: true, element: HomePage},
  {path: RouteNames.HOMEPAGE, exact: true, element: HomePage},
]