// pages/api/platforms.js

export default function handler(req, res) {
  const platforms = [
    { value: "All", label: "All Platforms" },
    { value: "Unstop", label: "Unstop" },
    { value: "Devfolio", label: "Devfolio" },
    { value: "HackerEarth", label: "HackerEarth" },
    { value: "MLH", label: "MLH" }
  ];

  res.status(200).json(platforms);
}