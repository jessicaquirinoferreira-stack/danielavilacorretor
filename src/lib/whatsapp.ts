/**
 * Utility functions for generating official WhatsApp direct contact links
 * Official WhatsApp: wa.me/5511973245981 (+55 11 97324-5981)
 */

export const OFFICIAL_WHATSAPP_NUMBER = '5511973245981';
export const OFFICIAL_WHATSAPP_DISPLAY = '+55 11 97324-5981';

export function createWhatsAppLink(message: string, phoneNumber = OFFICIAL_WHATSAPP_NUMBER): string {
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}

export function getGeneralWhatsAppLink(brokerName = 'Gil Avila Daniel'): string {
  const text = `Olá, ${brokerName}! Encontrei seu site oficial e gostaria de conversar sobre oportunidades de imóveis na Zona Sul de São Paulo e região.`;
  return createWhatsAppLink(text);
}

export function getPropertyWhatsAppLink(property: {
  title: string;
  code: string;
  price?: number;
  neighborhood: string;
  transactionType?: string;
}): string {
  const priceFormatted = property.price
    ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(property.price)
    : 'A consultar';

  const text = `Olá, Gil Avila Daniel! Tenho interesse no imóvel:
*${property.title}* (Cód: ${property.code})
📍 Localização: ${property.neighborhood}
💰 Valor: ${priceFormatted}

Gostaria de obter mais informações e confirmar a disponibilidade atual deste imóvel.`;

  return createWhatsAppLink(text);
}

export function getDevelopmentWhatsAppLink(development: {
  name: string;
  code: string;
  neighborhood: string;
}): string {
  const text = `Olá, Gil Avila Daniel! Gostaria de receber a apresentação completa e detalhes das unidades do empreendimento:
🏢 *${development.name}* (Cód: ${development.code})
📍 Localização: ${development.neighborhood}

Você poderia me enviar a disponibilidade atualizada e tabela?`;

  return createWhatsAppLink(text);
}

export function getVisitSchedulerWhatsAppLink(data: {
  clientName: string;
  clientPhone: string;
  propertyTitle?: string;
  propertyCode?: string;
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
}): string {
  let text = `Olá, Gil Avila Daniel! Acabei de solicitar um agendamento de visita pelo seu site institucional:\n\n`;
  text += `👤 *Nome:* ${data.clientName}\n`;
  text += `📱 *Telefone:* ${data.clientPhone}\n`;

  if (data.propertyTitle) {
    text += `🏠 *Imóvel:* ${data.propertyTitle} ${data.propertyCode ? `(Cód: ${data.propertyCode})` : ''}\n`;
  }
  if (data.preferredDate) {
    text += `📅 *Data sugerida:* ${data.preferredDate}\n`;
  }
  if (data.preferredTime) {
    text += `⏰ *Horário sugerido:* ${data.preferredTime}\n`;
  }
  if (data.notes) {
    text += `💬 *Observação:* ${data.notes}\n`;
  }
  text += `\nPoderia me confirmar a disponibilidade para este agendamento?`;

  return createWhatsAppLink(text);
}

export function getLandingPageWhatsAppLink(lp: {
  title: string;
  slug: string;
  customMessage?: string;
}): string {
  if (lp.customMessage && lp.customMessage.trim().length > 0) {
    return createWhatsAppLink(lp.customMessage);
  }
  const text = `Olá, Gil Avila Daniel! Vi sua campanha sobre *${lp.title}* e gostaria de receber mais detalhes pelo WhatsApp.`;
  return createWhatsAppLink(text);
}
