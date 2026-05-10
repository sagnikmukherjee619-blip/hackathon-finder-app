const hackathons = [
  {id:"1",title:"AI Revolution 2024",platform:"Unstop",startDate:"2024-03-15",endDate:"2024-03-17",deadline:"2024-03-10",prize:"$50K",location:"Online",image:"https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",description:"AI/ML solutions"},
  {id:"2",title:"Web3 Warriors",platform:"Devfolio",startDate:"2024-04-01",endDate:"2024-04-03",deadline:"2024-03-25",prize:"₹10L",location:"Hybrid",image:"https://images.unsplash.com/photo-1644600816581-9878f18d9d6f?w=400&h=250&fit=crop",description:"Blockchain apps"},
  {id:"3",title:"HackNIT 2024",platform:"Unstop",startDate:"2024-02-24",endDate:"2024-02-25",deadline:"2024-02-20",prize:"₹5L",location:"Offline",image:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=250&fit=crop",description:"College hackathon"},
  {id:"4",title:"Solana Summer",platform:"Devfolio",startDate:"2024-03-10",endDate:"2024-03-15",deadline:"2024-03-05",prize:"$100K",location:"Online",image:"https://images.unsplash.com/photo-1620712943543-9fa2b7a193a6?w=400&h=250&fit=crop",description:"Solana blockchain"}
];

export default function handler(req, res) {
  const {platform,location,search,page=1,limit=9} = req.query;
  
  let filtered = hackathons.filter(h => {
    return (!platform || h.platform===platform) &&
           (!location || h.location===location) &&
           (!search || h.title.toLowerCase().includes(search?.toLowerCase()));
  });

  const total = filtered.length;
  const start = (page-1)*limit;
  const data = filtered.slice(start, start+parseInt(limit));

  res.json({
    hackathons: data,
    pagination: {page:parseInt(page),limit:parseInt(limit),total,pages:Math.ceil(total/parseInt(limit))}
  });
}