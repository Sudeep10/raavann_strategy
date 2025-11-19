export interface CompanyModel {
  name: string;
  logoUrl: string;
  website: string;
  data: { strategyType: string; subStrategyType: string; text: string }[];
}

export const Companies: CompanyModel[] = [
  {
    name: "Amazon",
    logoUrl: "/company_icons/amazon.webp",
    website: "https://www.amazon.com",
    data: [
      {
        strategyType: "Growth",
        subStrategyType: "Business Model Growth",
        text: "Competes in interesting jobs by giving users a huge variety of options at their fingertips and at their doorstep, tapping into a virtually endless base of suppliers so people can spend more time enjoying the activity.",
      },
    ],
  },
  {
    name: "Netflix",
    logoUrl: "/company_icons/netflix.webp",
    website: "https://www.netflix.com",
    data: [
      {
        strategyType: "Growth",
        subStrategyType: "Business Model Growth",
        text: "Wins in interesting jobs by offering a very wide catalog of entertainment on demand, extending far beyond traditional options and letting users spend more time enjoying content than searching for it.",
      },
    ],
  },
  {
    name: "Spotify",
    logoUrl: "/company_icons/spotify.webp",
    website: "https://www.spotify.com",
    data: [
      {
        strategyType: "Growth",
        subStrategyType: "Business Model Growth",
        text: "Acts as an aggregator for music in interesting jobs, giving users a huge library at their fingertips and becoming the product that pops into mind when someone wants to listen to music, especially in moments like jogging.",
      },
    ],
  },
  {
    name: "Airbnb",
    logoUrl: "/company_icons/airbnb.webp",
    website: "https://www.airbnb.com",
    data: [
      {
        strategyType: "Growth",
        subStrategyType: "Business Model Growth",
        text: "Provides a wide array of stay options by tapping into a large, distributed base of hosts, creating a new market of suppliers and delivering more convenient choices than traditional accommodation channels.",
      },
    ],
  },
  {
    name: "Pinterest",
    logoUrl: "/company_icons/pinterest.webp",
    website: "https://www.pinterest.com",
    data: [
      {
        strategyType: "Growth",
        subStrategyType: "Business Model Growth",
        text: "Aggregates an enormous variety of ideas and inspirations so users can browse many options for things they enjoy doing, turning inspiration discovery into an at-your-doorstep digital experience.",
      },
    ],
  },
  {
    name: "YouTube",
    logoUrl: "/company_icons/youtube.webp",
    website: "https://www.youtube.com",
    data: [
      {
        strategyType: "Growth",
        subStrategyType: "Business Model Growth",
        text: "Lets users access an almost endless list of video creators and topics, expanding the market of content suppliers and making it easy to spend more time on enjoyable, interesting viewing.",
      },
    ],
  },
  {
    name: "Uber",
    logoUrl: "/company_icons/uber.webp",
    website: "https://www.uber.com",
    data: [
      {
        strategyType: "Operations",
        subStrategyType: "Process Optimization",
        text: "Targets boring jobs like getting from point A to point B by minimizing user effort and time, removing the struggle of finding and hailing a taxi on the street and instead picking users up from their doorstep and dropping them exactly where they want to go.",
      },
    ],
  },
  {
    name: "Deliveroo",
    logoUrl: "/company_icons/deliveroo.webp",
    website: "https://deliveroo.co.uk",
    data: [
      {
        strategyType: "Operations",
        subStrategyType: "Process Optimization",
        text: "Handles boring jobs like getting food by partnering with restaurants and couriers to streamline ordering and delivery so that users spend minimal time on the task and still get doorstep convenience.",
      },
    ],
  },
  {
    name: "Stripe",
    logoUrl: "/company_icons/stripe.webp",
    website: "https://stripe.com",
    data: [
      {
        strategyType: "Operations",
        subStrategyType: "Process Optimization",
        text: "Reduces the effort involved in boring financial tasks such as online payments by offering efficient services to businesses, simplifying and speeding up what would traditionally be slow, manual work.",
      },
    ],
  },
  {
    name: "DocuSign",
    logoUrl: "/company_icons/docusign.webp",
    website: "https://www.docusign.com",
    data: [
      {
        strategyType: "Operations",
        subStrategyType: "Process Optimization",
        text: "Speeds up boring paperwork by digitizing and simplifying document signing, reducing the time and friction involved in printing, mailing, and scanning documents in traditional workflows.",
      },
    ],
  },
  {
    name: "Revolut",
    logoUrl: "/company_icons/revolut.webp",
    website: "https://www.revolut.com",
    data: [
      {
        strategyType: "Operations",
        subStrategyType: "Process Optimization",
        text: "Takes over boring banking jobs like sending money abroad by offering a streamlined, app-based experience that minimizes time spent on traditional bank processes while keeping convenience high.",
      },
    ],
  },
  {
    name: "Git",
    logoUrl: "/company_icons/git.webp",
    website: "https://git-scm.com",
    data: [
      {
        strategyType: "Innovation",
        subStrategyType: "Process & Organizational Innovation",
        text: "Was created not just as a new version control tool but specifically to solve collaboration problems of centralized systems like CVS, redesigning how teams coordinate code changes rather than just tweaking existing tools.",
      },
    ],
  },
  {
    name: "ChatGPT",
    logoUrl: "/company_icons/chatgpt.webp",
    website: "https://chatgpt.com",
    data: [
      {
        strategyType: "Innovation",
        subStrategyType: "Product Innovation",
        text: "Redesigns how people consume information by removing the struggle of visiting multiple websites and instead giving direct, conversational answers; it positions itself as personalized assistance rather than search and then expands from personalized emails to code, images with Dall.e and videos with Sora.",
      },
    ],
  },
  {
    name: "WhatsApp",
    logoUrl: "/company_icons/whatsapp.webp",
    website: "https://www.whatsapp.com",
    data: [
      {
        strategyType: "Marketing",
        subStrategyType: "Retention & Engagement Strategy",
        text: "Serves a very high-frequency need, everyday communication, by making messaging fast and frictionless so users come back daily, turning a timeless psychological need into consistent engagement and retention.",
      },
    ],
  },
  {
    name: "Google",
    logoUrl: "/company_icons/google.webp",
    website: "https://www.google.com",
    data: [
      {
        strategyType: "Marketing",
        subStrategyType: "Brand Strategy",
        text: "Occupies the mental shelf space of searching; whenever users want to look up information, check the weather, search flights or hotels, Google is the product that pops into their head, and it reinforces this brand position by expanding from searching websites to searching images, hotels, and research papers.",
      },
    ],
  },
  {
    name: "Rolex",
    logoUrl: "/company_icons/rolex.webp",
    website: "https://www.rolex.com",
    data: [
      {
        strategyType: "Innovation",
        subStrategyType: "Product Innovation",
        text: "Rolex built its entire product strategy around solving three hard technical problems for mechanical wristwatches: keeping time as accurately as scientific instruments (chronometer precision), making cases truly waterproof (Oyster), and eliminating the need for daily winding (Perpetual self‑winding rotor). None of these were completely new ideas, but Rolex was the first to industrialize all three in one reliable, wearable product and then lock in IP where it mattered, like buying the screw‑down crown patent in 1926. Those three words you still see on the dial—Oyster Perpetual, Superlative Chronometer—are not marketing fluff; they are the summary of a 20‑year R&D agenda that permanently differentiated Rolex from other Swiss brands.",
      },
      {
        strategyType: "Innovation",
        subStrategyType: "Technology Innovation",
        text: "From the very start, Rolex outsourced what it couldn’t yet do itself to the best specialist it could find and then slowly pulled that know‑how in‑house. The clearest example is Aegler, the movement maker in Bienne that was uniquely good at small, precise calibers. Hans Wilsdorf spotted Aegler while he was still a clerk, made it his exclusive supplier on a handshake deal for decades, cross‑invested in the company, and only bought it outright in 2004. This let Rolex offer world‑class movements long before it had the factories to build them, and later gave it full control over the most critical part of the watch.",
      },
      {
        strategyType: "Operations",
        subStrategyType: "Supply Chain Strategy",
        text: "Rolex has spent a century turning a highly fragmented Swiss supplier network into a vertically integrated machine it controls end‑to‑end. Under Patrick Heiniger, it went from ~30 different sites down to four massive complexes: movements in Bienne, and cases, bracelets, dials and final assembly in and around Geneva. It bought its bracelet maker, its dial maker, and even set up its own precious metal foundry to cast proprietary alloys like Oystersteel and Everose gold. That vertical integration means every Submariner and Datejust is built to the same standard worldwide and shields Rolex from supplier quality shocks that still plague many rival brands.",
      },
      {
        strategyType: "Operations",
        subStrategyType: "Quality & Reliability Strategy",
        text: "Rolex treats manufacturing as an engineering problem, not a craft hobby. It designs its own machines to test its own machines: rigs that open and close clasps thousands of times a minute, pressure tanks to simulate deep‑sea dives, and custom scanners that verify every diamond is genuine even though only about 1 in 10 million stones turns out to be fake. It employs Nobel‑level material scientists in‑house, uses 904L steel that is harder to machine but more corrosion‑resistant, and builds movements to run for a decade or more between services. The result is a mass‑produced luxury product that behaves more like industrial equipment than jewelry.",
      },
      {
        strategyType: "Marketing",
        subStrategyType: "Brand Strategy",
        text: "Hans Wilsdorf understood early that in watches the name on the dial is the real asset. At a time when retailers put their own names on watches, he fought for years to have “Rolex” printed on more and more dials, and then spent heavily on ads so customers would walk into stores asking for Rolex by name. He chose the word Rolex because it was short, looked good on a dial, was easy to pronounce in every language, and didn’t mean anything else—very similar to how Kodak or Apple were chosen. Over time he added sub‑brands like Oyster, Perpetual, and Submariner, so even the technical features became branded assets.",
      },
      {
        strategyType: "Marketing",
        subStrategyType: "Acquisition Strategy",
        text: "Rather than buying celebrities for short‑term campaigns, Rolex systematically attached its watches to real‑world feats and the people who achieved them. It put Oysters on the wrist (or around the neck) of Mercedes Gleitze swimming the English Channel, on the hands of Malcolm Campbell breaking land‑speed records, on Everest expeditions, COMEX saturation divers, Pan Am jet pilots, and later on icons like Jack Nicklaus, Roger Federer and James Bond. Crucially, many of these were authentic preferences first and advertising stories second—Rolex then amplified them with big spends like buying the entire front page of the Daily Mail in 1927. That built a brand story of “the watch worn by people who actually do things,” not just pose with them.",
      },
      {
        strategyType: "Marketing",
        subStrategyType: "Go-to-Market Strategy",
        text: "Starting in the 1950s, Rolex essentially invented the “professional” or tool watch category by tying specific models to specific jobs. The Explorer was positioned as the Everest climber’s watch, the Submariner as the diver’s watch (helped by Jacques Cousteau and James Bond), the GMT‑Master as the jet‑age pilot’s watch with two time zones, the Milgauss for CERN engineers working in magnetic fields, and the Daytona for racing drivers. Each watch solved a real technical use case but, more importantly, let ordinary buyers cosplay those roles. The same product design also made the line easy to segment and sell: what you do—or want to be seen as doing—determines which Rolex you buy.",
      },
      {
        strategyType: "Marketing",
        subStrategyType: "Retention & Engagement Strategy",
        text: "Rolex deliberately makes it hard to buy its most desirable models and almost never chases spikes in demand with higher production or discounts. It raises retail prices slowly and predictably, refuses to cut prices in downturns, and lets the secondary market absorb excess enthusiasm with premiums and bubbles. Authorized dealers manage waitlists and allocations, which creates frustration but also makes finally getting “the call” a memorable event. This follows classic luxury ‘anti‑laws of marketing’: don’t respond to rising demand, don’t advertise price, and make access part of the appeal.",
      },
      {
        strategyType: "Growth",
        subStrategyType: "Business Model Growth",
        text: "Rolex’s key business model shift was from being an anonymous importer assembling Swiss movements into cases for retailers, to owning a global consumer brand that retailers depend on. Wilsdorf used chronometer certificates and heavy advertising to convince end customers that Rolex meant higher precision, while at the same time insisting that more of the watches he wholesaled carried the Rolex name on the dial. As consumer demand for Rolex‑branded pieces grew, retailers lost the power to substitute their own‑brand watches, and had to come to Rolex on its terms. That flipped Rolex from being just another supplier into the must‑have brand that anchors jewellers’ watch businesses.",
      },
      {
        strategyType: "Growth",
        subStrategyType: "Market Expansion",
        text: "The men’s wristwatch market didn’t exist when Wilsdorf started; he effectively created it. Before World War I, wristwatches were considered feminine ‘bracelets’ and serious men carried pocket watches that were passed down generations. Wilsdorf bet against this culture, arguing that pocket watches limited industry growth because they lasted forever and lived hidden in a vest. He saw that putting the watch on the wrist would both expose it to damage (so more replacements) and turn it into a visible fashion and status item. War usage in the trenches and Rolex’s relentless pushing of the category turned that contrarian belief into the new normal.",
      },
      {
        strategyType: "Competitive",
        subStrategyType: "Advantage Creation",
        text: "Rolex systematically turned objective third‑party validation into a competitive weapon. It pursued chronometer certification from observatories like Kew decades before rivals took wristwatches seriously, and then plastered “First Kew‑A certified wristwatch” across its ads. It did the same with depth ratings, timing for the Royal Navy, and records like deepest dive or highest climb. These certificates and records are hard to copy because they depend on actual product performance and long testing cycles, yet they are very easy for consumers to understand at a glance.",
      },
      {
        strategyType: "Competitive",
        subStrategyType: "Risk & Defense Strategy",
        text: "When existential threats hit the industry—World War I tariffs, World War II disruption, and the quartz crisis—Rolex’s instinct was to change geography and positioning, not chase the new technology head‑on. It moved assembly and then headquarters from London to neutral Switzerland to avoid British tariffs and anti‑German sentiment, and later leaned hard into ‘Swiss‑made’ prestige. With quartz, it experimented just enough to learn, but quickly concluded quartz would become a cheap commodity and instead repositioned mechanical watches as artisanal luxury objects. By refusing to join the low‑end race on quartz and fashion watches, Rolex preserved its margins and mystique while many Swiss rivals nearly disappeared.",
      },
      {
        strategyType: "Innovation",
        subStrategyType: "Business Model Innovation",
        text: "Rolex helped redefine what a mechanical watch was “for” after quartz made them obsolete as pure timekeepers. Instead of competing on accuracy with $20 Casios, it reframed mechanical watches as heirloom objects, feats of miniaturized engineering and visible badges of achievement. Advertising shifted from talking about features to lines like, “When a man has the world in his hands, you expect to find a Rolex on his wrist.” That shift in job‑to‑be‑done—from tool to symbol—opened up a far more profitable market than the old mass timekeeping business.",
      },
      {
        strategyType: "Operations",
        subStrategyType: "Execution Strategy",
        text: "Rolex deliberately limits how much it changes its core products. A modern Submariner or Datejust looks clearly related to versions from the 1950s, just subtly refined with better movements, improved bracelets and tougher materials. This Porsche‑911 style continuity makes older pieces feel timeless rather than dated, reinforces design recognition, and gives collectors confidence that today’s purchase won’t be orphaned by a fashion swing. It also simplifies manufacturing and service: Rolex can focus R&D on incremental reliability improvements rather than constantly reinventing the product line.",
      },
      {
        strategyType: "Growth",
        subStrategyType: "Channel & Distribution Growth",
        text: "For most of its history, Rolex chose not to own its own retail stores, instead wholesaling to independent jewellers who also stock competing brands. This seems counterintuitive, but it let Rolex scale globally without taking on store fixed costs, while still dictating high presentation standards and using its brand to pull customers into those shops. Only recently has it started to selectively buy key partners like Bucherer/Tourneau, partly to secure critical storefronts and partly to get closer to end‑customer data and waitlist management. It’s evolving its channel model cautiously, from pure wholesale towards hybrid, without undermining the ecosystem that made it dominant.",
      },
      {
        strategyType: "Innovation",
        subStrategyType: "R&D Strategy",
        text: "Tudor, Rolex’s sister brand, acts as an R&D and market‑testing lab that protects the Rolex name from failed experiments. Tudor uses third‑party movements and sells at a lower price point, but often debuts new case shapes, materials (like ceramic and titanium), and bolder dial designs that would be risky under the Rolex logo. If a Tudor idea proves durable with enthusiasts, Rolex can adopt a refined version years later. This ‘shield protects the crown’ setup lets Rolex keep its main brand ultra‑conservative while still innovating at the edges.",
      },
      {
        strategyType: "Financial",
        subStrategyType: "Capital Strategy",
        text: "Hans Wilsdorf put 100% of Rolex into the Hans Wilsdorf Foundation in the 1940s, with bylaws that forbid selling the company or taking it public. The foundation’s first duty is to ensure Rolex’s long‑term independence and operations; charity comes second. With no equity investors or quarterly earnings calls to satisfy, management can think in decades, not years: investing heavily in factories, holding marketing spend through recessions, and refusing to cash in by flooding the market. That unusual capital structure is a big reason Rolex can behave more like a dynasty than a normal consumer brand.",
      },
      {
        strategyType: "Financial",
        subStrategyType: "Revenue Strategy",
        text: "Rolex optimizes for long‑term pricing power rather than short‑term revenue maximization. It raises prices steadily above inflation, never discounts, and avoids big one‑off jumps that would anger loyal customers or make existing owners feel stupid. During boom times, it resists the temptation to dramatically ramp production, knowing that cutting back later would hurt the brand much more than leaving some demand unserved now. This discipline lets customers treat a Rolex as something that will at least hold value, which further reinforces demand.",
      },
      {
        strategyType: "Marketing",
        subStrategyType: "Channel Strategy",
        text: "Rolex’s sponsorship strategy is ruthlessly selective: if it enters a domain, it aims for the pinnacle only. In golf and tennis it backs the four majors and a small roster of the top players, some for their entire careers; in motor sport it’s Daytona and Formula 1; in culture it’s leading orchestras and opera houses. The company even calls its ambassadors ‘testimonees’ to emphasize long‑term association over transactional promotion. This creates a simple mental shortcut in consumers’ minds: wherever excellence is, Rolex is there too.",
      },
    ],
  },
  {
    name: "Apple",
    logoUrl: "/company_icons/apple.webp",
    website: "https://www.apple.com",
    data: [
      {
        strategyType: "Marketing",
        subStrategyType: "Go-to-Market Strategy",
        text: "Chose a niche of creatives rather than coders, and that focus allowed Apple to introduce the mouse and graphical user interface, redesigning the personal computer in ways that made sense for creatives but not for incumbents serving keyboard-centric coder markets.",
      },
    ],
  },
  {
    name: "Dyson",
    logoUrl: "/company_icons/dyson.webp",
    website: "https://www.dyson.com",
    data: [
      {
        strategyType: "Innovation",
        subStrategyType: "Product Innovation",
        text: "Introduced a fan without visible blades, a novel and interesting product design that rethinks how a fan looks and works, using novelty as a way to create desire in the market.",
      },
    ],
  },
  {
    name: "Red Bull",
    logoUrl: "/company_icons/red_bull.webp",
    website: "https://www.redbull.com",
    data: [
      {
        strategyType: "Competitive",
        subStrategyType: "Positioning Strategy",
        text: "Uses a flanking strategy by being almost the opposite of Coca-Cola in taste and feel, much less sweet and less carbonated, differentiating itself sharply instead of copying the incumbent drink.",
      },
    ],
  },
  {
    name: "Coca-Cola",
    logoUrl: "/company_icons/coca-cola.webp",
    website: "https://www.coca-cola.com",
    data: [
      {
        strategyType: "Competitive",
        subStrategyType: "Positioning Strategy",
        text: "Acts as the incumbent reference point in soft drinks, with challengers like Red Bull positioning themselves as the opposite in taste and experience to stand out against Coca-Cola.",
      },
    ],
  },
  {
    name: "Sprite",
    logoUrl: "/company_icons/sprite.webp",
    website: "https://www.sprite.com",
    data: [
      {
        strategyType: "Competitive",
        subStrategyType: "Positioning Strategy",
        text: "Positions itself differently from Coca-Cola by being sweeter and almost transparent, lacking the elements that make Coke dark, and thereby taking a distinct place in the soft drink lineup.",
      },
    ],
  },
  {
    name: "Bajaj Auto",
    logoUrl: "/company_icons/bajaj_auto.webp",
    website: "https://www.bajajauto.com",
    data: [
      {
        strategyType: "Competitive",
        subStrategyType: "Positioning Strategy",
        text: "Bajaj Pulsar is positioned as the opposite of Hero Honda Splendour, being more expensive, sportier, and consuming more fuel per kilometer, showing a deliberate contrast to target a different rider segment.",
      },
    ],
  },
  {
    name: "Bajaj Consumer Care",
    logoUrl: "/company_icons/bajaj_consumer_care.webp",
    website: "https://bajajconsumercare.com",
    data: [
      {
        strategyType: "Competitive",
        subStrategyType: "Positioning Strategy",
        text: "Bajaj Almond Oil differentiates itself from Parachute Coconut Oil and Navratna Oil, showing how oils in the same category can be positioned distinctly from one another rather than all copying the same formula.",
      },
    ],
  },
  {
    name: "Parachute Coconut Oil",
    logoUrl: "/company_icons/parachute_coconut_oil.webp",
    website: "https://www.parachuteadvansed.com",
    data: [
      {
        strategyType: "Competitive",
        subStrategyType: "Positioning Strategy",
        text: "Represents a distinct oil proposition compared with Bajaj Almond Oil and Navratna Oil, illustrating how multiple brands occupy different positions within the same overall hair oil market.",
      },
    ],
  },
  {
    name: "Navratna Oil",
    logoUrl: "/company_icons/navratna_oil.webp",
    website: "https://navratna.in",
    data: [
      {
        strategyType: "Competitive",
        subStrategyType: "Positioning Strategy",
        text: "Offers yet another differentiated variant compared with Parachute Coconut Oil and Bajaj Almond Oil, using contrast in formulation and perception as a way to stand out.",
      },
    ],
  },
  {
    name: "Hero Motocorp",
    logoUrl: "/company_icons/hero_motocorp.webp",
    website: "https://www.heromotocorp.com",
    data: [
      {
        strategyType: "Competitive",
        subStrategyType: "Positioning Strategy",
        text: "Honda Splendour Splendour Positions itself as a practical, fuel-efficient bike on which three people can sit, in contrast to sportier, more fuel-hungry options like the Pulsar, occupying a very different place in the buyer’s mind.",
      },
    ],
  },
  {
    name: "Royal Enfield",
    logoUrl: "/company_icons/royal_enfield.webp",
    website: "https://www.royalenfield.com",
    data: [
      {
        strategyType: "Competitive",
        subStrategyType: "Positioning Strategy",
        text: "Is positioned very differently from KTM bikes, with a distinct feel and persona, illustrating how two motorcycle brands can succeed by being almost opposites in character.",
      },
    ],
  },
  {
    name: "KTM",
    logoUrl: "/company_icons/ktm.webp",
    website: "https://www.ktm.com",
    data: [
      {
        strategyType: "Competitive",
        subStrategyType: "Positioning Strategy",
        text: "Stands in sharp contrast to Royal Enfield, with a very different riding feel and image, using that contrast as part of its competitive positioning strategy.",
      },
    ],
  },
  {
    name: "Jack Daniels",
    logoUrl: "/company_icons/jack_daniels.webp",
    website: "https://www.jackdaniels.com",
    data: [
      {
        strategyType: "Operations",
        subStrategyType: "Quality & Reliability Strategy",
        text: "The whiskey is made using Spring water from a Cave, which naturally filters iron and minerals. Maintaining these natural water conditions is highly unusual and inefficient. Jack Daniel’s also uses a unique charcoal mellowing step that predates many modern distillation techniques. Instead of barreling the raw spirit immediately after distillation, they slowly filter the whiskey through 10 feet of charcoal, a process lasting up to 10 days. It’s rare for distilleries to invest this much time and labor on filtration alone—many bypass it or use modern chemical filtration.",
      },
    ],
  },
  {
    name: "Aston Martin",
    logoUrl: "/company_icons/aston_martin.webp",
    website: "https://www.astonmartin.com",
    data: [
      {
        strategyType: "Operations",
        subStrategyType: "Quality & Reliability Strategy",
        text: "Designs its cars using principles and golden ratios inspired by Leonardo da Vinci and classical architecture, emphasizing craftsmanship and design quality over simple production efficiency. This deep mathematical integration into styling is uncommon and slows down design iteration but sets their cars apart visually.",
      },
    ],
  },
  {
    name: "Hermes",
    logoUrl: "/company_icons/hermes.webp",
    website: "https://www.hermes.com",
    data: [
      {
        strategyType: "Operations",
        subStrategyType: "Supply Chain Strategy",
        text: "Hermès’ way of working remains rooted in leathercraft techniques and artisanal principles established nearly 200 years ago. Hermès uses the traditional saddle stitch, which involves two needles. This creates a seam that is stronger than machine stitching—even if one thread snaps, the seam doesn’t unravel. This method demands intense manual skill, is slow, and causes hand fatigue, but cannot be replicated by machines. Hermès owns and manages its own silk farms. Hermes controls every stage, from the cultivation of silkworms to the processing of silk threads. They even own and raise saltwater crocodiles specifically for their leather. This is a highly unusual practice compared to other fashion brands, which typically source exotic skins or silk from third-party suppliers because its cost efficient and scalable.",
      },
    ],
  },
  {
    name: "Ferrari",
    logoUrl: "/company_icons/ferrari.webp",
    website: "https://www.ferrari.com",
    data: [
      {
        strategyType: "Operations",
        subStrategyType: "Quality & Reliability Strategy",
        text: "The whole process to build a Ferrari car takes about 3 months; they accept slow, handcrafted production. In that same period Honda’s Suzuka plant could make ≈86,400 cars (1 car every 90 seconds).Ferrari even has its own in-house foundry where solid aluminium ingots are heated in two large melting furnaces for core engine components. In short, the seemingly inefficient, fully manual build process is what creates superior quality. ",
      },
    ],
  },
  {
    name: "Lamborghini",
    logoUrl: "/company_icons/lamborghini.webp",
    website: "https://www.lamborghini.com",
    data: [
      {
        strategyType: "Operations",
        subStrategyType: "Quality & Reliability Strategy",
        text: "Each Lamborghini is hand-assembled. Lamborghini has achieved complete vertical control over carbon fiber manufacturing, a differentiator virtually no competitor possesses.For testing the quality of the carbon fiber material produced in-house, Lamborghini partnered with the International Space Station and sent samples of the material into space to evaluate its performance under harsh environmental conditions. This experiment is exceptionally rare for an automaker.",
      },
    ],
  },
  {
    name: "Bugatti",
    logoUrl: "/company_icons/bugatti.webp",
    website: "https://www.bugatti.com",
    data: [
      {
        strategyType: "Operations",
        subStrategyType: "Quality & Reliability Strategy",
        text: "Each Bugatti car is handmade, no conveyer belts or assembly lines are used. With a small team of only 20 people, Bugatti spends about six months constructing each Chiron. Each Bugatti Car is driven approx 350km or more before delievering it to the customer. Also, Bugatti's exhaust systems are made of titanium, this practice is not common in the general car industry.",
      },
    ],
  },
  {
    name: "Steinway & Sons",
    logoUrl: "/company_icons/steinway_&_sons.webp",
    website: "https://www.steinway.com",
    data: [
      {
        strategyType: "Operations",
        subStrategyType: "Quality & Reliability Strategy",
        text: "It takes quality wood to produce quality sound. After the wood arrives at the factory, it is dried for more than 2 years. Water evaporates naturally.Then takes about a year to build each piano and even pounds every piano 3200 times before delivery.The manufacturing process has remained virtually unchanged for 150 years, where every piano is still handmade.",
      },
    ],
  },
];

export const StrategyExplanations = [
  {
    name: "Market Expansion",
    explanation:
      "Growing by entering new locations or targeting new customer segments, allowing the business to reach audiences it couldn’t access before.",
  },
  {
    name: "Product Expansion",
    explanation:
      "Enhancing the existing product lineup with new features or variations so the company can solve more customer problems and attract broader demand.",
  },
  {
    name: "Channel & Distribution Growth",
    explanation:
      "Expanding the number of places where customers can buy your product—online, offline, or through partners—to increase reach and convenience.",
  },
  {
    name: "Business Model Growth",
    explanation:
      "Adjusting how the company earns revenue—subscriptions, bundles, usage-based pricing—to unlock new income streams and improve scalability.",
  },
  {
    name: "Customer Growth",
    explanation:
      "Increasing the customer base through stronger marketing, targeted outreach, and experiences that convert interest into actual users.",
  },
  {
    name: "M&A Growth",
    explanation:
      "Accelerating growth by acquiring or merging with other companies to gain customers, technology, or market access instantly.",
  },

  {
    name: "Positioning Strategy",
    explanation:
      "Defining the unique space your brand occupies in the market—premium, affordable, specialized, fast—so customers know exactly why you matter.",
  },
  {
    name: "Competitive Intelligence",
    explanation:
      "Systematically tracking competitor moves, strengths, and weaknesses to make smarter, faster strategic decisions.",
  },
  {
    name: "Advantage Creation",
    explanation:
      "Building long-lasting strengths—unique tech, strong brand, customer loyalty—that competitors cannot easily match.",
  },
  {
    name: "Risk & Defense Strategy",
    explanation:
      "Safeguarding the business from competitive threats and market disruptions by preparing counter-moves and protective tactics.",
  },

  {
    name: "Go-to-Market Strategy",
    explanation:
      "A focused plan for launching a product—who to target, how to reach them, and what messaging will drive adoption.",
  },
  {
    name: "Brand Strategy",
    explanation:
      "Crafting how the company presents itself—its identity, reputation, and promise—so people trust and recognize it instantly.",
  },
  {
    name: "Acquisition Strategy",
    explanation:
      "Bringing in new customers using the right mix of channels such as ads, content, SEO, partnerships, and community engagement.",
  },
  {
    name: "Retention & Engagement Strategy",
    explanation:
      "Keeping customers active and loyal by improving their experience, communication, and long-term value.",
  },
  {
    name: "Channel Strategy",
    explanation:
      "Choosing the best platforms—social, email, influencers, search—to communicate and sell to your audience effectively.",
  },

  {
    name: "Product Innovation",
    explanation:
      "Developing new products or significantly improving existing ones to deliver better value and stay ahead of competitors.",
  },
  {
    name: "Business Model Innovation",
    explanation:
      "Reinventing how the business operates and makes money to create stronger, more flexible revenue systems.",
  },
  {
    name: "Technology Innovation",
    explanation:
      "Using modern technologies such as AI, automation, or cloud systems to create smarter solutions and efficiencies.",
  },
  {
    name: "Process & Organizational Innovation",
    explanation:
      "Redesigning internal workflows and structures so teams can execute faster, smoother, and with fewer bottlenecks.",
  },
  {
    name: "Open & Collaborative Innovation",
    explanation:
      "Co-creating new ideas with partners, customers, or external experts to accelerate innovation and reduce risk.",
  },
  {
    name: "R&D Strategy",
    explanation:
      "Investing in research, experimentation, and exploration to discover breakthrough ideas and future product opportunities.",
  },

  {
    name: "Process Optimization",
    explanation:
      "Refining day-to-day operations to eliminate delays, reduce effort, and improve speed and efficiency.",
  },
  {
    name: "Supply Chain Strategy",
    explanation:
      "Designing a smooth flow of materials, production, and delivery so products reach customers reliably and at the right cost.",
  },
  {
    name: "Execution Strategy",
    explanation:
      "Turning strategic plans into disciplined action by aligning teams, resources, and timelines effectively.",
  },
  {
    name: "Automation Strategy",
    explanation:
      "Identifying tasks that can be automated to reduce manual work, lower errors, and increase consistency.",
  },
  {
    name: "Quality & Reliability Strategy",
    explanation:
      "Ensuring products or services perform consistently well so customers develop long-term trust.",
  },
  {
    name: "Cost Optimization",
    explanation:
      "Reducing unnecessary spending while preserving quality and performance across operations.",
  },

  {
    name: "Capital Strategy",
    explanation:
      "Determining the best ways to fund growth—investor capital, loans, retained earnings—based on goals and risk appetite.",
  },
  {
    name: "Revenue Strategy",
    explanation:
      "Designing methods to increase income through pricing, upsells, new products, and improved monetization.",
  },
  {
    name: "Cost Strategy",
    explanation:
      "Managing and controlling expenses to maintain profitability and financial health.",
  },
  {
    name: "Financial Planning & Analysis",
    explanation:
      "Forecasting financial performance and analyzing trends to guide smarter business decisions.",
  },
  {
    name: "Cash Flow Strategy",
    explanation:
      "Ensuring money flows in predictably and expenses are timed correctly so the business never faces a cash crunch.",
  },
  {
    name: "Risk Strategy",
    explanation:
      "Preparing for financial uncertainties—market shifts, economic changes, unforeseen losses—to protect stability.",
  },
];
