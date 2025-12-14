import React, { useState } from 'react';
import { Guest } from '../types';
import { isValidIndonesianPhone } from '../utils/whatsapp';
import { Plus, Trash2, Edit2, Check, X, User, Phone } from 'lucide-react';

interface GuestManagerProps {
  guests: Guest[];
  setGuests: React.Dispatch<React.SetStateAction<Guest[]>>;
}

export const GuestManager: React.FC<GuestManagerProps> = ({ guests, setGuests }) => {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  
  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Nama tamu wajib diisi.');
      return;
    }
    if (!isValidIndonesianPhone(phone)) {
      setError('Nomor WhatsApp tidak valid (Gunakan format 08xx atau 628xx).');
      return;
    }

    const newGuest: Guest = {
      id: Date.now().toString(),
      name: name.trim(),
      phone: phone.trim(),
      status: 'pending'
    };

    setGuests(prev => [newGuest, ...prev]); // Add to top
    setName('');
    setPhone('');
    setError('');
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus tamu ini?')) {
      setGuests(prev => prev.filter(g => g.id !== id));
    }
  };

  const startEdit = (guest: Guest) => {
    setIsEditing(guest.id);
    setName(guest.name);
    setPhone(guest.phone);
    setError('');
  };

  const cancelEdit = () => {
    setIsEditing(null);
    setName('');
    setPhone('');
    setError('');
  };

  const saveEdit = () => {
     if (!name.trim()) {
      setError('Nama tamu wajib diisi.');
      return;
    }
    if (!isValidIndonesianPhone(phone)) {
      setError('Nomor WhatsApp tidak valid.');
      return;
    }

    setGuests(prev => prev.map(g => {
      if (g.id === isEditing) {
        return { ...g, name, phone };
      }
      return g;
    }));
    cancelEdit();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-primary-600" />
          Tambah Tamu Baru
        </h2>
        
        <form onSubmit={handleAddGuest} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
          <div className="md:col-span-5 space-y-1">
            <label className="text-xs font-medium text-gray-500 uppercase">Nama Tamu</label>
            <input
              type="text"
              value={isEditing ? '' : name}
              onChange={(e) => !isEditing && setName(e.target.value)}
              disabled={!!isEditing}
              placeholder="Contoh: Budi Santoso"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
            />
          </div>
          <div className="md:col-span-5 space-y-1">
            <label className="text-xs font-medium text-gray-500 uppercase">Nomor WhatsApp</label>
            <input
              type="tel"
              value={isEditing ? '' : phone}
              onChange={(e) => !isEditing && setPhone(e.target.value)}
              disabled={!!isEditing}
              placeholder="08123456789"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
            />
          </div>
          <div className="md:col-span-2 pt-6 md:pt-5">
             <button
              type="submit"
              disabled={!!isEditing}
              className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah</span>
            </button>
          </div>
        </form>
        {error && !isEditing && (
          <p className="text-red-500 text-sm mt-3 flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500"></span>
            {error}
          </p>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Daftar Tamu ({guests.length})</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Nama</th>
                <th className="px-6 py-4">WhatsApp</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {guests.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                    Belum ada data tamu. Silakan tambahkan di atas.
                  </td>
                </tr>
              ) : (
                guests.map((guest) => (
                  <tr key={guest.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {isEditing === guest.id ? (
                        <input 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full border px-2 py-1 rounded"
                          autoFocus
                        />
                      ) : guest.name}
                    </td>
                    <td className="px-6 py-4 font-mono text-gray-600">
                       {isEditing === guest.id ? (
                        <div className="space-y-1">
                          <input 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full border px-2 py-1 rounded"
                          />
                           {error && <p className="text-red-500 text-xs">{error}</p>}
                        </div>
                      ) : guest.phone}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        guest.status === 'sent' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {guest.status === 'sent' ? 'Terkirim' : 'Belum'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {isEditing === guest.id ? (
                        <div className="flex items-center justify-end gap-2">
                           <button onClick={saveEdit} className="p-1.5 text-green-600 hover:bg-green-50 rounded">
                            <Check className="w-4 h-4" />
                          </button>
                          <button onClick={cancelEdit} className="p-1.5 text-gray-500 hover:bg-gray-100 rounded">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => startEdit(guest)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(guest.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded transition">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};