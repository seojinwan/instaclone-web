import { gql, useMutation } from "@apollo/client";
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import styled from "styled-components";
import { logUserIn } from "../apollo";
import { AuthLayout } from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import PageTitle from "../components/PageTitle";
import routes from "../router/routes";

const Notification = styled.div`
  color: #2ecc71;
`;

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

export default function Login() {
  const location = useLocation();
  const navigator = useNavigate();

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      username: location?.state?.username || "",
      password: location?.state?.password || "",
    },
  });
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = methods;

  const clearLoginError = () => {
    clearErrors("result");
  };

  const [login, { loading }] = useMutation(LOGIN_MUTATION);

  const onSubmit = (data) => {
    if (loading) return;
    login({
      variables: data,
    }).then(({ data }) => {
      const {
        login: { ok, error, token },
      } = data;
      if (!ok) {
        return setError("result", {
          message: error,
        });
      }
      if (token) {
        logUserIn(token);
        navigator(routes.home);
      }
    });
  };

  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <div style={{ textAlign: "center" }}>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Notification>{location?.state?.message}</Notification>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("username", {
              minLength: {
                value: 5,
                message: "아이디는 5글자 이상",
              },
              required: true,
            })}
            onChange={clearLoginError}
            type="text"
            placeholder="Username"
            hasError={!!errors?.username?.message}
          />
          <FormError message={errors?.username?.message} />

          <Input
            {...register("password", {
              required: {
                value: true,
                message: "비밀번호는 필수 입력 입니다",
              },
            })}
            onChange={clearLoginError}
            hasError={!!errors?.password?.message}
            type="password"
            placeholder="Password"
          />
          <FormError message={errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Log in"}
            disabled={!isValid || loading}
          />
          <FormError message={errors?.result?.message} />
        </form>
        <Separator label="or" />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        cta={"Don't have an account?"}
        link={routes.signUp}
        linkText={"Sign up"}
      />
    </AuthLayout>
  );
}
