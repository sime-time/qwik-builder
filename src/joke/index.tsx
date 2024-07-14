import { component$, useSignal, useTask$, useStylesScoped$ } from '@builder.io/qwik';
import { routeLoader$, Form, routeAction$, server$ } from '@builder.io/qwik-city';
import type { DocumentHead } from "@builder.io/qwik-city";
import styles from "./joke.css?inline";

export const useJokeVoteAction = routeAction$((props) => {
  // print on the server 
  console.log('VOTE', props);
});

export const useDadJoke = routeLoader$(async () => {
  const response = await fetch('https://icanhazdadjoke.com/', {
    headers: { Accept: 'application/json' },
  });

  return (await response.json()) as {
    id: string;
    status: number;
    joke: string;
  };
});


export default component$(() => {
  useStylesScoped$(styles);
  const isFavoriteSignal = useSignal(false);
  const dadJokeSignal = useDadJoke(); // routeLoader (server -> client)
  const favoriteJokeAction = useJokeVoteAction(); // routeAction (client -> server)

  useTask$(({ track }) => {
    track(() => isFavoriteSignal.value);
    console.log('FAVORITE (isomorphic)', isFavoriteSignal.value);
    server$(() => {
      console.log('FAVORITE (server)', isFavoriteSignal.value);
    })();
  });

  return (
    <section class="section bright">
      <p>{dadJokeSignal.value.joke}</p>
      <Form action={favoriteJokeAction}>
        <input type="hidden" name="jokeID" value={dadJokeSignal.value.id} />
        <button name="vote" value="up">👍</button>
        <button name="vote" value="down">👎</button>
      </Form>
      <button onClick$={() => {
        isFavoriteSignal.value = !isFavoriteSignal.value;
      }}>
        {isFavoriteSignal.value ? '❤️' : '🤍'}
      </button>
    </section>
  );
});


export const head: DocumentHead = {
  title: "Jokes",
  meta: [
    {
      name: "page of jokes",
      content: "Qwik site description",
    },
  ],
};
