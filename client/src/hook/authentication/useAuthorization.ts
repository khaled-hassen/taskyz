import { clearToken, getSavedToken, saveToken } from "../../utils/token.utils";
import { useEffect, useRef, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  RefreshTokenQuery,
  ValidateTokenQuery,
} from "../../graphql/user.graphql";
import {
  IRefreshTokenQuery,
  IToken,
  IValidateTokenQuery,
} from "../../types/graphql.types";
import { useAppSetup } from "../setup/useAppSetup";

export enum EAuthState {
  AUTHORIZED,
  NOT_AUTHORIZED,
  LOADING,
}

export function useAuthorization() {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [state, setState] = useState<EAuthState>(EAuthState.LOADING);
  const { config, getConfig, resetConfig } = useAppSetup(() =>
    setState(EAuthState.AUTHORIZED)
  );

  const [
    validateToken,
    { loading: validateLoading },
  ] = useLazyQuery<IValidateTokenQuery>(ValidateTokenQuery, {
    fetchPolicy: "no-cache",
    onCompleted: handleValidToken,
    onError: requestToken,
  });

  const [
    refreshToken,
    { loading: refreshLoading, refetch, called },
  ] = useLazyQuery<IRefreshTokenQuery>(RefreshTokenQuery, {
    fetchPolicy: "no-cache",
    onCompleted: ({ refreshToken }) => handleAuthentication(refreshToken),
    onError: () => setState(EAuthState.NOT_AUTHORIZED),
  });

  function handleValidToken({ validateToken }: IValidateTokenQuery) {
    if (!validateToken) return;
    const token = getSavedToken();
    if (token) handleAuthentication(token);
  }

  function requestToken() {
    if (!called) return refreshToken();
    if (!refetch) return;
    refetch()
      .then(({ data }) => handleAuthentication(data.refreshToken))
      .catch((_) => setState(EAuthState.NOT_AUTHORIZED));
  }

  function handleAuthentication(token: IToken) {
    saveToken(token);
    startTimer(token.expire);
    getConfig();
    // setState(EAuthState.AUTHORIZED) will be called after setting the app config
  }

  function handleLogout() {
    resetConfig(false);
    setState(EAuthState.NOT_AUTHORIZED);
    clearToken();
    stopTimer();
  }

  function startTimer(time: number) {
    stopTimer();
    timer.current = setTimeout(function () {
      stopTimer();
      clearToken();
      requestToken();
    }, time - Date.now());
  }

  function stopTimer() {
    if (timer.current) clearTimeout(timer.current);
  }

  useEffect(() => {
    const token = getSavedToken();
    if (token) validateToken();
    else requestToken();
  }, []);

  useEffect(() => {
    if (validateLoading || (refreshLoading && !called))
      setState(EAuthState.LOADING);
  }, [validateLoading, refreshLoading, called]);

  // clear function
  useEffect(() => () => stopTimer(), []);

  return { config, state, resetConfig, handleAuthentication, handleLogout };
}
