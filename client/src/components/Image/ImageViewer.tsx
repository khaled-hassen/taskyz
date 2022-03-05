import React, { useContext, useState } from "react";
import _omit from "lodash.omit";
import { H3, P } from "../styles/Text";
import LinkButton from "../styles/LinkButton";
import { useMutation } from "@apollo/client";
import { SaveUserConfigMutation } from "../../graphql/user.graphql";
import {
  IconButton,
  PrimaryButton,
  Spinner,
  SuccessButton,
} from "../styles/Button";
import Row from "../styles/Row";
import { toast } from "react-hot-toast";
import { getApolloError } from "../../utils/form.utils";
import LeftArrowIcon from "../icons/LeftArrowIcon";
import { ImageViewerContainer } from "../styles/ImageStyles";
import { IImage } from "../../types/style.types";
import { AppConfig } from "../../store/app.config";

interface IProps {
  image: IImage;
  onClose(): void;
}

const ImageViewer: React.FC<IProps> = (props) => {
  const { changeBgImage, bgImage } = useContext(AppConfig);
  const [currentBgImageUrl, setCurrentBgImageUrl] = useState(bgImage.url);
  const [saveBgImage, { loading }] = useMutation(SaveUserConfigMutation, {
    fetchPolicy: "no-cache",
    onCompleted: () => toast.success("New background image saved"),
    onError: (error) => toast.error(getApolloError(error)),
  });

  async function handleSetBgImage() {
    if (currentBgImageUrl === props.image.url) return;
    changeBgImage(props.image);
    await saveBgImage({
      variables: { config: { bgImage: _omit(props.image, ["__typename"]) } },
    });
    setCurrentBgImageUrl(props.image.url);
  }

  return (
    <ImageViewerContainer>
      <img src={props.image.url} alt={props.image.alt} />
      <div>
        <div>
          <IconButton onClick={props.onClose}>
            <LeftArrowIcon />
            <P>Go back</P>
          </IconButton>
          <H3 className="mt-5 mb-3">
            Artist:{" "}
            <LinkButton onClick={() => window.open(props.image.creatorUrl)}>
              {props.image.creatorName}
            </LinkButton>
          </H3>
          <p className="text-lg">
            <H3 className="inline-block break-words">Description: </H3>
            {props.image.alt}
          </p>
        </div>

        <div>
          <PrimaryButton
            className="mb-5 py-2.5"
            onClick={() => window.open(props.image.sourceUrl)}
          >
            View Original
          </PrimaryButton>
          <SuccessButton
            className="py-2.5"
            disabled={loading || currentBgImageUrl === props.image.url}
            onClick={handleSetBgImage}
          >
            {currentBgImageUrl === props.image.url ? (
              "Already background"
            ) : (
              <Row center centerItems>
                {loading && <Spinner />}
                {loading ? "Saving..." : "Set as background"}
              </Row>
            )}
          </SuccessButton>
        </div>
      </div>
    </ImageViewerContainer>
  );
};

export default ImageViewer;
