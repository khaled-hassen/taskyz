import React from "react";
import { OverviewCardContainer } from "../styles/CardContainer";

interface IProps {}

const LoadingInfoCard: React.FC<IProps> = (props) => {
  return (
    <OverviewCardContainer>
      <div className="animate-pulse opacity-20">
        <div className="h-4 bg-custom-white w-3/5 rounded-full mb-11" />
        <div className="h-4 bg-custom-white w-4/5 rounded-full" />
      </div>
    </OverviewCardContainer>
  );
};

export default LoadingInfoCard;
