export interface BusinessConfig {
  name: string;
  tagline: string;
  hindiTagline: string;
  estd: string;
  logo: string;
  pamphletImage: string;
  address: {
    booth: string;
    block: string;
    market: string;
    city: string;
    state: string;
    country: string;
    full: string;
  };
  phones: {
    primary: string;
    secondary: string;
    displayPrimary: string;
    displaySecondary: string;
  };
  whatsapp: {
    number: string; // Configurable verified WhatsApp number
    isVerified: boolean;
  };
  mapsUrl: string;
  hours: string;
  deliveryNote: string;
}

export const businessConfig: BusinessConfig = {
  name: "Mom's Dairy",
  tagline: "Khayal Rakhe Jo Maa Jaisa",
  hindiTagline: "खयाल रखे जो माँ जैसा",
  estd: "2017",
  logo: "/assets/aistudio/Image_November_22__2026_-_10_28AM_a6e8529d",
  pamphletImage: "/assets/aistudio/Image_November_22__2026_-_10_28AM_9384ba3f",
  address: {
    booth: "Booth No. 50",
    block: "Block B",
    market: "Vatika City Central",
    city: "Ambala City",
    state: "Haryana",
    country: "India",
    full: "Booth No. 50, Block B, Vatika City Central, Ambala City, Haryana, India"
  },
  phones: {
    primary: "+919467704000",
    secondary: "+917494884909",
    displayPrimary: "+91 94677-04000",
    displaySecondary: "+91 74948-84909"
  },
  whatsapp: {
    number: "919467704000", // Defaulting to primary, easily configurable
    isVerified: true
  },
  mapsUrl: "https://maps.google.com/?q=Vatika+City+Central+Ambala+City",
  hours: "Open Daily: 6:00 AM - 9:00 PM",
  deliveryNote: "Home delivery available. Contact store to confirm timings and availability for your locality."
};
