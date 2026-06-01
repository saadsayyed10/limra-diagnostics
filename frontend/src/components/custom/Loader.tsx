export default function Loader({ size = 80, className = "" }) {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
        {/* Outer orbit */}
        <circle
          cx="50"
          cy="50"
          r="32"
          stroke="currentColor"
          strokeWidth="2"
          className="text-slate-700 dark:text-slate-500 opacity-30"
        />

        {/* Rotating group */}
        <g className="origin-center animate-[spin_1.8s_linear_infinite]">
          {/* Gradient trail */}
          <path
            d="M50 18 A32 32 0 1 1 49.9 18"
            stroke="url(#orbitGradient)"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Moving particle */}
          <circle
            cx="50"
            cy="18"
            r="5"
            fill="#38bdf8"
            className="drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]"
          />
        </g>

        <defs>
          <linearGradient
            id="orbitGradient"
            x1="18"
            y1="50"
            x2="82"
            y2="50"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#38bdf8" stopOpacity="0" />
            <stop stopColor="#38bdf8" />
            <stop stopColor="#818cf8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
