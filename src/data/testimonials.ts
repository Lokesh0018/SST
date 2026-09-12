export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Ananya Patel',
    text: '"From the first interaction, I felt like they understood exactly what I needed. Their attention to detail and personalized approach made all the difference. Highly recommend their services!"',
    rating: 5,
    avatar: 'https://ui-avatars.com/api/?name=Ananya+Patel&background=F4511E&color=fff'
  },
  {
    id: '2',
    name: 'Rahul Sharma',
    text: '"I\'ve been a loyal customer for years, and it\'s because of their consistent excellence. Their products exceed expectations every time, and their commitment to customer satisfaction is unmatched."',
    rating: 5,
    avatar: 'https://ui-avatars.com/api/?name=Rahul+Sharma&background=F4511E&color=fff'
  },
  {
    id: '3',
    name: 'Priya Singh',
    text: '"Finally, a company that listens and delivers! Their dedication to customer satisfaction is refreshing, and I couldn\'t be happier with the results they provided."',
    rating: 5,
    avatar: 'https://ui-avatars.com/api/?name=Priya+Singh&background=F4511E&color=fff'
  },
  {
    id: '4',
    name: 'Aarav Mehta',
    text: '"Absolutely stellar service! Their professionalism and expertise shine through in every interaction. They\'ve earned my trust and I\'ll gladly recommend them to all my friends."',
    rating: 5,
    avatar: 'https://ui-avatars.com/api/?name=Aarav+Mehta&background=F4511E&color=fff'
  },
  {
    id: '5',
    name: 'Neha Kapoor',
    text: '"I was skeptical at first, but they exceeded all my expectations! They took my vision and brought it to life with precision and care. Couldn\'t be happier with their work."',
    rating: 5,
    avatar: 'https://ui-avatars.com/api/?name=Neha+Kapoor&background=F4511E&color=fff'
  }
];
