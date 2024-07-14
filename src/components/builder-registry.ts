import type { RegisteredComponent } from "@builder.io/sdk-qwik";
import Props, { Item } from "../routes/props";
import Joke from "../routes/joke";
import Root from "../root";
import Routes from "../routes";

/**
 * This array is used to integrate custom components within Builder.
 * https://www.builder.io/c/docs/custom-components-intro
 *
 * These components will be found the "Custom Components"
 * section of Builder's visual editor.
 * You can also turn on "components only mode" to limit
 * editing to only these components.
 * https://www.builder.io/c/docs/guides/components-only-mode
 */
export const CUSTOM_COMPONENTS: RegisteredComponent[] = [
  {
    component: Joke,
    name: "Joke (Custom)",
  },
  {
    component: Root,
    name: "Root",
  },
  {
    component: Routes,
    name: "Routes",
  },
];
