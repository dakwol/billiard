import React, { FC } from "react";
import "./styles.scss";
import icons from "../../assets/icons/icons";
import { RouteNames, navDate } from "../../routes";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer: FC = () => {
  const navigation = useNavigate();
  const date = new Date().getFullYear();

  const { t, i18n } = useTranslation();

  return (
    <footer className="footer">
      <div className="upContainerFooter">
        <div className="ccContainer">
          <b className="year">{date}</b>
        </div>
        <p onClick={() => {}} className="condificial">
          {t("conf")}
        </p>
      </div>

      <div className="downContainerFooter">
        <div className="containerIndicator">
          <h1 className="indicatorLogo">{t("logo")}</h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
