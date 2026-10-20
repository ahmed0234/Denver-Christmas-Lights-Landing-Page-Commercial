import type { IconName } from "./Icons";

export const PHONE_DISPLAY = "(720) 296-7711";
export const PHONE_HREF = "tel:+17202967711";

const BA = "/BeforeandAfterImages";
const SVC = "/BeforeAfter/services";

export const TRUST: { icon: IconName; title: string; text: string }[] = [
  { icon: "shield", title: "Fully Insured Crews", text: "Certificates of insurance available for your property manager." },
  { icon: "pen", title: "Brand-Aligned Designs", text: "Lighting planned around your building, signage and brand." },
  { icon: "tool", title: "Season-Long Maintenance", text: "Outage reported? We fix it within 24 to 48 hours." },
  { icon: "box", title: "Removal & Storage", text: "Everything comes down and goes into storage in January." },
];

export const SERVICES: {
  icon: IconName;
  title: string;
  text: string;
  bullets: [string, string];
}[] = [
  {
    icon: "car",
    title: "Car Dealerships",
    text: "Turn your lot into the brightest stop on the drive. Lit showrooms, rooflines and light poles catch the eye of holiday shoppers from the road.",
    bullets: ["Showrooms and rooflines", "Lot poles and entry signs"],
  },
  {
    icon: "church",
    title: "Churches & Houses of Worship",
    text: "Warm, welcoming lighting for steeples, entrances and grounds that invites your congregation and community to holiday services and events.",
    bullets: ["Steeples, entries and grounds", "Scheduled around services"],
  },
  {
    icon: "bell",
    title: "Hotels, Restaurants & Hospitality",
    text: "Make a festive first impression with lit entrances, patios, rooflines and porte-cochères that guests remember and photograph.",
    bullets: ["Entrances, patios and dining areas", "Installs around guest hours"],
  },
  {
    icon: "store",
    title: "Retail Stores & Shopping Centers",
    text: "Bring holiday shoppers to your doors with storefront, signage and parking lot lighting that looks consistent across every tenant.",
    bullets: ["Storefronts and signage", "Center-wide coordinated displays"],
  },
  {
    icon: "building",
    title: "Office Buildings & Corporate Campuses",
    text: "Polished holiday lighting for facades, lobbies and entrances that impresses tenants, employees and visitors across one building or many.",
    bullets: ["Facades and main entries", "Multi-building campuses"],
  },
  {
    icon: "home",
    title: "Apartment Buildings & HOAs",
    text: "Lit monument signs, gates, clubhouses and leasing offices that welcome residents home and lift curb appeal for prospective renters.",
    bullets: ["Monuments, gates and clubhouses", "Leasing offices and courtyards"],
  },
  {
    icon: "pen",
    title: "Custom Design & Proposals",
    text: "We plan a display around your architecture, foot traffic and brand colors, then send a clear, itemized proposal for approval.",
    bullets: ["Warm white, multicolor or brand colors", "Itemized pricing"],
  },
  {
    icon: "tool",
    title: "Maintenance, Takedown & Storage",
    text: "Your display stays fully lit all season, then comes down in January and goes into storage, leaving your grounds clean.",
    bullets: ["24 to 48 hour repairs", "Takedown early to mid January"],
  },
  {
    icon: "bulb",
    title: "Commercial-Grade LED Lights",
    text: "Bright, energy-efficient LEDs built for Colorado winters, with timers programmed to your operating hours.",
    bullets: ["Supplied by us", "Lower energy use"],
  },
];

// Placeholder reviews carried over from the main landing page. Replace with
// commercial client reviews once they're collected.
export const REVIEWS: { rating: string; quote: string; name: string; location: string }[] = [
  {
    rating: "5.0",
    quote: "Top tier service! They customized the roofline lighting perfectly to fit our home's architecture. Takedown and storage in January was seamless. Worth every penny.",
    name: "David & Karen K.",
    location: "Cherry Creek, Denver",
  },
  {
    rating: "4.9",
    quote: "From initial design to final glowing lights, everything was handled with perfection. Our kids were thrilled, and neighbors kept complimenting the display!",
    name: "Sarah P.",
    location: "Castle Pines, CO",
  },
  {
    rating: "4.8",
    quote: "Prompt, safe, and professional installation. The warm gold glow on our home's roofline created a holiday atmosphere that exceeded all expectations.",
    name: "Michael & Elena B.",
    location: "Wash Park, Denver",
  },
  {
    rating: "4.9",
    quote: "Extremely impressive attention to detail on our house. No visible clips, straight lines, and hassle-free post-season removal. Will definitely use them every year!",
    name: "Robert H.",
    location: "Littleton, CO",
  },
  {
    rating: "5.0",
    quote: "The team did an amazing job with our Christmas lights! The installation was flawless, and their attention to detail made our home the best on the block. Professional & on time!",
    name: "Jessica M.",
    location: "Highlands Ranch, CO",
  },
  {
    rating: "4.9",
    quote: "Super reliable and great communication from start to finish. They showed up when they said they would, and our home looks absolutely stunning. Highly recommend to any homeowner!",
    name: "Brandon T.",
    location: "Parker, CO",
  },
];

export const SERVICE_DETAILS: {
  id: string;
  title: string;
  nav: string;
  before: string;
  after: string;
  text: string;
  faqs: [string, string][];
}[] = [
  {
    id: "svc-dealerships",
    title: "Car Dealership Christmas Lights",
    nav: "Car Dealerships",
    before: `${BA}/CarDealershipBefore.webp`,
    after: `${BA}/CarDealershipAfter.webp`,
    text: "Your lot competes for attention with every other dealership on the road. We outline showrooms, rooflines and entrances and light trees and poles across the lot, so holiday shoppers notice your inventory from the street and your showroom feels like the place to stop.",
    faqs: [
      ["What's included", "Showroom and roofline outlines, entry and canopy lighting, lit trees and light poles across the lot, and timers set to your showroom hours."],
      ["Will installation get in the way of sales?", "No. We schedule work around your business hours and keep the lot, service drive and walkways clear so customers can shop as usual."],
    ],
  },
  {
    id: "svc-churches",
    title: "Churches & Houses of Worship",
    nav: "Churches & Worship",
    before: `${BA}/ChurchBefore.webp`,
    after: `${BA}/ChurchAfter.webp`,
    text: "Warm holiday lighting on steeples, arches, entrances and grounds welcomes your congregation and invites the wider community to Advent and Christmas services. We follow the architecture so stonework, windows and towers stand out without looking overdone.",
    faqs: [
      ["What's included", "Steeple, tower and roofline outlines, lit entrances and arches, tree and landscape lighting, and timers programmed around your service schedule."],
      ["Can you work around services and events?", "Yes. We plan installation, maintenance and takedown around worship times, weddings and community events so nothing is interrupted."],
    ],
  },
  {
    id: "svc-hotels",
    title: "Hotels & Hospitality",
    nav: "Hotels & Hospitality",
    before: `${BA}/HotelBefore.webp`,
    after: `${BA}/HotelAfter.webp`,
    text: "Guests judge a hotel from the moment they pull up. We light entrances, porte-cochères, facades and planters with garland, wreaths and lit trees, creating a festive arrival that photographs well and keeps the lobby feeling like the holidays.",
    faqs: [
      ["What's included", "Entrance and canopy lighting, lit garland and wreaths, facade accents, lit trees and planters, and cords routed safely away from guest traffic."],
      ["Do you install around guest hours?", "Yes. We work at quiet times, keep drop-off areas and doorways open and leave every walkway clean so guests are never inconvenienced."],
    ],
  },
  {
    id: "svc-offices",
    title: "Office Buildings & Corporate Campuses",
    nav: "Office Buildings",
    before: `${SVC}/OfficeBuilding/OfficeBuildingsBefore.webp`,
    after: `${SVC}/OfficeBuilding/OfficeBuildingsAfter.webp`,
    text: "Crisp, even lines along rooflines, columns and window bays give office buildings a polished holiday look that tenants, employees and visitors appreciate. We can light one building or coordinate a consistent display across an entire corporate campus.",
    faqs: [
      ["What's included", "Roofline, parapet and column outlines, main entry lighting, lit trees along approaches and parking areas, and timers set to your building schedule."],
      ["Can you handle multiple buildings?", "Yes. We design every building on your campus as one coordinated display, with a single proposal and one point of contact for your property manager."],
    ],
  },
  {
    id: "svc-retail",
    title: "Retail Stores & Shopping Centers",
    nav: "Retail & Shopping Centers",
    before: `${BA}/shoppingcenterbefore.webp`,
    after: `${BA}/shoppingcenterafter.webp`,
    text: "Holiday shoppers go where the season feels brightest. We light storefronts, signage, rooflines and trees across your retail center so every tenant looks consistent, the parking lot feels inviting and your property becomes a holiday destination.",
    faqs: [
      ["What's included", "Storefront and roofline outlines, signage accents, lit trees and walkways, wreaths and garland, and coordinated timers across the center."],
      ["Can tenants get a consistent look?", "Yes. We plan one design for the whole center so every storefront matches, and we install around store hours to keep doors open for shoppers."],
    ],
  },
];

export const WHY: { icon: IconName; title: string; text: string }[] = [
  { icon: "users", title: "Attract More Holiday Traffic", text: "A bright, professional display makes your business easy to find and invites shoppers, diners and visitors inside." },
  { icon: "star", title: "Strengthen Your Brand Image", text: "Straight lines, balanced spacing and a designed look show customers and tenants the care you put into your property." },
  { icon: "ladder", title: "Keep Staff Off Ladders", text: "Our trained installers handle every roofline and tree with professional equipment, so your team stays safely on the ground." },
  { icon: "clock", title: "Minimal Disruption", text: "We schedule installs around your operating hours and keep entrances, walkways and parking clear while we work." },
  { icon: "building", title: "Protect Your Property", text: "Professional clips and installation methods help prevent damage to roofing, gutters, facades, signage and trim." },
  { icon: "shield", title: "Fully Insured Professionals", text: "A trained, insured team with certificates of insurance available for property managers and HOA boards." },
];

export const STATS: { icon: IconName; title: string; text: string }[] = [
  { icon: "heart", title: "Locally Owned", text: "Serving Denver-area businesses" },
  { icon: "bulb", title: "Turnkey Service", text: "Design to takedown, one team" },
  { icon: "clock", title: "On Schedule", text: "Installed before your season starts" },
  { icon: "star", title: "4.9 Rated", text: "By local clients" },
];

export const STEPS: { title: string; text: string }[] = [
  { title: "Request Your Free Quote", text: "Tell us about your property, your goals and when you'd like the lights up." },
  { title: "Approve Your Lighting Plan", text: "We walk the site or review photos, then send an itemized proposal you can share for approval." },
  { title: "Open to a Brighter Season", text: "We install, maintain and remove your display. Your property shines from opening night to January." },
];

export const PROPERTIES: { icon: IconName; title: string; text: string }[] = [
  { icon: "door", title: "Retail & Storefronts", text: "Window and entry lighting that turns heads and brings shoppers in." },
  { icon: "heart", title: "Restaurants & Hospitality", text: "Patios, entrances and rooflines that set a festive mood for guests." },
  { icon: "building", title: "Office Buildings", text: "Polished lobbies, entrances and facades for tenants and visitors." },
  { icon: "users", title: "Shopping Centers", text: "Coordinated displays across storefronts, signage and parking areas." },
  { icon: "pin", title: "HOA Communities", text: "Lit monuments, gates, clubhouses and shared common areas." },
  { icon: "home", title: "Apartments & Multifamily", text: "Leasing offices, entries and courtyards that welcome residents home." },
];

export const AREAS = [
  "Denver",
  "Aurora",
  "Lakewood",
  "Centennial",
  "Littleton",
  "Arvada",
  "Westminster",
  "Highlands Ranch",
  "Parker",
  "Englewood",
];

export const FAQS: [string, string][] = [
  ["How much does commercial Christmas light installation cost?", "Pricing depends on the size of your property, rooflines and building height, the lighting design, access, the number of trees and landscape features, and the services included. Request a quote and we'll send itemized pricing for your property."],
  ["Do you provide the lights, or do we buy them?", "We supply commercial-grade LED lights cut to fit your property. Using our own lighting system means custom lengths, fewer electrical faults and full maintenance coverage all season."],
  ["Can you work around our business hours?", "Yes. We schedule installation, maintenance and takedown to keep disruption to your customers, staff and tenants to a minimum, and keep entrances and walkways clear while we work."],
  ["Can you provide a certificate of insurance?", "Yes. We're fully insured and can send a certificate of insurance to your property manager, HOA board or landlord before work begins."],
  ["Do you handle multiple locations or large properties?", "Yes. We light office parks, retail centers, HOA communities and multi-building sites, with one point of contact and a consistent look across every location."],
  ["When should we book commercial holiday lighting?", "As early as possible. Our calendar fills quickly from October, and commercial projects need time for design and approval. Booking early lets us install before your busy season, with lights set to turn on when you choose."],
  ["What happens if part of the display stops working?", "Maintenance is included all season. If a bulb or section goes out, contact us and we'll repair it within 24 to 48 hours at no extra charge."],
  ["When will the lights be removed?", "Takedown begins promptly after New Year's Day, usually between January 2 and January 20, weather permitting. We package and store everything for next season."],
];

/** "David & Karen K." -> "DK" (same rule as the design script) */
export const initials = (name: string) =>
  name
    .split(/[ &.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
