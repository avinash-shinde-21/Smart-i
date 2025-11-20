export default function Logo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="eyeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D4FF" />
            <stop offset="100%" stopColor="#0080FF" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <ellipse cx="50" cy="50" rx="45" ry="28"
          stroke="url(#eyeGradient)" strokeWidth="2" fill="none" filter="url(#glow)"/>

        <circle cx="50" cy="50" r="18" fill="url(#eyeGradient)" filter="url(#glow)"/>

        <circle cx="50" cy="50" r="10" fill="#000000"/>

        <circle cx="52" cy="48" r="3" fill="#00D4FF"/>

        <path d="M 20 35 Q 35 30 50 30" stroke="url(#eyeGradient)" strokeWidth="1.5" fill="none"/>
        <path d="M 50 30 Q 65 30 80 35" stroke="url(#eyeGradient)" strokeWidth="1.5" fill="none"/>
        <path d="M 20 65 Q 35 70 50 70" stroke="url(#eyeGradient)" strokeWidth="1.5" fill="none"/>
        <path d="M 50 70 Q 65 70 80 65" stroke="url(#eyeGradient)" strokeWidth="1.5" fill="none"/>
      </svg>
    </div>
  );
}
