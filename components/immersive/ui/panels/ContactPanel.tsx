import { Mail, GitBranch, Briefcase, Terminal, Copy, Check } from 'lucide-react';
import { contact } from '@/content/experience';
import { useState } from 'react';

interface Props { accentColor: string; }

export function ContactPanel({ accentColor }: Props) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };
  const links = [
    { label: 'EMAIL', href: `mailto:${contact.email}`, value: contact.email, Icon: Mail },
    { label: 'GITHUB', href: contact.github, value: 'nikhil2004-blip', Icon: GitBranch },
    { label: 'LINKEDIN', href: contact.linkedin, value: 'nikhil-kumar-yadav', Icon: Briefcase },
    { label: 'LEETCODE', href: contact.leetcode, value: 'LeetCode Profile', Icon: Terminal },
  ];

  return (
    <div className="text-white space-y-8 py-4">

      {/* Status */}
      <div className="border p-4 flex items-center gap-3" style={{ borderColor: `${accentColor}30` }}>
        <div className="w-3 h-3 rounded-full animate-pulse shrink-0" style={{ background: '#4ADE80' }} />
        <span className="font-monocraft text-sm" style={{ color: accentColor }}>{contact.status}</span>
      </div>

      {/* Terminal prompt */}
      <div className="border p-6 font-monocraft text-xs text-gray-500 space-y-1"
        style={{ borderColor: `${accentColor}20`, background: 'rgba(0,0,0,0.4)' }}
      >
        <div><span style={{ color: accentColor }}>$</span> ping nikhilyadavsky2004@gmail.com</div>
        <div className="pl-4 text-gray-600">Attempting connection...</div>
        <div className="pl-4" style={{ color: accentColor }}>✓ Host reachable. Response time: &lt; 24hrs (usually)</div>
        <div><span style={{ color: accentColor }}>$</span> whoami</div>
        <div className="pl-4">Nikhil Kumar Yadav — CS undergrad, builder, gym-goer, GTA veteran</div>
        <div><span style={{ color: accentColor }}>$</span> cat contact.json</div>
      </div>

      {/* Contact links */}
      <div className="space-y-3">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.label === 'EMAIL' ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="flex items-center justify-between border p-4 transition-all duration-200 hover:scale-[1.01] hover:opacity-80 group"
            style={{ borderColor: `${accentColor}25`, background: 'rgba(255,255,255,0.02)' }}
          >
            <div className="flex items-center gap-4">
              <span className="flex items-center justify-center w-6" style={{ color: `${accentColor}80` }}>
                <link.Icon size={18} />
              </span>
              <div>
                <div className="font-monocraft text-xs opacity-50">{link.label}</div>
                <div className="text-gray-300 text-sm mt-0.5">{link.value}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-monocraft text-xs opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: accentColor }}>
                {link.label === 'EMAIL' ? '[ SEND MAIL ✉ ]' : '[ OPEN → ]'}
              </span>
              {link.label === 'EMAIL' && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    copyToClipboard(contact.email, 'email');
                  }}
                  className="p-2 border transition-colors hover:bg-white/10"
                  style={{ borderColor: `${accentColor}40`, color: accentColor }}
                  title="Copy to clipboard"
                >
                  {copiedId === 'email' ? <Check size={14} /> : <Copy size={14} />}
                </button>
              )}
            </div>
          </a>
        ))}
        {copiedId === 'email' && (
          <div className="text-center font-monocraft text-[10px] animate-bounce" style={{ color: accentColor }}>
            [ ✓ EMAIL COPIED TO CLIPBOARD ]
          </div>
        )}
      </div>

      {/* Phone */}
      <div className="border p-4 flex items-center justify-between group" style={{ borderColor: `${accentColor}20`, background: 'rgba(255,255,255,0.02)' }}>
        <div>
          <div className="font-monocraft text-xs mb-1" style={{ color: accentColor }}>DIRECT_LINE</div>
          <div className="text-gray-300 text-sm font-monocraft">{contact.phone}</div>
          <div className="text-gray-600 text-xs mt-1">{"// Actual humans only. Recruiters welcome. Spam not."}</div>
        </div>
        <button
          onClick={() => copyToClipboard(contact.phone, 'phone')}
          className="p-2 border transition-colors hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ borderColor: `${accentColor}40`, color: accentColor }}
          title="Copy phone number"
        >
          {copiedId === 'phone' ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
      {copiedId === 'phone' && (
        <div className="text-center font-monocraft text-[10px] animate-bounce" style={{ color: accentColor }}>
          [ ✓ PHONE NUMBER COPIED ]
        </div>
      )}

      <p className="font-monocraft text-xs text-center opacity-30">
        {"// connection latency: 1 day (max) :: preferred protocol: email :: fallback: LinkedIn"}
      </p>
    </div>
  );
}
