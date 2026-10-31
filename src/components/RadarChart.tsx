interface RadarChartProps {
  /** Ten SCA attributes on a 0–10 scale, in the order of `labels`. */
  values: number[];
  labels: string[];
  color: string;
  /** Print each attribute's score next to its label. */
  showValues: boolean;
  format: (n: number) => string;
  title: string;
}

const W = 460;
const H = 360;
const CX = W / 2;
const CY = H / 2;
const R = 118;
const RINGS = [2, 4, 6, 8, 10];

/** Plain SVG radar chart: renders on the server and needs no chart library. */
export default function RadarChart({ values, labels, color, showValues, format, title }: RadarChartProps) {
  const n = labels.length;
  const point = (i: number, v: number) => {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [CX + Math.cos(a) * R * (v / 10), CY + Math.sin(a) * R * (v / 10)] as const;
  };
  const ring = (v: number) => labels.map((_, i) => point(i, v).join(',')).join(' ');
  const shape = values.map((v, i) => point(i, v).join(',')).join(' ');

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={title} className="w-full h-auto">
      <title>{title}</title>
      {RINGS.map((v) => (
        <polygon
          key={v}
          points={ring(v)}
          fill="none"
          stroke={v === 10 ? '#D9C9BA' : '#E8DDD2'}
          strokeWidth={v === 10 ? 1.4 : 1}
          strokeDasharray={v === 10 ? undefined : '3 3'}
        />
      ))}
      {labels.map((_, i) => {
        const [x, y] = point(i, 10);
        return <line key={i} x1={CX} y1={CY} x2={x} y2={y} stroke="#E8DDD2" strokeWidth={1} />;
      })}
      {RINGS.slice(0, 4).map((v) => (
        <text key={v} x={CX + 4} y={CY - R * (v / 10) + 3} fontSize={9} fill="#A0714D">
          {v}
        </text>
      ))}
      <polygon points={shape} fill={color} fillOpacity={0.18} stroke={color} strokeWidth={2.2} strokeLinejoin="round" />
      {values.map((v, i) => {
        const [x, y] = point(i, v);
        return <circle key={i} cx={x} cy={y} r={4} fill="#fff" stroke={color} strokeWidth={2} />;
      })}
      {labels.map((label, i) => {
        const a = (Math.PI * 2 * i) / n - Math.PI / 2;
        const lx = CX + Math.cos(a) * (R + 16);
        const ly = CY + Math.sin(a) * (R + 16);
        const anchor = Math.cos(a) > 0.25 ? 'start' : Math.cos(a) < -0.25 ? 'end' : 'middle';
        const dy = Math.sin(a) > 0.6 ? 12 : Math.sin(a) < -0.6 ? -4 : 4;
        return (
          <text key={label} x={lx} y={ly + dy} textAnchor={anchor} fontSize={12} fill="#3E2415">
            {label}
            {showValues && (
              <tspan fontWeight={700} fill={color}>{`  ${format(values[i])}`}</tspan>
            )}
          </text>
        );
      })}
    </svg>
  );
}
