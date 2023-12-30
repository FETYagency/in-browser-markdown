import { useSyncExternalStore } from "react";

export default function useScreenQuery(mediaFeature) {
  if (!mediaFeature) {
    throw new Error(
      "you need to specify the media feature for the 'useScreenQuery'",
    );
  }
  const media = matchMedia(mediaFeature);
  function subscriber(callback) {
    media.addEventListener("change", callback);
    return () => {
      media.removeEventListener("change", callback);
    };
  }
  function getSnapshot() {
    return media.matches;
  }
  const api = useSyncExternalStore(subscriber, getSnapshot);
  return { api };
}
