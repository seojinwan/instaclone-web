import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useForm } from "react-hook-form";
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

export default function SignUp() {
  const methods = useForm({
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { isValid, errors },
  } = methods;

  const onSubmit = () => {};
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
          />
          {<FormError message={errors?.firstName?.message} />}
          <Input
            {...register("lastName", {
              required: { value: true, message: "필수 입력 항목 입니다" },
            })}
            type="text"
            placeholder="Last Name"
            hasError={Boolean(errors?.lastName?.message)}
          />
          {<FormError message={errors?.lastName?.message} />}

          <Input
            {...register("email", {
              required: { value: true, message: "필수 입력 항목 입니다" },
            })}
            type="text"
            placeholder="Email"
            hasError={Boolean(errors?.email?.message)}
          />
          {<FormError message={errors?.email?.message} />}

          <Input
            {...register("username", {
              required: { value: true, message: "필수 입력 항목 입니다" },
            })}
            type="text"
            placeholder="Username"
            hasError={Boolean(errors?.username?.message)}
          />
          {<FormError message={errors?.username?.message} />}

          <Input
            {...register("password", {
              required: { value: true, message: "필수 입력 항목 입니다" },
            })}
            type="password"
            placeholder="Password"
            hasError={Boolean(errors?.password?.message)}
          />
          {<FormError message={errors?.password?.message} />}

          <Button type="submit" value={"Sign up"} disabled={!isValid} />
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
