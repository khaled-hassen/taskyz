import { ILoginForm, IRegisterForm } from "../types/form.types";
import { FieldErrors } from "react-hook-form";
import { ApolloError } from "@apollo/client";

export const email = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

export const isEmpty = (val: string) => val.trim().length === 0;
export const required = (val: string) => !isEmpty(val);

export const getApolloError = (serverErrors: ApolloError) =>
  serverErrors.message;

export function getRegisterError(errors: FieldErrors<IRegisterForm>) {
  if (errors.firstName?.type === "validate") return "First name is required";
  if (errors.lastName?.type === "validate") return "Last name is required";
  if (errors.email?.type === "pattern") return "Invalid email";
  if (errors.email?.type === "validate") return "Email is required";
  if (errors.password?.type === "validate") return "Password is required";
  if (errors.password?.type === "minLength")
    return "Password should be at least 6 characters long";
  if (errors.confirm?.type === "validate") return "Password doesn't match";
  return null;
}

export function getLoginError(clientErrors: FieldErrors<ILoginForm>) {
  if (clientErrors.email?.type === "pattern") return "Invalid email";
  if (clientErrors.email?.type === "validate") return "Email is required";
  if (clientErrors.password?.type === "validate") return "Password is required";
  if (clientErrors.password?.type === "minLength")
    return "Password should be at least 6 characters long";
  return null;
}
