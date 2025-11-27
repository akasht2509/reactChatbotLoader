import * as React from "react";

export type Gradient = { from: string; to: string };
export type WidthSpec = number | `${number}%` | `${number}px`;

type WidthsProp =
  | WidthSpec[]                                  
  | { min: number; max: number; unit?: "%" | "px" | ""; random?: true }; // auto widths

export interface LoaderBarsProps {
  /** Number of bars to render */
  bars?: number;
  /** Widths for bars (array) OR randomized generator config */
  widths?: WidthsProp;
  /** Gradient(s) for light mode: single or per-bar */
  gradients?: Gradient | Gradient[];
  /** Dark-mode gradient(s) (optional) */
  darkGradients?: Gradient | Gradient[];
  /** Bar height in px (default 12) */
  height?: number;
  /** Border radius in px (default 9999) */
  radius?: number;
  /** Pulse opacity animation (default true) */
  pulse?: boolean;
  /** Shimmer (animated gradient sweep) (default false) */
  shimmer?: boolean;
  /** Animation speed in ms (default 1400) */
  speedMs?: number;
  /** Use prefers-color-scheme: dark when darkGradients provided (default true) */
  respectSystemDark?: boolean;
  /** ARIA label for accessibility */
  ariaLabel?: string;
  /** Extra class */
  className?: string;
  /** Inline styles for wrapper */
  style?: React.CSSProperties;
  theme?: "light" | "dark" | "auto";
}

function isArray<T>(x: T | T[]): x is T[] {
  return Array.isArray(x);
}

function widthForIndex(i: number, spec: WidthsProp | undefined): string {
  if (!spec) return ["60%", "80%", "45%"][i % 3];


  if (Array.isArray(spec)) {
    const val = spec[i % spec.length];
    if (typeof val === "number") return `${val}px`;
    return String(val);
  }

  const min = Math.max(0, spec.min);
  const max = Math.max(min, spec.max);
  const unit = spec.unit ?? "%";
  const w = Math.random() * (max - min) + min;
  return `${Math.round(w)}${unit}`;
}

function gradientForIndex(
  i: number,
  gradients?: Gradient | Gradient[],
  darkGradients?: Gradient | Gradient[],
  isDark = false
): Gradient {
  const src = isDark && darkGradients ? darkGradients : gradients;

  if (!src) {
    //  defaults
    const lightDefaults: Gradient[] = [
      { from: "#D0E4FD", to: "#F3F8FF" },
      { from: "#FDE3F0", to: "#DCEEFF" },
      { from: "#FFEAF4", to: "#D9EAFE" }
    ];
    const darkDefaults: Gradient[] = [
      { from: "#4B5563", to: "#1f2937" },
      { from: "#374151", to: "#111827" },
      { from: "#6B7280", to: "#374151" }
    ];
    const arr = isDark ? darkDefaults : lightDefaults;
    return arr[i % arr.length];
  }

  if (isArray(src)) return src[i % src.length];
  return src;
}

 const LoaderBars: React.FC<LoaderBarsProps> = ({
  bars = 3,
  widths,
  gradients,
  darkGradients,
  height = 12,
  radius = 9999,
  pulse = true,
  shimmer = false,
  speedMs = 1400,
  respectSystemDark = true,
  ariaLabel = "Loading…",
  className = "",
  style,
  theme = "auto", 
}) => {
  // Check system dark mode once (avoids re-render loops)
  const isDark = React.useMemo(() => {
    if (theme === "dark") return true;
    if (theme === "light") return false;
    if (!window?.matchMedia) return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }, [theme]);
  

  const wrapperStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginTop: 8,
    marginBottom: 8,
    ...style
  };

  const barBase: React.CSSProperties = {
    height,
    borderRadius: radius,
    // For shimmer: animate background-position
    backgroundSize: shimmer ? "200% 100%" : undefined,
    animation:
      shimmer && pulse
        ? `loaderbars-shimmer ${speedMs}ms linear infinite, loaderbars-pulse ${Math.round(
            speedMs * 0.9
          )}ms ease-in-out infinite`
        : shimmer
        ? `loaderbars-shimmer ${speedMs}ms linear infinite`
        : pulse
        ? `loaderbars-pulse ${Math.round(speedMs * 0.9)}ms ease-in-out infinite`
        : undefined
  };

  return (
    <>
   
      <style>{`
        @keyframes loaderbars-pulse {
          0% { opacity: 0.85; }
          50% { opacity: 0.55; }
          100% { opacity: 0.85; }
        }
        @keyframes loaderbars-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div className={className} style={wrapperStyle} aria-label={ariaLabel} role="status">
        {Array.from({ length: Math.max(0, bars) }).map((_, i) => {
          const width = widthForIndex(i, widths);
          const { from, to } = gradientForIndex(i, gradients, darkGradients, isDark);
          const bg = `linear-gradient(90deg, ${from}, ${to})`;

          return (
            <div
              key={i}
              style={{
                ...barBase,
                width,
                backgroundImage: bg
              }}
            />
          );
        })}
      </div>
    </>
  );
};

export default LoaderBars;
