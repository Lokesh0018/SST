export interface Client {
  id: string;
  name: string;
  logo: string;
  category: string;
}

export const clients: Client[] = [
  // Hospitality Sector
  { id: '1', name: 'Four Points by Sheraton', logo: '/images/logo/four-points-by-sheraton.svg', category: 'Hospitality Sector' },
  { id: '2', name: 'Courtyard by Marriott', logo: '/images/logo/Courtyard.svg', category: 'Hospitality Sector' },
  { id: '3', name: 'Fair Field by Marriott', logo: '', category: 'Hospitality Sector' },
  { id: '4', name: 'Southern Spice Restaurants', logo: '/images/logo/southern-spice.svg', category: 'Hospitality Sector' },
  { id: '5', name: 'Hyatt Regency', logo: '', category: 'Hospitality Sector' },
  { id: '6', name: 'Double Tree By Hilton', logo: '', category: 'Hospitality Sector' },
  { id: '7', name: 'Novotel', logo: '', category: 'Hospitality Sector' },
  { id: '8', name: 'Taj Hotels', logo: '', category: 'Hospitality Sector' },
  { id: '9', name: 'Amalapuram Heights', logo: '', category: 'Hospitality Sector' },

  // Industries
  { id: '10', name: 'Andhra Paper Mill', logo: '/images/logo/Andhra Paper Limited.png', category: 'Industries' },
  { id: '11', name: 'Gemini Edible Oils', logo: '/images/logo/GEF.svg', category: 'Industries' },
  { id: '12', name: 'Vizag Foods Pvt Ltd', logo: '', category: 'Industries' },
  { id: '13', name: 'Hobell Bellow.Co', logo: '', category: 'Industries' },
  { id: '14', name: 'Sail', logo: '', category: 'Industries' },
  { id: '15', name: 'Net Matrix Seeds', logo: '', category: 'Industries' },
  { id: '16', name: 'Vasanth Chemicals', logo: '', category: 'Industries' },
  { id: '17', name: 'Green Tech Pharma', logo: '/images/logo/Greentech.png', category: 'Industries' },
  { id: '18', name: 'Mandeo Motors', logo: '', category: 'Industries' },
  { id: '19', name: 'Laxmi Samanvi Fuels', logo: '', category: 'Industries' },
  { id: '20', name: 'Adani Wilmar', logo: '', category: 'Industries' },
  { id: '21', name: 'Victory Ferro Alloys', logo: '', category: 'Industries' },
  { id: '22', name: 'Aurora', logo: '', category: 'Industries' },
  { id: '23', name: 'Sri Venkateswara Ferro Alloys', logo: '', category: 'Industries' },
  { id: '24', name: 'RS Assosiates', logo: '', category: 'Industries' },
  { id: '25', name: 'GMFC Labs', logo: '', category: 'Industries' },
  { id: '26', name: 'Sneha Pharma', logo: '', category: 'Industries' },
  { id: '27', name: 'Pilkington Automotive India Private Limited', logo: '', category: 'Industries' },

  // Financial Institutions
  { id: '28', name: 'Edelwise Housing Finance', logo: '/images/logo/Edelweiss.svg', category: 'Financial Institutions' },
  { id: '29', name: 'Bajaj Finance', logo: '/images/logo/bajajfinserv.svg', category: 'Financial Institutions' },
  { id: '30', name: 'Shriram Finance', logo: '', category: 'Financial Institutions' },
  { id: '31', name: 'Mahindra Finance', logo: '/images/logo/Mahindra_Finance.svg', category: 'Financial Institutions' },
  { id: '32', name: 'Muthoot Fin Corp', logo: '/images/logo/Muthoot-Finance.svg', category: 'Financial Institutions' },
  { id: '33', name: 'IIFL Finance', logo: '', category: 'Financial Institutions' },

  // E-Commerce & Software Companies
  { id: '34', name: 'Mahathi Software', logo: '', category: 'E-Commerce & Software Companies' },
  { id: '35', name: 'Securius Global', logo: '', category: 'E-Commerce & Software Companies' },
  { id: '36', name: 'SE Techie', logo: '', category: 'E-Commerce & Software Companies' },
  { id: '37', name: 'SS Infotech', logo: '', category: 'E-Commerce & Software Companies' },
  { id: '38', name: 'Flipkart', logo: '/images/logo/flipkart.svg', category: 'E-Commerce & Software Companies' },
  { id: '39', name: 'Lenskart', logo: '/images/logo/Lenskart.png', category: 'E-Commerce & Software Companies' },
  { id: '40', name: 'Swiggy', logo: '/images/logo/Swiggy.svg', category: 'E-Commerce & Software Companies' },
  { id: '41', name: 'V4U Computer Inc', logo: '', category: 'E-Commerce & Software Companies' },
  { id: '42', name: 'Delivery', logo: '', category: 'E-Commerce & Software Companies' },

  // Banks
  { id: '43', name: 'HSBC', logo: '/images/logo/HSBC.svg', category: 'Banks' },
  { id: '44', name: 'HDFC', logo: '/images/logo/HDFC.svg', category: 'Banks' },
  { id: '45', name: 'SBI', logo: '/images/logo/sbi.svg', category: 'Banks' },
  { id: '46', name: 'Kotak Mahindra Bank', logo: '/images/logo/Kotak.svg', category: 'Banks' },
  { id: '47', name: 'Vijaya Bank', logo: '', category: 'Banks' },
  { id: '48', name: 'South Indian Bank', logo: '', category: 'Banks' },
  { id: '49', name: 'Hdfc Ergo', logo: '', category: 'Banks' },
  { id: '50', name: 'Canara Bank', logo: '/images/logo/Canara-Bank.svg', category: 'Banks' },
  { id: '51', name: 'IndusInd Bank', logo: '', category: 'Banks' },
  { id: '52', name: 'Federal Bank', logo: '/images/logo/Federal-bank.svg', category: 'Banks' },

  // Retail
  { id: '53', name: 'Varun Motors PVT LTD', logo: '', category: 'Retail' },
  { id: '54', name: 'Lifestyle', logo: '/images/logo/lifestyle.png', category: 'Retail' },
  { id: '55', name: 'Max', logo: '/images/logo/max.svg', category: 'Retail' },
  { id: '56', name: 'Splash', logo: '', category: 'Retail' },
  { id: '57', name: 'Spencer', logo: "/images/logo/Spencer's Retail Logo PNG.png", category: 'Retail' },
  { id: '58', name: 'Anr Shopping Mall', logo: '', category: 'Retail' },
  { id: '59', name: 'Blackberry', logo: '/images/logo/Blackberry.svg', category: 'Retail' },
  { id: '60', name: 'Reliance Fresh', logo: '/images/logo/reliance-fresh.svg', category: 'Retail' },
];
