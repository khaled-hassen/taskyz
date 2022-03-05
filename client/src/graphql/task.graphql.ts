import { gql } from "@apollo/client";

export const AddTaskMutation = gql`
  mutation AddTask($id: ID!, $name: String!, $dueDate: Date) {
    addTask(id: $id, name: $name, dueDate: $dueDate) {
      id
      name
      isDone
      dueDate
    }
  }
`;

export const UpdateTaskMutation = gql`
  mutation UpdateTask(
    $id: ID!
    $newName: String
    $isDone: Boolean
    $dueDate: Date
  ) {
    updateTask(id: $id, newName: $newName, isDone: $isDone, dueDate: $dueDate) {
      name
    }
  }
`;

export const DeleteTaskMutation = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;
