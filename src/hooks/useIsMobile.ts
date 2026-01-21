import * as React from "react";

const MOBILE_BREAKPOINT = 1024;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT - 1}px)`,
    );
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Add listener and set initial state
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Return !!isMobile to ensure it's a boolean (false until hydrated)
  return !!isMobile;
}
