import { gql, useMutation } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthLayout } from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import { FatLink } from "../components/shared";
import routes from "../router/routes";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
`;

const SubTitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const SIGNUP_MUTATION = gql`
  mutation CreateAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

export default function SignUp() {
  const navigator = useNavigate();
  const methods = useForm({
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { isValid, errors },
  } = methods;

  const clearLoginError = () => {
    clearErrors("result");
  };

  const [signUp, { data, loading, error }] = useMutation(SIGNUP_MUTATION);

  const onSubmit = (variables) => {
    if (loading) return;
    signUp({
      variables: getValues(),
    }).then(({ data }) => {
      const {
        createAccount: { ok, error },
      } = data;
      if (!ok) {
        setError("result", { message: error });
        return;
      }
      navigator("/", { state: { message: "Sign Up Success, Please login!!" } });
    });
  };

  return (
    <AuthLayout>
      <PageTitle title={"SignUp"} />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <SubTitle>
            Sign up to see photos and videos from your friends.
          </SubTitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("firstName", {
              required: { value: true, message: "필수 입력 항목 입니다" },
            })}
            type="text"
            placeholder="First Name"
            hasError={Boolean(errors?.firstName?.message)}
            onChange={clearLoginError}
          />
          {<FormError message={errors?.firstName?.message} />}
          <Input
            {...register("lastName", {
              required: { value: true, message: "필수 입력 항목 입니다" },
            })}
            type="text"
            placeholder="Last Name"
            hasError={Boolean(errors?.lastName?.message)}
            onChange={clearLoginError}
          />
          {<FormError message={errors?.lastName?.message} />}

          <Input
            {...register("email", {
              required: { value: true, message: "필수 입력 항목 입니다" },
            })}
            type="text"
            placeholder="Email"
            hasError={Boolean(errors?.email?.message)}
            onChange={clearLoginError}
          />
          {<FormError message={errors?.email?.message} />}

          <Input
            {...register("username", {
              required: { value: true, message: "필수 입력 항목 입니다" },
            })}
            type="text"
            placeholder="Username"
            hasError={Boolean(errors?.username?.message)}
            onChange={clearLoginError}
          />
          {<FormError message={errors?.username?.message} />}

          <Input
            {...register("password", {
              required: { value: true, message: "필수 입력 항목 입니다" },
            })}
            type="password"
            placeholder="Password"
            hasError={Boolean(errors?.password?.message)}
            onChange={clearLoginError}
          />
          <Input
            {...register("passwordCheck", {
              required: { value: true, message: "비밀번호 확인 필수" },
              validate: (v) => v === getValues().password,
            })}
            type="password"
            placeholder="Password Check"
            onChange={clearLoginError}
            hasError={Boolean(errors?.password?.message)}
          />
          {<FormError message={errors?.password?.message} />}

          {<FormError message={errors?.result?.message} />}

          <Button
            type="submit"
            value={loading ? "loading.." : "Sign up"}
            disabled={!isValid || loading}
          />
        </form>
      </FormBox>
      <BottomBox
        cta={"Have an account?"}
        link={routes.home}
        linkText={"Login"}
      />
    </AuthLayout>
  );
}
