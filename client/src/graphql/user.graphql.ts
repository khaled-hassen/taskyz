import { gql } from "@apollo/client";

export const ValidateTokenQuery = gql`
  {
    validateToken
  }
`;

export const RefreshTokenQuery = gql`
  query {
    refreshToken {
      value
      expire
    }
  }
`;

export const LoginQuery = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token {
        value
        expire
      }
    }
  }
`;

export const RegisterMutation = gql`
  mutation Register(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      data: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      token {
        value
        expire
      }
    }
  }
`;

export const LogoutMutation = gql`
  mutation {
    logout
  }
`;

export const GetConfigQuery = gql`
  {
    config {
      bgImage {
        url
        alt
        sourceUrl
        creatorName
        creatorUrl
      }
      colors {
        textColor {
          h
          s
          l
        }
        primaryColor {
          h
          s
          l
        }
        successColor {
          h
          s
          l
        }
        warningColor {
          h
          s
          l
        }
        dangerColor {
          h
          s
          l
        }
        bgColor {
          h
          s
          l
        }
        cardBgColor {
          h
          s
          l
        }
        bgOpacity
        blur
      }
    }
  }
`;

export const SaveUserConfigMutation = gql`
  mutation SaveUserConfig($config: ConfigData!) {
    saveUserConfig(config: $config)
  }
`;
