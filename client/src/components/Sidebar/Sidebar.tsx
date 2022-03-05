import React, { useEffect, useState } from "react";
import HomeIcon from "../icons/HomeIcon";
import CollectionIcon from "../icons/CollectionIcon";
import { IconButton } from "../styles/Button";
import { SidebarContainer } from "../styles/Containers";
import { useHistory, useLocation } from "react-router-dom";
import CustomizeIcon from "../icons/CustomizeIcon";
import { P } from "../styles/Text";

enum ELocation {
  OVERVIEW,
  COLLECTIONS,
}

interface IProps {
  onOpenCustomization(): void;
  onSwitch?(): void;
}

const Sidebar: React.FC<IProps> = (props) => {
  const [activeTab, setActiveTab] = useState(ELocation.OVERVIEW);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;
    if (pathname.includes("/collections")) setActiveTab(ELocation.COLLECTIONS);
    else setActiveTab(ELocation.OVERVIEW);
  }, [location]);

  function switchToOverview() {
    props.onSwitch?.();
    history.push("/");
    setActiveTab(ELocation.OVERVIEW);
  }

  function switchToCollections() {
    props.onSwitch?.();
    history.push("/collections");
    setActiveTab(ELocation.COLLECTIONS);
  }

  function handleOpenCustomization() {
    props.onOpenCustomization();
    props.onSwitch?.();
  }

  return (
    <SidebarContainer onMouseDown={(e) => e.stopPropagation()}>
      <div>
        <IconButton
          inactive={activeTab !== ELocation.OVERVIEW}
          onClick={switchToOverview}
        >
          <HomeIcon />
          <P>Overview</P>
        </IconButton>
        <IconButton
          inactive={activeTab !== ELocation.COLLECTIONS}
          onClick={switchToCollections}
        >
          <CollectionIcon />
          <P>Collections</P>
        </IconButton>
      </div>
      <IconButton onClick={handleOpenCustomization}>
        <CustomizeIcon />
        <P>Customize</P>
      </IconButton>
    </SidebarContainer>
  );
};

export default Sidebar;
