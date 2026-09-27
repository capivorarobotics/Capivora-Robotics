// Lets any "Discuss this" button on the page preselect a topic in the inquiry form.
const EVENT = "inquiry:topic";

export function requestTopic(topic: string) {
  dispatchEvent(new CustomEvent<string>(EVENT, { detail: topic }));
}

export function onTopicRequest(cb: (topic: string) => void) {
  const handler = (e: Event) => cb((e as CustomEvent<string>).detail);
  addEventListener(EVENT, handler);
  return () => removeEventListener(EVENT, handler);
}
