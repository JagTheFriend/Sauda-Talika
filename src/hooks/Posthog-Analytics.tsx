import posthog from "posthog-js";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function PostHogAnalytics() {
  const location = useLocation()

  useEffect(() => {
    posthog.capture("$pageview", {
      path: location.pathname,
    })
  }, [
    location.pathname
  ])
  return null;
}

