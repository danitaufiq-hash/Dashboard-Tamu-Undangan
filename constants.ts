import { InvitationTemplate } from "./types";

export const INITIAL_TEMPLATE: InvitationTemplate = {
  message: `Halo {{nama}},\n\nKami mengundang Anda untuk hadir di acara pernikahan kami.\n\nMohon kehadiran dan doanya.\n\nDetail acara: {{link}}\n\nTerima kasih.`,
  linkUrl: "https://undangan.com/romeo-juliet"
};

export const MOCK_GUESTS = [
  { id: '1', name: 'Budi Santoso', phone: '081234567890', status: 'pending' },
  { id: '2', name: 'Siti Aminah', phone: '081987654321', status: 'sent' },
] as const;