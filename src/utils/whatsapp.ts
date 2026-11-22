import { businessConfig } from '../data/business';

interface WhatsAppOrderParams {
  productName: string;
  quantity: string | number;
  packaging?: string;
  customerName: string;
  address: string;
  notes?: string;
}

export function generateWhatsAppUrl(params: WhatsAppOrderParams): string {
  const { productName, quantity, packaging, customerName, address, notes } = params;
  
  const message = `Namaste Mom's Dairy! 🙏

I would like to enquire about the following product:

• Product: *${productName}*${packaging ? `\n• Packaging/Size: ${packaging}` : ''}
• Quantity: *${quantity}*
• Name: ${customerName}
• Delivery Address: ${address}${notes ? `\n• Additional Notes: ${notes}` : ''}

Please confirm the availability and total price. Thank you!`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${businessConfig.whatsapp.number}?text=${encodedMessage}`;
}

export function generateGeneralWhatsAppUrl(customMessage?: string): string {
  const message = customMessage || `Namaste Mom's Dairy! 🙏\n\nI would like to know more about your dairy products and home delivery services in Ambala City. Please guide me.`;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${businessConfig.whatsapp.number}?text=${encodedMessage}`;
}
