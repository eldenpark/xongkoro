import React from 'react';

import {
  FetchFunction,
  FetchOptions,
} from '../internals/Fetcher';
import useFetch from './useFetch';

const DefaultLoading = () => (
  <div>loading...</div>
);

function SongkoroFetch<D, FP>({
  fetchFunction,
  fetchOptions,
  renderData: Data,
  renderLoading: Loading = DefaultLoading,
}: SongkoroFetchProps<D, FP>): React.ReactElement<SongkoroFetchProps<D, FP>> {
  const { data, loading } = useFetch(fetchFunction, fetchOptions);

  return !loading
    ? <Data data={data} />
    : <Loading />;
}

export default SongkoroFetch;

interface SongkoroFetchProps<D, FP> {
  fetchFunction: FetchFunction<D, FP>;
  fetchOptions: FetchOptions<FP>;
  renderData: React.ComponentType<RenderDataProps<D>>;
  renderLoading?: React.ComponentType;
}

interface RenderDataProps<D> {
  data: D;
}
