import React from 'react';
import { Guest, InvitationTemplate } from '../types';
import { generateWhatsAppLink } from '../utils/whatsapp';
import { Send, CheckCircle, ExternalLink, MessageCircle } from 'lucide-react';

interface DispatcherProps {
  guests: Guest[];
  template: InvitationTemplate;
  onMarkSent: (id: string) => void;
}

export const Dispatcher: React.FC<DispatcherProps> = ({ guests, template, onMarkSent }) => {
  
  const handleSend = (guest: Guest) => {
    const url = generateWhatsAppLink(template, guest);
    
    // Open WhatsApp in new tab
    window.open(url, '_blank', 'noopener,noreferrer');
    
    // Mark as sent
    onMarkSent(guest.id);
  };

  const pendingCount = guests.filter(g => g.status === 'pending').length;
  const sentCount = guests.filter(g => g.status === 'sent').length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
           <p className="text-xs text-gray-500 uppercase font-medium">Total Tamu</p>
           <p className="text-2xl font-bold text-gray-800">{guests.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
           <p className="text-xs text-yellow-600 uppercase font-medium">Belum Dikirim</p>
           <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
           <p className="text-xs text-green-600 uppercase font-medium">Sudah Dikirim</p>
           <p className="text-2xl font-bold text-green-600">{sentCount}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Send className="w-5 h-5 text-primary-600" />
            Kirim Undangan
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Klik tombol kirim untuk membuka WhatsApp Web/App dengan pesan yang sudah terisi.
          </p>
        </div>

        <div className="divide-y divide-gray-100">
          {guests.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              Belum ada tamu. Tambahkan tamu di menu "Data Tamu" terlebih dahulu.
            </div>
          ) : (
            guests.map((guest) => (
              <div key={guest.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-gray-50 transition gap-4">
                <div>
                  <h3 className="font-medium text-gray-900">{guest.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-mono text-gray-500">{guest.phone}</span>
                    {guest.status === 'sent' && (
                      <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">
                        <CheckCircle className="w-3 h-3" /> Terkirim
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                   {guest.status === 'sent' ? (
                     <button
                        onClick={() => handleSend(guest)}
                        className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition w-full sm:w-auto"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Kirim Ulang
                      </button>
                   ) : (
                      <button
                        onClick={() => handleSend(guest)}
                        className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 shadow-sm transition w-full sm:w-auto"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Kirim WhatsApp
                      </button>
                   )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};