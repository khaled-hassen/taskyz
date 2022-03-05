import React from "react";
import Modal from "./Modal";
import { CardContainer } from "../styles/CardContainer";
import { H2, P } from "../styles/Text";

interface IProps {
  show: boolean;
  onClose(): void;
}

const BackdropSupportModal: React.FC<IProps> = (props) => {
  return (
    <Modal large show={props.show} onClose={props.onClose}>
      <CardContainer className="w-2/3 h-2/3 overflow-auto">
        <H2 className="mb-3">Browser support:</H2>
        <P>
          Unfortunately, it seems that your browser doesn't support the
          backdrop-filter css property. It means that the glassy effect won't be
          working.
        </P>
        <H2 className="mt-5 mb-3">
          How to enable backdrop-filter (in some browsers):
        </H2>
        <P className="mb-2">Mozilla Firefox:</P>
        <ol className="list-decimal list-inside">
          <li>Go to "about:config"</li>
          <li>Click on "Accept the Risk and Continue" button</li>
          <li>
            Search for "layout.css.backdrop-filter.enabled" and set it to "true"
          </li>
          <li>Search for "gfx.webrender.all" and set it to "true"</li>
          <li>Refresh the page and voila glassy effect is working</li>
        </ol>
        <H2 className="mt-3 mb-2">Chromium based browsers:</H2>
        <p>
          If you are using a chromium based browser such as chrome and brave (
          <a
            className="text-blue-500 hover:underline"
            href="https://en.wikipedia.org/wiki/Chromium_(web_browser)#Browsers_based_on_Chromium"
            target="_blank"
            rel="noreferrer"
          >
            Click here for more
          </a>
          ) please update your browser and the glassy should be working.
        </p>
      </CardContainer>
    </Modal>
  );
};

export default BackdropSupportModal;
