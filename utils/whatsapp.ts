import { Guest, InvitationTemplate } from "../types";

// Validates Indonesian phone numbers roughly
// Accepts: 08xx, 628xx, +628xx
export const isValidIndonesianPhone = (phone: string): boolean => {
  const pattern = /^(\+62|62|0)8[1-9][0-9]{6,10}$/;
  return pattern.test(phone.replace(/\s|-/g, ''));
};

// Formats phone number to international format (628...) for API
export const formatPhoneForAPI = (phone: string): string => {
  let clean = phone.replace(/\D/g, ''); // Remove non-digits
  if (clean.startsWith('0')) {
    clean = '62' + clean.slice(1);
  } else if (clean.startsWith('62')) {
    // already good
  } else {
    // Fallback, though validation should catch this
    return clean;
  }
  return clean;
};

// Replaces placeholders in the template
export const generateMessage = (template: InvitationTemplate, guest: Guest): string => {
  let msg = template.message;
  msg = msg.replace(/{{nama}}/g, guest.name);
  msg = msg.replace(/{{link}}/g, template.linkUrl);
  return msg;
};

export const generateWhatsAppLink = (template: InvitationTemplate, guest: Guest): string => {
  const phone = formatPhoneForAPI(guest.phone);
  const text = generateMessage(template, guest);
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${phone}?text=${encodedText}`;
};