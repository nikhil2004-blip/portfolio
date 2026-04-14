import { contact } from '@/content/experience';

export function ContactPanel() {
  return (
    <div className="text-white flex flex-col h-full">
      <h2 className="font-monocraft text-2xl text-mc-gold mb-6 border-b-2 border-mc-gold/30 pb-2">
        Multiplayer (Contact)
      </h2>

      <div className="flex-1 flex flex-col items-center justify-center py-8">
        <div className="bg-black/50 p-8 rounded border-4 border-gray-700 w-full max-w-md text-center">
          <p className="font-monocraft text-mc-green mb-8">{contact.status}</p>

          <div className="space-y-4">
            <a 
              href={`mailto:${contact.email}`} 
              className="mc-btn w-full block text-center font-monocraft py-3 text-sm"
            >
              Send Pigeon (Email)
            </a>
            
            <a 
              href={contact.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mc-btn w-full block text-center font-monocraft py-3 text-sm bg-gray-800"
            >
              GitHub Server
            </a>
            
            <a 
              href={contact.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mc-btn w-full block text-center font-monocraft py-3 text-sm bg-[#0A66C2]"
            >
              LinkedIn Network
            </a>
            
            <a 
              href={contact.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mc-btn w-full block text-center font-monocraft py-3 text-sm bg-blue-500"
            >
              Twitter Broadcast
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
