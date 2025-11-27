import * as React from 'react';

type Gradient = {
    from: string;
    to: string;
};
type WidthSpec = number | `${number}%` | `${number}px`;
type WidthsProp = WidthSpec[] | {
    min: number;
    max: number;
    unit?: "%" | "px" | "";
    random?: true;
};
interface LoaderBarsProps {
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
declare const LoaderBars: React.FC<LoaderBarsProps>;

export { LoaderBars };
