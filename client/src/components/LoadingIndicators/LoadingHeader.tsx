import React from "react";
import Row from "../styles/Row";
import { LoadingHeaderContainer } from "../styles/Containers";

interface IProps {}

export const LoadingCollectionHeader: React.FC<IProps> = (props) => {
  return (
    <LoadingHeaderContainer className="animate-pulse opacity-20">
      <div className="h-4 bg-text-color w-1/2 rounded-full" />
      <Row between centerItems className="mt-5">
        <div className="h-4 bg-text-color w-1/4 rounded-full" />
        <div className="bg-text-color h-4 w-20 sm:w-1/5 rounded-full" />
      </Row>
      <Row centerItems className="my-5 gap-4">
        <div className="rounded-full bg-text-color h-6 w-6" />
        <div className="h-4 bg-text-color flex-1 rounded-full" />
      </Row>
    </LoadingHeaderContainer>
  );
};

export const LoadingCollectionsHeader: React.FC<IProps> = (props) => {
  return (
    <LoadingHeaderContainer>
      <Row centerItems className="my-5 gap-4 animate-pulse opacity-20">
        <div className="bg-text-color rounded-full h-6 w-6" />
        <div className="bg-text-color h-4 flex-1 rounded-full" />
      </Row>
    </LoadingHeaderContainer>
  );
};
