import React, { useEffect } from "react";
import { H2, P } from "../styles/Text";
import Row from "../styles/Row";
import LinkButton from "../styles/LinkButton";
import { Input } from "../styles/Input";
import { PrimaryButton, Spinner } from "../styles/Button";
import { AuthCard } from "../styles/CardContainer";
import { useForm } from "react-hook-form";
import { ILoginForm } from "../../types/form.types";
import { email, getLoginError, required } from "../../utils/form.utils";
import { useLazyQuery } from "@apollo/client";
import { LoginQuery } from "../../graphql/user.graphql";
import { ILoginQuery, IToken } from "../../types/graphql.types";
import { toast } from "react-hot-toast";
import { useLoadingToast } from "../../hook/toast/useLoadingToast";

interface IProps {
  onSwitch(): void;
  onLogin(token: IToken): void;
}

const Login: React.FC<IProps> = (props) => {
  const { register, handleSubmit, formState } = useForm<ILoginForm>({
    reValidateMode: "onSubmit",
  });
  const [login, { loading, error }] = useLazyQuery<ILoginQuery>(LoginQuery, {
    fetchPolicy: "no-cache",
    onCompleted: ({ login }) => props.onLogin(login.token),
  });

  useLoadingToast(loading, error, {
    loading: "Logging in...",
    success: "Logged in",
  });

  function handleLogin(data: ILoginForm) {
    login({ variables: data });
  }

  useEffect(() => {
    const errorMsg = getLoginError(formState.errors);
    if (errorMsg) toast.error(errorMsg);
  }, [formState]);

  return (
    <AuthCard>
      <H2 className="text-center mb-3">Login into your account</H2>
      <Row center className="mb-14">
        <P className="mr-2">Don't have an account yet?</P>
        <LinkButton onClick={props.onSwitch}>Register for free</LinkButton>
      </Row>
      <form onSubmit={handleSubmit(handleLogin)}>
        <Input
          autoFocus
          placeholder="Email"
          className="mb-4"
          {...register("email", { validate: required, pattern: email })}
        />
        <Input
          placeholder="Password"
          className="mr-0.5"
          type="password"
          {...register("password", { validate: required, minLength: 6 })}
        />
        <PrimaryButton
          className="mt-24 py-2.5 italic"
          type="submit"
          disabled={loading}
        >
          <Row center centerItems>
            {loading && <Spinner />}
            {loading ? "Progress" : "Login"}
          </Row>
        </PrimaryButton>
      </form>
    </AuthCard>
  );
};

export default Login;
