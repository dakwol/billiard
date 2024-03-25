import React, { FC, Fragment, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./styles.scss";
import Footer from "../../components/Footer/Footer";
import icons from "../../assets/icons/icons";
import ProgectApiRequest from "../../api/Project/Project";
import { IDataCard } from "../../models/IDataCard";
import BallPoll from "../../components/BallPoll/BallPoll";

const HomePage: FC = () => {
  const projectsApi = new ProgectApiRequest();

  const [dataCard, setDataCard] = useState<IDataCard[]>([]);

  return (
    <Fragment>
      <section className="section">
        <Header />
        <div className="sectionContainer">
          <BallPoll />
        </div>
        <Footer />
      </section>
    </Fragment>
  );
};

export default HomePage;
