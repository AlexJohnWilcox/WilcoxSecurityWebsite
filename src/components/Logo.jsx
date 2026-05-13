function ShieldDiamond({ size = 30, dark = true }) {
  const outer = dark ? '#1a1a1a' : '#ffffff'
  const inner = dark ? '#94a3b8' : '#64748b'

  return (
    <svg width={size} height={size} viewBox="0 0 30 30" fill="none">
      <rect
        x="15" y="1.5"
        width="19" height="19"
        rx="4"
        transform="rotate(45 15 1.5)"
        stroke={outer}
        strokeWidth="1.5"
        fill="none"
      />
      <rect
        x="15" y="6.5"
        width="12" height="12"
        rx="2"
        transform="rotate(45 15 6.5)"
        stroke={inner}
        strokeWidth="1"
        fill="none"
      />
      <circle cx="15" cy="15" r="2.5" fill="#22c55e" />
    </svg>
  )
}

export function Logo({ dark = true, size = 'default' }) {
  const textColor = dark ? 'text-text-primary' : 'text-gray-100'
  const mutedColor = dark ? 'text-text-muted' : 'text-gray-400'
  const svgSize = size === 'small' ? 20 : 30

  return (
    <div className="flex items-center gap-2.5">
      <ShieldDiamond size={svgSize} dark={dark} />
      <div className="flex items-center gap-2">
        <span className={`font-oswald text-[20px] font-bold tracking-[0.06em] ${textColor}`}>
          WILCOX
        </span>
        <span className={`font-oswald text-[12px] font-light tracking-[0.2em] ${mutedColor}`}>
          SECURITY
        </span>
      </div>
    </div>
  )
}
