import React from 'react';

import {
  FetchFunction,
  FetchOptions,
} from '../internals/Fetcher';
import useFetch from './useFetch';

function SongkoroFetch<D, FP = any, EP = any>({
  extraProps,
  fetchFunction,
  fetchOptions,
  renderData: Data,
}: SongkoroFetchProps<D, FP, EP>): React.ReactElement<SongkoroFetchProps<D, FP, EP>> {
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

export default SongkoroFetch;

export interface RenderDataProps<D, EP = any> {
  data: D;
  error?: any;
  extraProps?: EP;
  loading: boolean;
}

interface SongkoroFetchProps<D, FP, EP> {
  extraProps?: EP;
  fetchFunction: FetchFunction<D, FP>;
  fetchOptions: FetchOptions<FP>;
  renderData: React.ComponentType<RenderDataProps<D, EP>>;
}
