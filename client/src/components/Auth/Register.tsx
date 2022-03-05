import React, { useEffect } from "react";
import { H2, P } from "../styles/Text";
import Row from "../styles/Row";
import LinkButton from "../styles/LinkButton";
import { Input } from "../styles/Input";
import { PrimaryButton, Spinner } from "../styles/Button";
import { AuthCard } from "../styles/CardContainer";
import { useForm } from "react-hook-form";
import { IRegisterForm } from "../../types/form.types";
import {
  email,
  getApolloError,
  getRegisterError,
  required,
} from "../../utils/form.utils";
import { useMutation } from "@apollo/client";
import { RegisterMutation } from "../../graphql/user.graphql";
import { IRegisterMutation, IToken } from "../../types/graphql.types";
import { toast } from "react-hot-toast";

interface IProps {
  onSwitch(): void;
  onRegister(token: IToken): void;
}

const Register: React.FC<IProps> = (props) => {
  const {
    register,
    handleSubmit,
    formState,
    getValues,
  } = useForm<IRegisterForm>({ reValidateMode: "onSubmit" });

  const [signUp, { loading }] = useMutation<IRegisterMutation>(
    RegisterMutation,
    { fetchPolicy: "no-cache" }
  );

  async function handleRegister(formData: IRegisterForm) {
    try {
      const { data } = await toast.promise(
        signUp({
          variables: { ...formData, confirmPassword: formData.confirm },
        }),
        {
          loading: "Creating account...",
          success: "Account created",
          error: (error) => getApolloError(error),
        }
      );
      if (data && data.register) props.onRegister(data.register.token);
    } catch (_) {}
  }

  useEffect(() => {
    const errorMsg = getRegisterError(formState.errors);
    if (errorMsg) toast.error(errorMsg);
  }, [formState]);

  return (
    <AuthCard>
      <H2 className="text-center mb-3">Create an account</H2>
      <Row center className="mb-14">
        <P className="mr-2">Already have an account?</P>
        <LinkButton onClick={props.onSwitch}>Login</LinkButton>
      </Row>
      <form onSubmit={handleSubmit(handleRegister)}>
        <Row between className="mb-4">
          <Input
            autoFocus
            placeholder="First name"
            noRight
            className="mr-0.5"
            {...register("firstName", { validate: required })}
          />
          <Input
            placeholder="Last name"
            noLeft
            {...register("lastName", { validate: required })}
          />
        </Row>

        <Input
          placeholder="Email"
          className="mb-4"
          {...register("email", { validate: required, pattern: email })}
        />
        <Row between>
          <Input
            type="password"
            placeholder="Password"
            noRight
            className="mr-0.5"
            {...register("password", { validate: required, minLength: 6 })}
          />
          <Input
            type="password"
            placeholder="Confirm"
            noLeft
            {...register("confirm", {
              validate: (val) => val === getValues("password"),
            })}
          />
        </Row>
        <PrimaryButton
          className="mt-10 py-2.5 italic"
          type="submit"
          disabled={loading}
        >
          <Row center centerItems>
            {loading && <Spinner />}
            {loading ? "Progress" : "Register"}
          </Row>
        </PrimaryButton>
      </form>
    </AuthCard>
  );
};

export default Register;
