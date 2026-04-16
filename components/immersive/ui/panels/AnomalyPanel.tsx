'use client';
import { useEffect, useState } from 'react';

interface Props { accentColor: string; }

const GLITCH_CHARS = '!@#$%^&*<>?/\\|[]{}~`';
function glitch(text: string): string {
  return text
    .split('')
    .map((c) => (Math.random() < 0.08 ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)] : c))
    .join('');
}

const HIDDEN_STATS = [
  { label: 'BUGS_CREATED', value: '404', unit: 'errors' },
  { label: 'BUGS_SQUASHED', value: '403', unit: '(1 remains)' },
  { label: 'NODE_MODULES_DELETED', value: '∞', unit: 'times' },
  { label: 'STACKOVERFLOW_SAVES', value: 'CLASSIFIED', unit: '' },
  { label: 'GTA_HOURS_LOGGED', value: '1,337+', unit: 'hrs' },
  { label: 'GYM_SESSIONS', value: '5x', unit: 'per week' },
  { label: 'COFFEES_CONSUMED', value: '9,999', unit: 'mg caffeine' },
  { label: 'TIMES_IT_WORKED', value: '1', unit: '(idk how)' },
];

const FAKE_LOGS = [
  '[WARN] Ambition exceeds roadmap capacity.',
  '[ERR]  node_modules too heavy — universe collapsed.',
  '[INFO] Deadlines: acknowledged. Sleep: sacrificed.',
  '[ERR]  CSS not centering. Have tried everything.',
  '[OK]   Red Bull reserves: nominal.',
  '[WARN] Impostor syndrome daemon: running.',
  '[INFO] git push —force: executed. Praying.',
  '[ERR]  Works on my machine. Shipping anyway.',
  '[INFO] Stack: "modern". Translation: it deps on deps.',
  '[OK]   Side project count: exceeds safe threshold.',
];

const PERSONALITY = [
  { icon: '🏋️', trait: 'GYM_RAT', desc: 'Lifts. Consistently. No rest day philosophy.' },
  { icon: '🎮', trait: 'GTA_VETERAN', desc: 'Cleared every heist. Crime doesn\'t pay but XP does.' },
  { icon: '🎵', trait: 'MUSIC_ADDICT', desc: 'Lo-fi to metal. Coding without headphones is illegal.' },
  { icon: '🌙', trait: 'NIGHT_OWL', desc: 'Best commits after midnight. Fact.' },
  { icon: '🍕', trait: 'PIZZA_ENJOYER', desc: 'Pineapple discourse: neutral. Cheese: mandatory.' },
  { icon: '📚', trait: 'NEVER_STOPS_READING', desc: 'Tabs > bookmarks. Currently: 47 open.' },
];

export function AnomalyPanel({ accentColor }: Props) {
  const [tick, setTick] = useState(0);
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  const [countdown, setCountdown] = useState(99);

  // Glitch ticker
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 120);
    return () => clearInterval(id);
  }, []);

  // Rolling logs
  useEffect(() => {
    const id = setInterval(() => {
      setVisibleLogs((prev) => {
        const next = (prev.length > 0 ? FAKE_LOGS.indexOf(prev[prev.length - 1]) + 1 : 0) % FAKE_LOGS.length;
        return [...prev.slice(-5), FAKE_LOGS[next]];
      });
    }, 1800);
    setVisibleLogs(FAKE_LOGS.slice(0, 4));
    return () => clearInterval(id);
  }, []);

  // Fake countdown that never reaches 0
  useEffect(() => {
    const id = setInterval(() => {
      setCountdown((c) => (c <= 1 ? 99 : c - 1));
    }, 800);
    return () => clearInterval(id);
  }, []);

  const red = accentColor; // #FF0044

  return (
    <div className="text-white space-y-8 py-4">

      {/* ── BREACH WARNING ────────────────────────── */}
      <div
        className="border p-4 text-center"
        style={{
          borderColor: `${red}60`,
          background: `${red}08`,
          animation: 'glitch-bg 3s infinite',
        }}
      >
        <div
          className="font-monocraft text-2xl font-bold tracking-widest"
          style={{
            color: red,
            textShadow: `0 0 20px ${red}, 0 0 40px ${red}80`,
            filter: tick % 15 === 0 ? 'blur(1px)' : 'none',
          }}
        >
          {tick % 8 === 0 ? glitch('⚠ SIMULATION BREACH DETECTED ⚠') : '⚠ SIMULATION BREACH DETECTED ⚠'}
        </div>
        <div className="font-monocraft text-xs mt-2" style={{ color: `${red}80` }}>
          {tick % 6 === 0 ? glitch('YOU HAVE REACHED THE EDGE OF THE PORTFOLIO') : 'YOU HAVE REACHED THE EDGE OF THE PORTFOLIO'}
        </div>
        <div className="font-monocraft text-xs mt-1 opacity-50">
          CONTAINMENT COUNTDOWN: T-{String(countdown).padStart(2, '0')}s [LOOP_DETECTED]
        </div>
      </div>

      {/* ── HIDDEN STATS ──────────────────────────── */}
      <div>
        <div className="font-monocraft text-xs mb-3" style={{ color: `${red}80` }}>
          {'// CLASSIFIED :: ACTUAL_DEVELOPER_METRICS.JSON'}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {HIDDEN_STATS.map((stat, i) => (
            <div
              key={i}
              className="border p-3"
              style={{ borderColor: `${red}20`, background: 'rgba(255,0,68,0.03)' }}
            >
              <div className="font-monocraft text-xs opacity-50">{stat.label}</div>
              <div
                className="font-monocraft text-lg font-bold mt-1"
                style={{ color: i % 3 === 0 && tick % 10 === 0 ? glitch(stat.value) === stat.value ? red : '#fff' : red }}
              >
                {stat.value}
              </div>
              {stat.unit && (
                <div className="font-monocraft text-xs opacity-40 mt-0.5">{stat.unit}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── DEVELOPER LOGS ────────────────────────── */}
      <div>
        <div className="font-monocraft text-xs mb-3" style={{ color: `${red}80` }}>
          {'// SYSTEM_LOG :: REALTIME_OUTPUT'}
        </div>
        <div
          className="border p-4 font-monocraft text-xs space-y-1"
          style={{ borderColor: `${red}15`, background: 'rgba(0,0,0,0.5)', minHeight: 120 }}
        >
          {visibleLogs.map((log, i) => {
            const isErr = log.startsWith('[ERR]');
            const isOk = log.startsWith('[OK]');
            const isWarn = log.startsWith('[WARN]');
            const color = isErr ? '#FF0044' : isOk ? '#4ADE80' : isWarn ? '#FBBF24' : '#888';
            return (
              <div key={i} style={{ color, opacity: 0.6 + i * 0.1 }}>
                {i === visibleLogs.length - 1 ? (tick % 4 < 2 ? glitch(log) : log) : log}
              </div>
            );
          })}
          <div style={{ color: `${red}60` }}>
            {'> _'}{tick % 2 === 0 ? '█' : ' '}
          </div>
        </div>
      </div>

      {/* ── CLASSIFIED PERSONALITY ────────────────── */}
      <div>
        <div className="font-monocraft text-xs mb-3" style={{ color: `${red}80` }}>
          {'// PERSONALITY_DUMP :: NOT_ON_RESUME.DAT'}
        </div>
        <div className="space-y-2">
          {PERSONALITY.map((p, i) => (
            <div
              key={i}
              className="flex items-start gap-4 border p-3"
              style={{ borderColor: `${red}15`, background: 'rgba(255,0,68,0.02)' }}
            >
              <span className="text-xl shrink-0">{p.icon}</span>
              <div>
                <div className="font-monocraft text-xs font-bold" style={{ color: `${red}cc` }}>
                  {p.trait}
                </div>
                <div className="text-gray-400 text-xs mt-0.5">{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── FOOTER ────────────────────────────────── */}
      <p className="font-monocraft text-xs text-center opacity-20" style={{ color: red }}>
        {tick % 5 === 0 ? glitch('// this building does not exist. you did not see this.') : '// this building does not exist. you did not see this.'}
      </p>
    </div>
  );
}
