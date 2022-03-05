import React from "react";
import { OverviewCardContainer } from "../styles/CardContainer";
import { H3 } from "../styles/Text";
import { CSSTransition, SwitchTransition } from "react-transition-group";

interface IProps {
  state: boolean;
  content: number;
  message: string;
}

const OverviewCard: React.FC<IProps> = (props) => {
  return (
    <OverviewCardContainer>
      <SwitchTransition>
        <CSSTransition
          key={props.state ? "loading" : "done"}
          classNames="fade"
          mountOnEnter
          unmountOnExit
          addEndListener={(node, done) =>
            node.addEventListener("transitionend", done, false)
          }
        >
          <div>
            {props.state ? (
              <div className="animate-pulse opacity-20">
                <div
                  style={{ backgroundColor: "hsl(var(--text-color))" }}
                  className="h-4 w-3/5 rounded-full mb-11"
                />
                <div
                  style={{ backgroundColor: "hsl(var(--text-color))" }}
                  className="h-4 w-4/5 rounded-full"
                />
              </div>
            ) : (
              <>
                <H3>{props.content}</H3>
                <H3>{props.message}</H3>
              </>
            )}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </OverviewCardContainer>
  );
};

export default OverviewCard;
