export const company = {
  name: "Newmax Industries Pvt. Ltd.",
  short: "N.M.I.",
  founded: 1993,
  city: "Delhi / Ghaziabad",
  phone: "+91 9911211451",
  // WhatsApp number in full international format, no + or spaces (used for wa.me links)
  whatsapp: "919911211451",
  emails: ["newmaxindustries@gmail.com", "newmaxinquiry@gmail.com"],
  address: "Plot No. A-1/29, Swadeshi Compound, Kavi Nagar Industrial Area, Sector 17, Ghaziabad, Uttar Pradesh 201002",
  gstin: "09AAKCN8320R1ZN",
  tagline: "The finest extrusion process, engineered since 1993.",
  about: "Established in 1993 in Delhi, Newmax Industries Pvt. Ltd. manufactures quality industrial machinery specialising in pipe extrusion, bunching, stranding, and cable-making equipment. Our range includes Pipe Extrusion Machines, Bunching Machines, Metal Spools, Cable Extruder Machines, PVC Pipe Making Plants, Screws & Barrels, and Pay-Off / Take-Up Machines. Backed by decades of experience, we build to the exact requirements of clients across many market segments.",
};

export const products = [
  {
    slug: "caterpillar",
    name: "Caterpillar",
    image: "/images/caterpillar.jpeg", // ← replace with e.g. "/images/caterpillar.jpg"
    tagline: "Constant, strain-free cable pulling",
    summary:
      "Belt caterpillar designed for steady cable pulling without creating strain on the cable.",
    details: [
      "Independent gripping roller system adjusts to cable irregularities.",
      "Pneumatic pressure with cable pulling by pneumatic cylinders.",
      "Controlled by solenoid valves for light, consistent pressure during pulling.",
    ],
  },
  {
    slug: "auto-coiler",
    name: "Auto Coiler",
    image: "/images/auto-coiler.jpeg", // ← replace with e.g. "/images/auto-coiler.jpg"
    tagline: "Automatic winding with high accuracy",
    summary:
      "Panel-controlled auto coiler driven by a 5 HP AC motor for precise, high-speed coiling.",
    details: [
      "Counter pulley and pneumatic brake to achieve the desired wire length.",
      "Traverse unit for layer winding, with proximity and limit switch safety.",
      "Disc brake for fast braking and high accuracy; double moving disc for fast coil shifting.",
    ],
  },
  {
    slug: "extruders",
    name: "Extruders",
    image: "/images/extruder.jpeg", // ← replace with e.g. "/images/extruders.jpg"
    tagline: "Screw diameters 32mm–150mm",
    summary:
      "The NEWMAX extruder series spans multiple machine sizes for a range of cable compounds.",
    details: [
      "Screw diameters from 32mm to 150mm.",
      "Handles PVC, PE, XLPE, HDPE and nylon compounds.",
      "For insulation, sheathing and skinning of power, control, signalling, auto and telephone cables.",
    ],
  },
  {
    slug: "portal-payoff-takeup",
    name: "Portal Type Payoff & Take-Up Machine",
    image: "/images/portal.jpeg",
    tagline: "Heavy-frame reel handling",
    summary:
      "Portal-type machine for loading, winding and unloading reels with robust control.",
    details: [
      "Loading and unloading of the reel by geared motors.",
      "Winding by AC/DC drive on heavy frames.",
      "Adjustable traversing pitch with pneumatic disk brakes.",
    ],
  },
  {
    slug: "6-1-stranding",
    name: "6+1 Skip/Bow Stranding Machine",
    image: "/images/6+1.jpeg", // ← replace with e.g. "/images/6-1-stranding.jpg"
    tagline: "Copper & aluminium stranding",
    summary:
      "High-speed skip / bow stranding machine for copper and aluminium wire.",
    details: [
      "Stranding of copper and aluminium wire.",
      "Insulated core twisting for multi-core cables.",
      "High-speed operation for production efficiency.",
    ],
  },
  {
    slug: "double-twist-bunching",
    name: "High Speed Double Twist Bunching Machine",
    image: "/images/high-speed.jpeg", // ← replace with e.g. "/images/double-twist-bunching.jpg"
    tagline: "Soundless running at high RPM",
    summary:
      "Double twist bunching machine suited to multi-strand wires, PVC cores and bare copper.",
    details: [
      "Suitable for multi-strand wires, PVC insulated cores and bare copper wire.",
      "Bows and arms well aligned for soundless running at high RPM.",
      "Through-hardened guide rollers and guide pulleys.",
    ],
  },
  {
    slug: "3-1-core-laying",
    name: "3+1 High Speed Core Laying Machine",
    image: "/images/3+1.jpeg", // ← replace with e.g. "/images/3-1-core-laying.jpg"
    tagline: "Bow-type, bobbin 500–630mm",
    summary:
      "High-speed bow-type core laying machine for multi-core cable assembly.",
    details: [
      "Type: bow type.",
      "Bobbin size: 500 mm to 630 mm.",
      "Maximum width: 475 mm; built for high-speed laying.",
    ],
  },

];

export const events = [
  { year: "2015", city: "Delhi", image: "/images/events/delhi-2015.avif" },
  { year: "2017", city: "Delhi", image: "/images/events/delhi-2017.avif" },
  { year: "2018", city: "Mumbai", image: "/images/events/mumbai-2018.avif" },
  { year: "2019", city: "Mumbai", image: "/images/events/mumbai-2019.avif" },
  { year: "2022", city: "Mumbai", image: "/images/events/mumbai-2022.avif" },
  { year: "2023", city: "Delhi", image: "/images/events/delhi-2023.avif" },
  { year: "2025", city: "Delhi", image: "/images/events/delhi-2025.avif" },
];

export const certificate = {
  title: "ISO 9001:2015",
  subtitle: "Certificate of Registration",
  image: "/images/certificate.avif",
};