import React, { FC, useEffect } from "react";
import "./App.scss";
import AppRouter from "./routes/AppRouter";
import { BrowserRouter, Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import CustomCursor from "./components/CustomCursor/CustomCursor";
import { useTheme } from "./hooks/useTheme";
import { useTranslation } from "react-i18next";

const App: FC = () => {
  return (
    <div className="App">
      <CustomCursor />
      <AppRouter />
    </div>
  );
};

export default App;
