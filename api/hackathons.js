// hackathon.js

const indianHackathons = [
  { 
    id: "1", 
    title: "Flipkart GRiD 7.0", 
    platform: "Flipkart", 
    startDate: "2026-09-15", 
    endDate: "2026-09-18", 
    deadline: "2026-09-10", 
    prize: "₹5Cr", 
    location: "Online", 
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=250&fit=crop", 
    description: "India's biggest E-commerce tech hackathon", 
    url: "https://unstop.com/flipkart-grid" 
  },
  { 
    id: "2", 
    title: "Smart India Hackathon 2026", 
    platform: "Govt of India", 
    startDate: "2026-08-01", 
    endDate: "2026-09-30", 
    deadline: "2026-07-25", 
    prize: "₹2Cr", 
    location: "Online", 
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop", 
    description: "Government of India Largest Hackathon", 
    url: "https://sih.gov.in/" 
  },
  { 
    id: "3", 
    title: "Devfolio Hackathon Season 7", 
    platform: "Devfolio", 
    startDate: "2026-06-20", 
    endDate: "2026-06-22", 
    deadline: "2026-06-19", 
    prize: "₹2L+", 
    location: "Hybrid", 
    image: "https://images.unsplash.com/photo-1504384308090-c54be3855833?w=400&h=250&fit=crop", 
    description: "Season 7 brings the best builders together", 
    url: "https://devfolio.co/browse/hackathons" 
  },
  { 
    id: "4", 
    title: "HackNIT 2026", 
    platform: "Unstop", 
    startDate: "2026-02-25", 
    endDate: "2026-02-26", 
    deadline: "2026-02-24", 
    prize: "₹1L", 
    location: "Offline", 
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=250&fit=crop", 
    description: "NIT Trichy Annual Mega Event", 
    url: "https://unstop.com/hackathons" 
  },
  { 
    id: "5", 
    title: "ETHIndia 2026", 
    platform: "ETHGlobal", 
    startDate: "2026-11-15", 
    endDate: "2026-11-17", 
    deadline: "2026-11-10", 
    prize: "$50K", 
    location: "Hybrid", 
    image: "https://images.unsplash.com/photo-1620712943543-9fa2b7a193a6?w=400&h=250&fit=crop", 
    description: "India's Biggest Ethereum Hackathon", 
    url: "https://ethglobal.com/events" 
  },
  { 
    id: "6", 
    title: "Microsoft Codess 2026", 
    platform: "Microsoft", 
    startDate: "2026-04-01", 
    endDate: "2026-04-15", 
    deadline: "2026-03-25", 
    prize: "$5K", 
    location: "Online", 
    image: "https://images.unsplash.com/photo-1633412802994-5fc058818e1c?w=400&h=250&fit=crop", 
    description: "Microsoft International Women's Hackathon", 
    url: "https://codess.education/" 
  },
  { 
    id: "7", 
    title: "Innogeeks Coding Challenge", 
    platform: "Devfolio", 
    startDate: "2026-03-05", 
    endDate: "2026-03-07", 
    deadline: "2026-03-04", 
    prize: "₹50K", 
    location: "Online", 
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=250&fit=crop", 
    description: "Cloud & AI Solutions Challenge", 
    url: "https://innogeeks.org/coding-challenge/" 
  },
  { 
    id: "8", 
    title: "Solveathon 2026", 
    platform: "Devfolio", 
    startDate: "2026-03-10", 
    endDate: "2026-03-12", 
    deadline: "2026-03-09", 
    prize: "₹25K", 
    location: "Online", 
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870b3?w=400&h=250&fit=crop", 
    description: "Open Source Development", 
    url: "https://devfolio.co/hackathons" 
  },
  { 
    id: "9", 
    title: "TCS CodeVita Season 11", 
    platform: "TCS", 
    startDate: "2026-01-15", 
    endDate: "2026-02-28", 
    deadline: "2026-01-10", 
    prize: "₹30L", 
    location: "Online", 
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870b3?w=400&h=250&fit=crop", 
    description: "TCS Annual Coding Championship", 
    url: "https://codevita.tcs.com/" 
  },
  { 
    id: "10", 
    title: "Amazon Hackon 2026", 
    platform: "Amazon", 
    startDate: "2026-05-20", 
    endDate: "2026-05-22", 
    deadline: "2026-05-15", 
    prize: "$10K", 
    location: "Online", 
    image: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=400&h=250&fit=crop", 
    description: "Amazon Student Hiring Challenge", 
    url: "https://amazon.jobs/" 
  },
  { 
    id: "11", 
    title: "Infosys HackWithInfy 2026", 
    platform: "Infosys", 
    startDate: "2026-06-10", 
    endDate: "2026-06-20", 
    deadline: "2026-06-05", 
    prize: "₹10L", 
    location: "Online", 
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=250&fit=crop", 
    description: "Infosys Topcoder Challenge", 
    url: "https://infysparkle.in/" 
  },
  { 
    id: "12", 
    title: "Shaastra 2026", 
    platform: "IIT Madras", 
    startDate: "2026-01-10", 
    endDate: "2026-01-12", 
    deadline: "2026-01-05", 
    prize: "₹2L", 
    location: "Offline", 
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop", 
    description: "IIT Madras Technical Festival", 
    url: "https://shaastra.org/" 
  },
  { 
    id: "13", 
    title: "HackIIIT Hyderabad", 
    platform: "Unstop", 
    startDate: "2026-02-15", 
    endDate: "2026-02-17", 
    deadline: "2026-02-12", 
    prize: "₹75K", 
    location: "Offline", 
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870b3?w=400&h=250&fit=crop", 
    description: "IIIT Hyderabad Annual Hackathon", 
    url: "https://unstop.com/hackathons" 
  },
  { 
    id: "14", 
    title: "KPIT Sparkle 2026", 
    platform: "KPIT", 
    startDate: "2026-10-01", 
    endDate: "2026-10-03", 
    deadline: "2026-09-25", 
    prize: "₹5L", 
    location: "Hybrid", 
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee16f?w=400&h=250&fit=crop", 
    description: "KPIT Automotive Innovation Hackathon", 
    url: "https://kpitsparkle.com/" 
  },
  { 
    id: "15", 
    title: "Google Summer of Code 2026", 
    platform: "Google", 
    startDate: "2026-05-01", 
    endDate: "2026-08-30", 
    deadline: "2026-04-15", 
    prize: "$3000", 
    location: "Online", 
    image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=400&h=250&fit=crop", 
    description: "Google Open Source Mentorship Program", 
    url: "https://summerofcode.withgoogle.com/" 
  },
  { 
    id: "16", 
    title: "MLH Fellowship 2026", 
    platform: "MLH", 
    startDate: "2026-01-15", 
    endDate: "2026-12-15", 
    deadline: "2026-01-10", 
    prize: "$5000", 
    location: "Online", 
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=250&fit=crop", 
    description: "MLH Full Time Remote Internship", 
    url: "https://fellowship.mlh.io/" 
  },
  { 
    id: "17", 
    title: "Atal Innovation Mission", 
    platform: "Govt of India", 
    startDate: "2026-06-01", 
    endDate: "2026-08-31", 
    deadline: "2026-05-25", 
    prize: "₹10L", 
    location: "Online", 
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop", 
    description: "Atal Tinkering Lab Hackathon", 
    url: "https://aim.gov.in/" 
  },
  { 
    id: "18", 
    title: "CodeAgatha 2026", 
    platform: "Unstop", 
    startDate: "2026-03-25", 
    endDate: "2026-03-27", 
    deadline: "2026-03-20", 
    prize: "₹50K", 
    location: "Online", 
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=250&fit=crop", 
    description: "Women in Tech Hackathon", 
    url: "https://unstop.com/hackathons" 
  },
  { 
    id: "19", 
    title: "Solana India Hackathon", 
    platform: "Solana", 
    startDate: "2026-08-15", 
    endDate: "2026-08-30", 
    deadline: "2026-08-10", 
    prize: "$100K", 
    location: "Online", 
    image: "https://images.unsplash.com/photo-1620712943543-9fa2b7a193a6?w=400&h=250&fit=crop", 
    description: "Solana Web3 Build Challenge India", 
    url: "https://solana.com/hackathon" 
  },
  { 
    id: "20", 
    title: "Polygon Build 2026", 
    platform: "Polygon", 
    startDate: "2026-07-01", 
    endDate: "2026-07-15", 
    deadline: "2026-06-28", 
    prize: "$50K", 
    location: "Online", 
    image: "https://images.unsplash.com/photo-1644600816581-9878f18d9d6f?w=400&h=250&fit=crop", 
    description: "Polygon Web3 India Hackathon", 
    url: "https://polygon.technology/" 
  },
  { 
    id: "21", 
    title: "Uber Mantra 2026", 
    platform: "Uber", 
    startDate: "2026-09-10", 
    endDate: "2026-09-12", 
    deadline: "2026-09-05", 
    prize: "$5K", 
    location: "Hybrid", 
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=250&fit=crop", 
    description: "Uber Mobility Innovation Challenge", 
    url: "https://uber.com/" 
  },
  { 
    id: "22", 
    title: "Adobe Creative Challenge", 
    platform: "Adobe", 
    startDate: "2026-04-20", 
    endDate: "2026-04-25", 
    deadline: "2026-04-15", 
    prize: "$10K", 
    location: "Online", 
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=250&fit=crop", 
    description: "Adobe Design & Innovation Challenge", 
    url: "https://adobe.com/" 
  },
  { 
    id: "23", 
    title: "Walmart Hackathon 2026", 
    platform: "Walmart", 
    startDate: "2026-05-10", 
    endDate: "2026-05-12", 
    deadline: "2026-05-05", 
    prize: "$15K", 
    location: "Online", 
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=250&fit=crop", 
    description: "Walmart TechHiring Challenge", 
    url: "https://walmart.com/" 
  },
  { 
    id: "24", 
    title: "Cisco Hackathon 2026", 
    platform: "Cisco", 
    startDate: "2026-10-15", 
    endDate: "2026-10-18", 
    deadline: "2026-10-10", 
    prize: "₹5L", 
    location: "Hybrid", 
    image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=400&h=250&fit=crop", 
    description: "Cisco Networking Challenge", 
    url: "https://cisco.com/" 
  },
  { 
    id: "25", 
    title: "Goldman Sachs Codeathon", 
    platform: "Goldman Sachs", 
    startDate: "2026-06-05", 
    endDate: "2026-06-07", 
    deadline: "2026-05-30", 
    prize: "$10K", 
    location: "Online", 
    image: "https://images.unsplash.com/photo-1633412802994-5fc058818e1c?w=400&h=250&fit=crop", 
    description: "Goldman Sachs Technical Challenge", 
    url: "https://goldmansachs.com/" 
  },
  { 
    id: "26", 
    title: "JPMC Code for Future", 
    platform: "JP Morgan", 
    startDate: "2026-03-15", 
    endDate: "2026-03-17", 
    deadline: "2026-03-10", 
    prize: "$5K", 
    location: "Online", 
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=250&fit=crop", 
    description: "JP Morgan Fintech Challenge", 
    url: "https://jpmorgan.com/careers" 
  },
  { 
    id: "27", 
    title: "Credbee Challenge", 
    platform: "Unstop", 
    startDate: "2026-02-10", 
    endDate: "2026-02-12", 
    deadline: "2026-02-08", 
    prize: "₹1L", 
    location: "Online", 
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop", 
    description: "Fintech Innovation Challenge", 
    url: "https://unstop.com/hackathons" 
  },
  { 
    id: "28", 
    title: "Deloitte Tech Challenge", 
    platform: "Deloitte", 
    startDate: "2026-04-10", 
    endDate: "2026-04-12", 
    deadline: "2026-04-05", 
    prize: "₹3L", 
    location: "Online", 
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870b3?w=400&h=250&fit=crop", 
    description: "Deloitte Innovation Challenge", 
    url: "https://deloitte.com/" 
  },
  { 
    id: "29", 
    title: "Paytm Build 2026", 
    platform: "Paytm", 
    startDate: "2026-05-01", 
    endDate: "2026-05-05", 
    deadline: "2026-04-25", 
    prize: "₹2L", 
    location: "Online", 
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=250&fit=crop", 
    description: "Paytm Digital Finance Challenge", 
    url: "https://paytm.com/" 
  },
  { 
    id: "30", 
    title: "Samsung Innovation Cup", 
    platform: "Samsung", 
    startDate: "2026-09-01", 
    endDate: "2026-09-05", 
    deadline: "2026-08-20", 
    prize: "$5K", 
    location: "Hybrid", 
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee16f?w=400&h=250&fit=crop", 
    description: "Samsung IoT Challenge India", 
    url: "https://samsung.com/" 
  }
];

export default function handler(req, res) {
  const { platform, location, search, page = 1, limit = 9 } = req.query;

  // Filtering Logic - Fixed to handle "All" option
  let filtered = indianHackathons.filter(h => {
    const matchPlatform = !platform || platform === 'All' || platform === '' || h.platform.toLowerCase() === platform.toLowerCase();
    const matchLocation = !location || location === 'All' || location === '' || h.location.toLowerCase() === location.toLowerCase();
    const matchSearch = !search || h.title.toLowerCase().includes(search.toLowerCase());

    return matchPlatform && matchLocation && matchSearch;
  });

  // Pagination
  const total = filtered.length;
  const start = (page - 1) * limit;
  const data = filtered.slice(start, start + parseInt(limit));

  res.json({
    hackathons: data,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / parseInt(limit))
    }
  });
}