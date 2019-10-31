/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import {
  FetchFunction,
  FetchOptions,
} from '../internals/Fetcher';
import useFetch from './useFetch';

function XongkoroFetch<D, FP = any, EP = any, C = any>({
  extraProps,
  fetchFunction,
  fetchOptions,
  renderData: Data,
}: XongkoroFetchProps<D, FP, EP, C>): React.ReactElement<XongkoroFetchProps<D, FP, EP, C>> {
  const { data, error, loading } = useFetch<D, FP, C>(fetchFunction, fetchOptions);

  return (
    <Data
      data={data}
      error={error}
      extraProps={extraProps}
      loading={loading}
    />
  );
}

export default XongkoroFetch;

export interface RenderDataProps<D, EP = any> {
  data: D;
  error?: any;
  extraProps?: EP;
  loading: boolean;
}

interface XongkoroFetchProps<D, FP, EP, C> {
  extraProps?: EP;
  fetchFunction: FetchFunction<D, FP, C>;
  fetchOptions: FetchOptions<FP>;
  renderData: React.ComponentType<RenderDataProps<D, EP>>;
}
