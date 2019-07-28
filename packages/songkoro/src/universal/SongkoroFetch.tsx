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
  const { data, loading } = useFetch(fetchFunction, fetchOptions);

  return (
    <Data
      data={data}
      extraProps={extraProps}
      loading={loading}
    />
  );
}

export default SongkoroFetch;

interface SongkoroFetchProps<D, FP, EP> {
  extraProps?: EP;
  fetchFunction: FetchFunction<D, FP>;
  fetchOptions: FetchOptions<FP>;
  renderData: React.ComponentType<RenderDataProps<D, EP>>;
}

interface RenderDataProps<D, EP> {
  data: D;
  extraProps?: EP;
  loading: boolean;
}
