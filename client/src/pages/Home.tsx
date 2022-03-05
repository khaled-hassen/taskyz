import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import {
  Containers,
  Content,
  ResponsiveSidebar,
} from "../components/styles/Containers";
import Header from "../components/Header/Header";
import { Route, Switch } from "react-router-dom";
import BackdropSupportModal from "../components/Modal/BackdropSupportModal";
import MediaQuery, { useMediaQuery } from "react-responsive";
import CustomizationModal from "../components/Modal/CustomizationModal";
import { getBackdropSupport } from "../utils/browser.utils";
import { H1, H2 } from "../components/styles/Text";
import loadable from "@loadable/component";

const OverviewPage = loadable(() => import("./OverviewPage"));
const CollectionsPage = loadable(() => import("./CollectionsPage"));
const TasksPage = loadable(() => import("./TasksPage"));

interface IProps {
  onLogout(): void;
}

const Home: React.FC<IProps> = (props) => {
  const [show, setShow] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const smallScreenSize = 768;
  const isSmall = useMediaQuery({ maxWidth: smallScreenSize });

  useEffect(() => {
    const key = "browser-support";
    const exists = !!localStorage.getItem(key);
    if (!getBackdropSupport() && !exists) {
      setShowWarning(true);
      localStorage.setItem(key, "true");
    }
  }, []);

  return (
    <>
      <MediaQuery minWidth={smallScreenSize}>
        <Header onLogout={props.onLogout} />
      </MediaQuery>
      <Containers>
        <ResponsiveSidebar>
          <Sidebar onOpenCustomization={() => setShow(true)} />
        </ResponsiveSidebar>
        <Content>
          <MediaQuery maxWidth={smallScreenSize}>
            <Header onLogout={props.onLogout} />
          </MediaQuery>
          <Switch>
            <Route exact path="/">
              <OverviewPage withHeader={isSmall} />
            </Route>
            <Route exact path={`/collections`}>
              <CollectionsPage withHeader={isSmall} />
            </Route>
            <Route exact path="/collections/:id">
              <TasksPage withHeader={isSmall} />
            </Route>
            <Route>
              <div className="grid place-items-center h-full">
                <div className="text-center">
                  <H1>404</H1>
                  <H2>Not Found</H2>
                </div>
              </div>
            </Route>
          </Switch>
        </Content>
      </Containers>

      <CustomizationModal show={show} onClose={() => setShow(false)} />
      <BackdropSupportModal
        show={showWarning}
        onClose={() => setShowWarning(false)}
      />
    </>
  );
};

export default Home;
