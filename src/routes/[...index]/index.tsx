// src/routes/[...index]/index.tsx

import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import {
  Content,
  fetchOneEntry,
  getBuilderSearchParams,
} from '@builder.io/sdk-qwik';

export interface Env {
  PUBLIC_BUILDER_API_KEY: string;
}

export const BUILDER_MODEL = 'page';


export const useBuilderContent = routeLoader$(async ({ env, url }) => {
  // access env variable in cloudflare settings using routeLoader only  
  const BUILDER_PUBLIC_API_KEY = env.get('PUBLIC_BUILDER_API_KEY') || '';

  const builderContent = await fetchOneEntry({
    model: BUILDER_MODEL,
    apiKey: BUILDER_PUBLIC_API_KEY,
    options: getBuilderSearchParams(url.searchParams),
    userAttributes: {
      urlPath: url.pathname,
    },
  });

  // pass the api key into the default component below 
  // because it does not use routeLoader 
  return {
    BUILDER_PUBLIC_API_KEY,
    builderContent,
  }
});

export default component$(() => {
  const { BUILDER_PUBLIC_API_KEY, builderContent } = useBuilderContent().value;

  return (
    <Content
      model={BUILDER_MODEL}
      content={builderContent}
      apiKey={BUILDER_PUBLIC_API_KEY}
    />
  );
});