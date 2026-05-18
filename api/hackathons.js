// hackathon.js

const indianHackathons = [
  {
    id: "1",
    title: "Flipkart GRiD 6.0",
    platform: "Flipkart",
    startDate: "2025-03-15",
    endDate: "2025-03-18",
    deadline: "2025-03-10",
    prize: "₹5Cr",
    location: "Online",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=250&fit=crop",
    description: "India's biggest E-commerce tech hackathon"
  },
  {
    id: "2",
    title: "Devfolio Hackathon Season 6",
    platform: "Devfolio",
    startDate: "2025-04-20",
    endDate: "2025-04-22",
    deadline: "2025-04-19",
    prize: "₹2L+",
    location: "Hybrid",
    image: "https://images.unsplash.com/photo-1504384308090-c54be3855833?w=400&h=250&fit=crop",
    description: "Season 6 brings the best builders together"
  },
  {
    id: "3",
    title: "HackNIT 2025",
    platform: "Unstop",
    startDate: "2025-02-25",
    endDate: "2025-02-26",
    deadline: "2025-02-24",
    prize: "₹1L",
    location: "Offline",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=250&fit=crop",
    description: "NIT Trichy Annual Mega Event"
  },
  {
    id: "4",
    title: "Innogeeks Summit",
    platform: "Devfolio",
    startDate: "2025-03-05",
    endDate: "2025-03-07",
    deadline: "2025-03-04",
    prize: "₹50K",
    location: "Online",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=250&fit=crop",
    description: "Cloud & AI Solutions Challenge"
  },
  {
    id: "5",
    title: "JPMC Code for the Future",
    platform: "JPMorgan",
    startDate: "2025-05-01",
    endDate: "2025-05-03",
    deadline: "2025-04-25",
    prize: "$1000",
    location: "Online",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=250&fit=crop",
    description: "Fintech challenge for students"
  },
  {
    id: "6",
    title: "Hack On Stack 2025",
    platform: "Unstop",
    startDate: "2025-03-10",
    endDate: "2025-03-12",
    deadline: "2025-03-09",
    prize: "₹25K",
    location: "Online",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870b3?w=400&h=250&fit=crop",
    description: "Open Source Development"
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