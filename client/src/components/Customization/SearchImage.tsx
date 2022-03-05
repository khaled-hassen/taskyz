import React, { forwardRef, MutableRefObject } from "react";
import { IconInputContainer } from "../styles/Input";
import { IconButton, Spinner } from "../styles/Button";
import CancelIcon from "../icons/CancelIcon";
import SearchIcon from "../icons/SearchIcon";
import { H2, H3, P } from "../styles/Text";
import { ResultContainer } from "../styles/ImageStyles";
import Image from "../Image/Image";
import ImageViewer from "../Image/ImageViewer";
import { FullParentContainer } from "../styles/ModalStyles";
import Row from "../styles/Row";
import LeftArrowIcon from "../icons/LeftArrowIcon";
import { IImage } from "../../types/style.types";
import ImageIcon from "../icons/ImageIcon";
import LinkButton from "../styles/LinkButton";

interface IProps {
  defaultValue: string;
  showImage: boolean;
  loading: boolean;
  image: IImage | null;
  recentlyOpened: IImage[];
  searchResult: IImage[] | null;
  openImage(image: IImage): void;
  closeImage(): void;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  clearSearch(): void;
  onClose(): void;
}

interface IRefs {
  input: MutableRefObject<HTMLInputElement | null>;
  lastElementRef: (node: HTMLDivElement) => void;
}

const SearchImage = forwardRef<IRefs, IProps>((props, refs) => {
  const showNotFound = () =>
    !props.loading &&
    !props.showImage &&
    props.searchResult &&
    props.searchResult.length === 0;

  const showRecentlyOpened = () =>
    !props.loading &&
    !props.showImage &&
    !props.searchResult &&
    props.recentlyOpened.length > 0;

  const showResults = () =>
    !props.showImage && props.searchResult && props.searchResult.length > 0;

  const showCancelButton = () => !props.loading && props.searchResult;

  const showImageViewer = () =>
    !props.loading && props.showImage && props.image;

  return (
    <FullParentContainer>
      {!props.showImage && (
        <Row centerItems className="mb-6">
          <IconButton
            className="mr-3 transform -translate-x-2"
            onClick={props.onClose}
          >
            <LeftArrowIcon size={30} />
          </IconButton>
          <IconInputContainer
            className="flex-1"
            onSubmit={(e) => e.preventDefault()}
          >
            <Row centerItems>
              {showCancelButton() ? (
                <IconButton onClick={props.clearSearch}>
                  <CancelIcon />
                </IconButton>
              ) : (
                <SearchIcon />
              )}
              <input
                ref={(refs as MutableRefObject<IRefs>).current.input}
                autoFocus
                defaultValue={props.defaultValue}
                autoComplete="off"
                placeholder="Search for image"
                onChange={props.onChange}
              />
            </Row>
          </IconInputContainer>
        </Row>
      )}
      {showNotFound() && (
        <div className="flex-1 grid place-items-center">
          <div className="flex flex-col items-center">
            <P className="opacity-80">Sorry, we can't found any results</P>
            <ImageIcon className="opacity-20" />
          </div>
        </div>
      )}
      {showRecentlyOpened() && (
        <>
          <H2 className="mb-6">
            Photos by{" "}
            <LinkButton
              inherit
              onClick={() => window.open("https://unsplash.com/")}
            >
              Unsplash
            </LinkButton>
          </H2>
          <H3 className="mb-6">Recently opened</H3>
          <ResultContainer>
            {props.recentlyOpened.map((image, idx) => (
              <Image
                key={idx}
                image={image}
                onClick={() => props.openImage(image)}
              />
            ))}
          </ResultContainer>
        </>
      )}
      {showResults() && (
        <ResultContainer>
          {props.searchResult!.map((image, idx) => (
            <Image
              ref={
                props.searchResult!.length === idx + 1
                  ? (refs as MutableRefObject<IRefs>).current.lastElementRef
                  : undefined
              }
              image={image}
              onClick={() => props.openImage(image)}
            />
          ))}
        </ResultContainer>
      )}
      {props.loading && (
        <div className="grid flex-1 py-5 place-items-center">
          <Spinner />
        </div>
      )}
      {showImageViewer() && (
        <ImageViewer image={props.image!} onClose={props.closeImage} />
      )}
    </FullParentContainer>
  );
});

export default SearchImage;
