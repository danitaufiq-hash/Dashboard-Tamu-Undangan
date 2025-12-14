export interface Guest {
  id: string;
  name: string;
  phone: string; // Stored as raw input
  status: 'pending' | 'sent';
}

export interface InvitationTemplate {
  message: string;
  linkUrl: string; // The invitation link (e.g., website url)
}

export enum AppTab {
  GUESTS = 'GUESTS',
  TEMPLATE = 'TEMPLATE',
  SEND = 'SEND'
}