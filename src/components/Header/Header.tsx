import React, { FC, useEffect, useState } from "react";
import icons from "../../assets/icons/icons";
import Buttons from "../Buttons/Buttons";
import "./styles.scss";
import { useDispatch } from "react-redux";
import { useTypeSelector } from "../../hooks/useTypedSelector";
//@ts-ignore
import { Link, useNavigate } from "react-router-dom";
import { RouteNames, navDate } from "../../routes";
import { useTheme } from "../../hooks/useTheme";
import { useTranslation } from "react-i18next";
const Header: FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const urlParams = window.location.pathname.split("/");
  const { theme, setTheme } = useTheme();

  const [language, setLanguage] = useState(localStorage.getItem("i18nextLng"));

  const [isMobile, setIsMobile] = useState(false);

  const { t, i18n } = useTranslation();

  const changeLanguage = (language: any) => {
    i18n.changeLanguage(language);
    setLanguage(language);
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 1100);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleThemeClick = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className={`header ${isMobile && "mobile"}`}>
      <div className="containerHeader">
        <div className="buttonHeaderContainer">
          <Buttons
            text={language === "en" ? "Eng" : "Rus"}
            ico={icons.ArrowRotate}
            onClick={() => {
              changeLanguage(language === "en" ? "ru" : "en");
            }}
            className="lgButton"
          ></Buttons>
          <Buttons
            text={theme === "light" ? "День" : "Ночь"}
            ico={icons.ArrowRotate}
            onClick={() => {
              handleThemeClick();
            }}
            className="lgButton"
          ></Buttons>
        </div>
        <div className="logo">
          <h4
            className="logoTitle"
            onClick={() => navigation(RouteNames.HOMEPAGE)}
          >
            {t("logo")}
          </h4>
        </div>
      </div>
    </header>
  );
};

export default Header;
