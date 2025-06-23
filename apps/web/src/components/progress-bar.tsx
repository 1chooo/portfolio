"use client";

import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useSpring,
} from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ReactNode,
  createContext,
  startTransition,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link as ViewTransitionsLink } from "next-view-transitions";

interface ProgressContextType {
  state: "initial" | "in-progress" | "completing" | "complete";
  value: ReturnType<typeof useSpring>;
  start: () => void;
  done: () => void;
  reset: () => void;
}

const ProgressBarContext = createContext<ProgressContextType | null>(null);

export function useProgressBar() {
  let progress = useContext(ProgressBarContext);

  if (progress === null) {
    throw new Error("Need to be inside provider");
  }

  return progress;
}

interface ProgressBarProps {
  className: string;
  children: ReactNode;
}

export function ProgressBar({ className, children }: ProgressBarProps) {
  let progress = useProgress();
  let width = useMotionTemplate`${progress.value}%`;

  return (
    <ProgressBarContext.Provider value={progress}>
      <AnimatePresence onExitComplete={progress.reset}>
        {progress.state !== "complete" && (
          <motion.div
            style={{ width }}
            exit={{ opacity: 0 }}
            className={className}
          />
        )}
      </AnimatePresence>
      {children}
    </ProgressBarContext.Provider>
  );
}

interface ProgressBarLinkProps {
  href:
    | string
    | {
        pathname: string;
        query?: Record<string, string>;
      };
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export function ProgressBarLink({
  href,
  children,
  ...props
}: ProgressBarLinkProps) {
  let progress = useProgressBar();
  let router = useRouter();

  let handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    progress.start();

    let url: string;
    if (typeof href === "string") {
      url = href;
    } else if (typeof href === "object" && href !== null) {
      let { pathname, query } = href;
      let searchParams = new URLSearchParams(query || {}).toString();
      url = `${pathname}${searchParams ? `?${searchParams}` : ""}`;
    } else {
      console.error("Invalid href prop");
      return;
    }

    startTransition(() => {
      router.push(url);
      progress.done();
    });
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}

export function ViewTransitionsProgressBarLink({
  href,
  children,
  ...props
}: ProgressBarLinkProps) {
  let progress = useProgressBar();
  let router = useRouter();

  let handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    progress.start();

    let url: string;
    if (typeof href === "string") {
      url = href;
    } else if (typeof href === "object" && href !== null) {
      let { pathname, query } = href;
      let searchParams = new URLSearchParams(query || {}).toString();
      url = `${pathname}${searchParams ? `?${searchParams}` : ""}`;
    } else {
      console.error("Invalid href prop");
      return;
    }

    startTransition(() => {
      slideInOut();
      router.push(url);
      progress.done();
    });
  };

  return (
    <ViewTransitionsLink href={href} onClick={handleClick} {...props}>
      {children}
    </ViewTransitionsLink>
  );
}

function slideInOut() {
  document.documentElement.animate(
    [
      {
        opacity: 1,
        transform: "translate(0, 0)",
      },
      {
        opacity: 0,
        transform: "translate(-100px, 0)",
      },
    ],
    {
      duration: 400,
      easing: "ease",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)",
    },
  );

  document.documentElement.animate(
    [
      {
        opacity: 0,
        transform: "translate(100px, 0)",
      },
      {
        opacity: 1,
        transform: "translate(0, 0)",
      },
    ],
    {
      duration: 400,
      easing: "ease",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)",
    },
  );
}

function useProgress() {
  const [state, setState] = useState<
    "initial" | "in-progress" | "completing" | "complete"
  >("initial");

  let value = useSpring(0, {
    damping: 25,
    mass: 0.5,
    stiffness: 300,
    restDelta: 0.1,
  });

  useInterval(
    () => {
      // If we start progress but the bar is currently complete, reset it first.
      if (value.get() === 100) {
        value.jump(0);
      }

      let current = value.get();

      let diff;
      if (current === 0) {
        diff = 15;
      } else if (current < 50) {
        diff = rand(1, 10);
      } else {
        diff = rand(1, 5);
      }

      value.set(Math.min(current + diff, 99));
    },
    state === "in-progress" ? 750 : null,
  );

  useEffect(() => {
    if (state === "initial") {
      value.jump(0);
    } else if (state === "completing") {
      value.set(100);
    }

    return value.on("change", (latest) => {
      if (latest === 100) {
        setState("complete");
      }
    });
  }, [value, state]);

  function reset() {
    setState("initial");
  }

  function start() {
    setState("in-progress");
  }

  function done() {
    setState((state) =>
      state === "initial" || state === "in-progress" ? "completing" : state,
    );
  }

  return { state, value, start, done, reset };
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      tick();

      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
