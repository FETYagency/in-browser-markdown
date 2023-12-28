import { useSyncExternalStore } from "react";

export default function useMediaQuery(mediaFeature) {
  if (!mediaFeature) {
    throw new Error(
      "you need to specify the media feature for the 'useMediaQuery'"
    );
    return;
  }
  const media = matchMedia(mediaFeature);
  const html = window.document.documentElement;
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
  function toggleDark() {
    html.classList.add("dark");
  }
  function toggleLight() {
    html.classList.remove("dark");
  }
  return { toggleDark, toggleLight, api };
}
