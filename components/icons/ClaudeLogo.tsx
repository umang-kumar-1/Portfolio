// Claude-style spark: a burst of rounded rays of uneven length.
const RAYS = [
  { a: 0, l: 40 }, { a: 30, l: 30 }, { a: 60, l: 42 }, { a: 90, l: 31 },
  { a: 120, l: 41 }, { a: 150, l: 29 }, { a: 180, l: 40 }, { a: 210, l: 31 },
  { a: 240, l: 42 }, { a: 270, l: 30 }, { a: 300, l: 41 }, { a: 330, l: 29 },
];

export function ClaudeLogo({
  size = 24, color = "#D97757", spin = false, className = "",
}: { size?: number; color?: string; spin?: boolean; className?: string }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 100 100" fill="none"
      className={`${spin ? "animate-spin-slow" : ""} ${className}`}
      aria-hidden="true"
    >
      {RAYS.map(({ a, l }) => (
        <line
          key={a} x1="50" y1="50"
          x2={50 + l * Math.cos((a * Math.PI) / 180)}
          y2={50 + l * Math.sin((a * Math.PI) / 180)}
          stroke={color} strokeWidth="10" strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
