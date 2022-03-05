import React, { useState } from "react";
import { H1 } from "../components/styles/Text";
import OverviewCard from "../components/OverviewCard/OverviewCard";
import CollectionsTransition from "../components/Collection/CollectionsTransition";
import { ICollection } from "../types/graphql.types";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { OverviewQuery } from "../graphql/collection.graphql";
import { toast } from "react-hot-toast";
import { getApolloError } from "../utils/form.utils";
import { OverviewContainer, Page } from "../components/styles/Containers";
import { Helmet } from "react-helmet";

interface IProps {
  withHeader: boolean;
}

const OverviewPage: React.FC<IProps> = (props) => {
  const [totalCompletedTasks, setTotalCompletedTasks] = useState(0);
  const [upcomingTasks, setUpcomingTasks] = useState(0);
  const [collections, setCollections] = useState<ICollection[]>([]);
  const history = useHistory();

  const { loading } = useQuery(OverviewQuery, {
    fetchPolicy: "cache-and-network",
    onCompleted: ({ overview }) => {
      setTotalCompletedTasks(overview.completedTasks);
      setUpcomingTasks(overview.upcomingTasksNumber);
      setCollections(overview.recentlyModified);
    },
    onError: (error) => toast.error(getApolloError(error)),
  });

  return (
    <Page withHeader={props.withHeader}>
      <Helmet>
        <title>Taskyz: Overview</title>
      </Helmet>
      <H1>Overview</H1>
      <OverviewContainer>
        <OverviewCard
          state={loading}
          content={totalCompletedTasks}
          message="Completed Tasks"
        />
        <OverviewCard
          state={loading}
          content={upcomingTasks}
          message="Upcoming Tasks"
        />
      </OverviewContainer>
      <H1>Recently Modified</H1>
      <CollectionsTransition
        collections={collections}
        loading={loading}
        onClick={(id) => history.push(`/collections/${id}`)}
      />
    </Page>
  );
};

export default OverviewPage;
