/// <reference lib="webworker" />

import { longOperation } from "./long-operation";

addEventListener('message', ({ data }) => {
  const response = longOperation(data);
  postMessage(response);
});
