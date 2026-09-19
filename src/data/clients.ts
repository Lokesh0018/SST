export interface Client {
  id: string;
  name: string;
  logo: string;
  category: string;
}

export const clients: Client[] = [
  // Hospitality
  { id: '1', name: 'Four Points by Sheraton', logo: '/images/logo/four-points-by-sheraton.svg', category: 'Hospitality' },
  { id: '2', name: 'Courtyard by Marriott', logo: '/images/logo/Courtyard.svg', category: 'Hospitality' },
  { id: '3', name: 'Fairfield by Marriott', logo: '/images/logo/Fairfield_by_Marriott_Logo_2017.svg', category: 'Hospitality' },
  { id: '4', name: 'Southern Spice Restaurants', logo: '/images/logo/southern-spice.svg', category: 'Hospitality' },
  { id: '5', name: 'Hyatt Regency', logo: '/images/logo/Hyatt_Logo.svg', category: 'Hospitality' },
  { id: '6', name: 'Double Tree by Hilton', logo: '/images/logo/HiltonHotelsLogo.svg', category: 'Hospitality' },
  { id: '7', name: 'Novotel', logo: '/images/logo/Novotel_logo_(2016).svg', category: 'Hospitality' },
  { id: '8', name: 'Taj Hotels', logo: '/images/logo/Taj_Hotels_logo.svg', category: 'Hospitality' },

  // Industries
  { id: '9', name: 'Andhra Paper Mill', logo: '/images/logo/Andhra Paper Limited.png', category: 'Industries' },
  { id: '10', name: 'Gemini Edible Oils', logo: '/images/logo/GEF.svg', category: 'Industries' },
  { id: '11', name: 'SAIL', logo: '/images/logo/SAIL_Logo.svg', category: 'Industries' },
  { id: '12', name: 'Vasanth Chemicals', logo: '/images/logo/vasanth-chemicals_logo.png', category: 'Industries' },
  { id: '13', name: 'Green Tech Pharma', logo: '/images/logo/Greentech.png', category: 'Industries' },
  { id: '14', name: 'Mandeo Motors', logo: '/images/logo/Ford_Mondeo_Mk_II_wordmark.svg', category: 'Industries' },
  { id: '15', name: 'Adani Wilmar', logo: '/images/logo/Adani_Wilmar.svg', category: 'Industries' },
  { id: '16', name: 'Aurora', logo: '/images/logo/aurora.png', category: 'Industries' },
  { id: '17', name: 'RS Associates', logo: '/images/logo/rslogo.webp', category: 'Industries' },
  { id: '18', name: 'GMFC Labs', logo: '/images/logo/gmfc_logo.svg', category: 'Industries' },
  { id: '19', name: 'Pilkington Automotive India Private Limited', logo: '/images/logo/pilkington-logo-vector.png', category: 'Industries' },

  // Financial
  { id: '20', name: 'Edelweiss Housing Finance', logo: '/images/logo/Edelweiss.svg', category: 'Financial' },
  { id: '21', name: 'Bajaj Finance', logo: '/images/logo/bajajfinserv.svg', category: 'Financial' },
  { id: '22', name: 'Shriram Finance', logo: '/images/logo/Shriram Transport Finance Logo SVG.svg', category: 'Financial' },
  { id: '23', name: 'Mahindra Finance', logo: '/images/logo/Mahindra_Finance.svg', category: 'Financial' },
  { id: '24', name: 'Muthoot Fin Corp', logo: '/images/logo/Muthoot-Finance.svg', category: 'Financial' },
  { id: '25', name: 'IIFL Finance', logo: '/images/logo/iifl-finance_logo.png', category: 'Financial' },

  // Tech & E-Commerce
  { id: '26', name: 'SS Infotech', logo: '/images/logo/ss_infotech_co_logo.jpeg', category: 'Tech & E-Commerce' },
  { id: '27', name: 'Flipkart', logo: '/images/logo/flipkart.svg', category: 'Tech & E-Commerce' },
  { id: '28', name: 'Lenskart', logo: '/images/logo/Lenskart.png', category: 'Tech & E-Commerce' },
  { id: '29', name: 'Swiggy', logo: '/images/logo/Swiggy.svg', category: 'Tech & E-Commerce' },
  { id: '30', name: 'Delhivery', logo: '/images/logo/Delhivery_Logo_(2019).png', category: 'Tech & E-Commerce' },

  // Banks
  { id: '31', name: 'HSBC', logo: '/images/logo/HSBC.svg', category: 'Banks' },
  { id: '32', name: 'HDFC', logo: '/images/logo/HDFC.svg', category: 'Banks' },
  { id: '33', name: 'SBI', logo: '/images/logo/sbi.svg', category: 'Banks' },
  { id: '34', name: 'Kotak Mahindra Bank', logo: '/images/logo/Kotak.svg', category: 'Banks' },
  { id: '35', name: 'Vijaya Bank', logo: '/images/logo/vijaya-bank_logo.png', category: 'Banks' },
  { id: '36', name: 'South Indian Bank', logo: '/images/logo/South_Indian_Bank_Logo.svg.png', category: 'Banks' },
  { id: '37', name: 'HDFC ERGO', logo: '/images/logo/HDFC_ERGO_General_Insurance_Company.svg', category: 'Banks' },
  { id: '38', name: 'Canara Bank', logo: '/images/logo/Canara-Bank.svg', category: 'Banks' },
  { id: '39', name: 'IndusInd Bank', logo: '/images/logo/IndusInd_Bank_SVG_Logo.svg', category: 'Banks' },
  { id: '40', name: 'Federal Bank', logo: '/images/logo/Federal-bank.svg', category: 'Banks' },

  // Retail
  { id: '41', name: 'Varun Motors PVT LTD', logo: '/images/logo/varunmoters_logo.svg', category: 'Retail' },
  { id: '42', name: 'Lifestyle', logo: '/images/logo/lifestyle.png', category: 'Retail' },
  { id: '43', name: 'Max', logo: '/images/logo/max.svg', category: 'Retail' },
  { id: '44', name: 'Splash', logo: '/images/logo/Splash_Festival_Logo.svg', category: 'Retail' },
  { id: '45', name: "Spencer's Retail", logo: "/images/logo/Spencer's Retail Logo PNG.png", category: 'Retail' },
  { id: '46', name: 'ANR Shopping Mall', logo: '/images/logo/ANRShoppingmall_logo.jpeg', category: 'Retail' },
  { id: '47', name: 'Blackberry', logo: '/images/logo/Blackberry.svg', category: 'Retail' },
  { id: '48', name: 'Reliance Fresh', logo: '/images/logo/reliance-fresh.svg', category: 'Retail' },

  // Technology Partners
  { id: '49', name: 'Cisco', logo: '/images/logo/Cisco.svg', category: 'Technology Partners' },
  { id: '50', name: 'CommScope', logo: '/images/logo/CommScope.svg', category: 'Technology Partners' },
  { id: '51', name: 'CP Plus', logo: '/images/logo/Cp Plus.svg', category: 'Technology Partners' },
  { id: '52', name: 'Dahua', logo: '/images/logo/Dahua_Technology.svg', category: 'Technology Partners' },
  { id: '53', name: 'Dell', logo: '/images/logo/Dell.svg', category: 'Technology Partners' },
  { id: '54', name: 'HP', logo: '/images/logo/HP_logo_2025.svg', category: 'Technology Partners' },
  { id: '55', name: 'Hikvision', logo: '/images/logo/Hikvision_logo.svg', category: 'Technology Partners' },
  { id: '56', name: 'Honeywell', logo: '/images/logo/Honeywell_logo.svg', category: 'Technology Partners' },
  { id: '57', name: 'Ruckus', logo: '/images/logo/Ruckus.png', category: 'Technology Partners' },
  { id: '58', name: 'Samsung', logo: '/images/logo/Samsung_Galaxy_logo.svg', category: 'Technology Partners' },
  { id: '59', name: 'Sony', logo: '/images/logo/Sony.svg', category: 'Technology Partners' },
  { id: '60', name: 'Ahuja', logo: '/images/logo/ahuja.svg', category: 'Technology Partners' },
  { id: '61', name: 'CamAttendance', logo: '/images/logo/camattendance-logo.svg', category: 'Technology Partners' },
  { id: '62', name: 'Seagate', logo: '/images/logo/seagate.svg', category: 'Technology Partners' },
  { id: '63', name: 'Uniview', logo: '/images/logo/uniview.svg', category: 'Technology Partners' },
  { id: '64', name: 'Toshiba', logo: '/images/logo/Toshiba.svg', category: 'Technology Partners' },
];
