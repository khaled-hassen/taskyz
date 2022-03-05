import React, { useState } from "react";
import AddInput from "../components/Form/AddInput";
import { H1 } from "../components/styles/Text";
import {
  IAddCollectionMutation,
  ICollection,
  ICollectionsQuery,
} from "../types/graphql.types";
import { useMutation, useQuery } from "@apollo/client";
import {
  AddCollectionMutation,
  CollectionsQuery,
  DeleteCollectionMutation,
} from "../graphql/collection.graphql";
import { toast } from "react-hot-toast";
import { getApolloError } from "../utils/form.utils";
import { IInputForm } from "../types/form.types";
import { useHistory } from "react-router-dom";
import Row from "../components/styles/Row";
import CollectionsTransition from "../components/Collection/CollectionsTransition";
import { Page } from "../components/styles/Containers";
import { LoadingCollectionsHeader } from "../components/LoadingIndicators/LoadingHeader";
import { Helmet } from "react-helmet";

interface IProps {
  withHeader: boolean;
}

const CollectionsPage: React.FC<IProps> = (props) => {
  const history = useHistory();
  const [collections, setCollections] = useState<ICollection[]>([]);

  const { loading } = useQuery<ICollectionsQuery>(CollectionsQuery, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => setCollections(data.collections),
    onError: (error) => toast.error(getApolloError(error)),
  });

  const [addCollection] = useMutation<IAddCollectionMutation>(
    AddCollectionMutation
  );

  const [deleteCollection] = useMutation(DeleteCollectionMutation);

  async function handleAddCollection({ value }: IInputForm) {
    try {
      const { data } = await toast.promise(
        addCollection({ variables: { name: value } }),
        {
          loading: "Adding collection...",
          success: "Collection added",
          error: (error) => getApolloError(error),
        }
      );
      if (data && data.addCollection)
        setCollections((prev) => [...prev, data.addCollection]);
    } catch (_) {}
  }

  function handleDeleteCollection(id: string) {
    toast
      .promise(deleteCollection({ variables: { id } }), {
        loading: "Deleting collection...",
        success: "Collection deleted",
        error: (error) => getApolloError(error),
      })
      .then(() => setCollections((prev) => prev.filter((col) => col.id !== id)))
      .catch((_) => {});
  }

  return (
    <Page withHeader={props.withHeader}>
      <Helmet>
        <title>Taskyz: Collections</title>
      </Helmet>

      <H1 className="mb-4">Collections</H1>
      {loading ? (
        <LoadingCollectionsHeader />
      ) : (
        <AddInput
          placeholder="Add a collection"
          error="Collection name is required"
          onAdd={handleAddCollection}
        />
      )}
      <CollectionsTransition
        scrollable
        collections={collections}
        loading={loading}
        onClick={(id) => history.push(`/collections/${id}`)}
        onDelete={(id) => handleDeleteCollection(id)}
      />
    </Page>
  );
};

export default CollectionsPage;
