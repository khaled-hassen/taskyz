import React, { useContext, useState } from "react";
import { Title, P } from "../styles/Text";
import { IconButton } from "../styles/Button";
import LogoutIcon from "../icons/LogoutIcon";
import { toast } from "react-hot-toast";
import { getApolloError } from "../../utils/form.utils";
import { useMutation } from "@apollo/client";
import { LogoutMutation } from "../../graphql/user.graphql";
import { useHistory } from "react-router-dom";
import MenuIcon from "../icons/MenuIcon";
import Sidebar from "../Sidebar/Sidebar";
import { TopBarContainer } from "../styles/Containers";
import { TopBarCardContainer } from "../styles/CardContainer";
import { convertHSLToString } from "../../utils/style.utils";
import { AppConfig } from "../../store/app.config";
import Modal from "../Modal/Modal";
import CustomizationModal from "../Modal/CustomizationModal";

interface IProps {
  onLogout(): void;
}

const Header: React.FC<IProps> = (props) => {
  const { colors } = useContext(AppConfig);
  const [showSidebar, setShowSidebar] = useState(false);
  const [show, setShow] = useState(false);
  const [logout] = useMutation(LogoutMutation, { fetchPolicy: "no-cache" });
  const history = useHistory();

  async function handleLogout() {
    try {
      await toast.promise(logout(), {
        loading: "Logging out",
        success: "Logged out",
        error: (error) => getApolloError(error),
      });
      history.replace("/");
      props.onLogout();
    } catch (_) {}
  }

  return (
    <TopBarContainer>
      <Modal show={showSidebar} onClose={() => setShowSidebar(false)}>
        <Sidebar
          onSwitch={() => setShowSidebar(false)}
          onOpenCustomization={() => setShow(true)}
        />
      </Modal>
      <div className="lg:hidden flex items-center">
        <TopBarCardContainer>
          <IconButton
            className="md:transform-none transform -translate-x-1.5"
            aria-label="Menu"
            onClick={() => setShowSidebar(true)}
          >
            <MenuIcon />
          </IconButton>
        </TopBarCardContainer>
      </div>
      <div className="col-start-2 flex justify-center">
        <TopBarCardContainer>
          <Title small>Taskyz</Title>
        </TopBarCardContainer>
      </div>
      <div className="flex justify-end col-start-3">
        <TopBarCardContainer>
          <IconButton aria-label="logout" onClick={handleLogout}>
            <LogoutIcon />
            <P
              className="hidden md:block font-semibold"
              style={{
                color: `hsl(${convertHSLToString(colors.dangerColor)})`,
              }}
            >
              Logout
            </P>
          </IconButton>
        </TopBarCardContainer>
      </div>

      <CustomizationModal show={show} onClose={() => setShow(false)} />
    </TopBarContainer>
  );
};

export default Header;
