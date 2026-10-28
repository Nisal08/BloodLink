interface Props {
  size?: number;
  className?: string;
}

export default function BloodDropIcon({ size = 24, className = '' }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Drop body */}
      <path
        d="M16 2 C16 2, 2 16 2 25 C2 33.284 8.268 39 16 39 C23.732 39 30 33.284 30 25 C30 16 16 2 16 2Z"
        fill="white"
        fillOpacity="0.95"
      />
      {/* Inner highlight sheen */}
      <path
        d="M16 7 C16 7, 7 18 7 25 C7 30.523 11.029 35 16 35"
        stroke="white"
        strokeOpacity="0.4"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Heart cutout */}
      <path
        d="M16 30 C16 30 9 24.5 9 20.5 C9 18.015 10.791 16 13 16 C14.31 16 15.477 16.648 16 17.648 C16.523 16.648 17.69 16 19 16 C21.209 16 23 18.015 23 20.5 C23 24.5 16 30 16 30Z"
        fill="#FF0040"
        fillOpacity="0.9"
      />
    </svg>
  );
}

/** Full logo tile: coloured bg square + drop SVG */
export function BloodDropTile({ size = 36, rounded = 'rounded-xl', className = '' }: { size?: number; rounded?: string; className?: string }) {
  const pad = Math.round(size * 0.15);
  return (
    <div
      className={`flex items-center justify-center bg-[#FF0040] ${rounded} shrink-0 ${className}`}
      style={{ width: size, height: size, padding: pad }}
    >
      <BloodDropIcon size={size - pad * 2} />
    </div>
  );
}
