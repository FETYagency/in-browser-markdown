import { useCallback, useSyncExternalStore } from "react";

export default function useMediaQuery(mediaFeature) {
  if (!mediaFeature) {
    throw new Error(
      "you need to specify the media feature for the 'useMediaQuery'",
    );
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
  const toggleDark = useCallback(
    function () {
      html.classList.add("dark");
    },
    [html.classList],
  );
  const toggleLight = useCallback(
    function () {
      html.classList.remove("dark");
    },
    [html.classList],
  );
  return { toggleDark, toggleLight, api };
}
