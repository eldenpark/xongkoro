import React from 'react';

import {
  FetchFunction,
  FetchOptions,
} from '../internals/Fetcher';
import useFetch from './useFetch';

function XongkoroFetch<D, FP = any, EP = any>({
  extraProps,
  fetchFunction,
  fetchOptions,
  renderData: Data,
}: XongkoroFetchProps<D, FP, EP>): React.ReactElement<XongkoroFetchProps<D, FP, EP>> {
  const { data, error, loading } = useFetch<D, FP>(fetchFunction, fetchOptions);

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

interface XongkoroFetchProps<D, FP, EP> {
  extraProps?: EP;
  fetchFunction: FetchFunction<D, FP>;
  fetchOptions: FetchOptions<FP>;
  renderData: React.ComponentType<RenderDataProps<D, EP>>;
}
