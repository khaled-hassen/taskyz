import { gql } from "@apollo/client";

export const CollectionsQuery = gql`
  query {
    collections {
      id
      name
      totalTasks
      updatedAt
      completedTasks
    }
  }
`;

export const AddCollectionMutation = gql`
  mutation AddCollection($name: String!) {
    addCollection(name: $name) {
      id
      name
      totalTasks
      updatedAt
      completedTasks
    }
  }
`;

export const CollectionQuery = gql`
  query Collection($id: ID!) {
    collection(id: $id) {
      id
      name
      completedTasks
      updatedAt
      tasks {
        id
        name
        dueDate
        isDone
      }
    }
  }
`;

export const UpdateCollectionMutation = gql`
  mutation UpdateCollection($id: ID!, $newName: String!) {
    updateCollection(id: $id, newName: $newName) {
      name
      updatedAt
    }
  }
`;

export const DeleteCollectionMutation = gql`
  mutation DeleteCollection($id: ID!) {
    deleteCollection(id: $id)
  }
`;

export const OverviewQuery = gql`
  query {
    overview {
      completedTasks
      upcomingTasksNumber
      recentlyModified {
        name
        updatedAt
        completedTasks
        totalTasks
        id
      }
    }
  }
`;

export const SearchQuery = gql`
  query search($query: String!) {
    search(query: $query) {
      name
      updatedAt
      totalTasks
      completedTasks
      tasks {
        name
        dueDate
        isDone
      }
    }
  }
`;
