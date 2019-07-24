import React from 'react';

import {
  FetchFunction,
  FetchOptions,
} from '../internals/Fetcher';
import useFetch from './useFetch';

const DefaultLoading = () => (
  <div>loading...</div>
);

function SongkoroFetch<D, FP, EP>({
  extraProps,
  fetchFunction,
  fetchOptions,
  renderData: Data,
  renderLoading: Loading = DefaultLoading,
}: SongkoroFetchProps<D, FP, EP>): React.ReactElement<SongkoroFetchProps<D, FP, EP>> {
  const { data, loading } = useFetch(fetchFunction, fetchOptions);

  return !loading
    ? <Data data={data} extraProps={extraProps} />
    : <Loading />;
}

export default SongkoroFetch;

interface SongkoroFetchProps<D, FP, EP> {
  extraProps?: EP;
  fetchFunction: FetchFunction<D, FP>;
  fetchOptions: FetchOptions<FP>;
  renderData: React.ComponentType<RenderDataProps<D, EP>>;
  renderLoading?: React.ComponentType;
}

interface RenderDataProps<D, EP> {
  data: D;
  extraProps?: EP;
}
