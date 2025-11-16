"use client";

import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  AppWindow,
  AppWindowIcon,
  Bot,
  BotIcon,
  BrainCircuit,
  BrainCircuitIcon,
  Cloud,
  CloudIcon,
  Cpu,
  CpuIcon,
  Database,
  Dna,
  Drone,
  DroneIcon,
  GpuIcon,
  HeartPulse,
  icons,
  Landmark,
  Leaf,
  LeafIcon,
  Rocket,
  ShieldCheck,
  ShieldCheckIcon,
  Smartphone,
  SolarPanel,
  View,
} from "lucide-react";
import { useState } from "react";

const companies = [
  {
    name: "Tech Innovators Inc.",
    icon: <CpuIcon className="size-20" />,
    founded: 2010,
    datapoints: [
      {
        text: "The company partnered with a leading AI research lab to find easy way to enter market.",
        strategy: "Market Entry",
      },
      {
        text: "They secured $10 million in Series A funding to expand their operations.",
        strategy: "Funding",
      },
      {
        text: "The startup launched a new product that leverages machine learning for better user experience.",
        strategy: "Product Launch",
      },
    ],
  },
  {
    name: "Future Solutions Ltd.",
    icon: <DroneIcon className="size-20" />,
    founded: 2015,
    datapoints: [
      {
        text: "Expanded logistics services into three new international markets.",
        strategy: "Expansion",
      },
      {
        text: "Achieved regulatory approval for autonomous delivery drones in urban areas.",
        strategy: "Regulatory",
      },
    ],
  },
  {
    name: "NextGen Technologies",
    icon: <CpuIcon className="size-20" />,
    founded: 2012,
    datapoints: [
      {
        text: "Released a new graphics processor that outperforms competitors by 30%.",
        strategy: "Product Launch",
      },
      {
        text: "Partnered with major gaming studios to optimize titles for their hardware.",
        strategy: "Partnership",
      },
    ],
  },
  {
    name: "AI Pioneers Co.",
    icon: <BrainCircuitIcon className="size-20" />,
    founded: 2018,
    datapoints: [
      {
        text: "Developed a proprietary large language model focused on scientific research.",
        strategy: "R&D",
      },
      {
        text: "Secured $50 million in Series B funding led by Quantum Ventures.",
        strategy: "Funding",
      },
      {
        text: "Pivoted from a consumer-facing app to an enterprise API model.",
        strategy: "Pivot",
      },
    ],
  },
  {
    name: "Quantum Leap Enterprises",
    icon: <BotIcon className="size-20" />,
    founded: 2016,
    datapoints: [
      {
        text: "Demonstrated a stable 128-qubit quantum computer prototype.",
        strategy: "R&D",
      },
      {
        text: "Acquired a specialized cryogenics firm to support their hardware development.",
        strategy: "Acquisition",
      },
    ],
  },
  {
    name: "CyberTech Dynamics",
    icon: <ShieldCheckIcon className="size-20" />,
    founded: 2011,
    datapoints: [
      {
        text: "Identified and patched a major zero-day vulnerability in a popular OS.",
        strategy: "Product Launch",
      },
      {
        text: "Landed a major government contract for national cybersecurity.",
        strategy: "Market Entry",
      },
    ],
  },
  {
    name: "Innovatech Solutions",
    icon: <AppWindowIcon className="size-20" />,
    founded: 2014,
    datapoints: [
      {
        text: "Reached 100,000 active users on their project management platform.",
        strategy: "Marketing",
      },
      {
        text: "Completed a successful rebranding to target a wider corporate audience.",
        strategy: "Marketing",
      },
    ],
  },
  {
    name: "Smart Systems Corp.",
    icon: <CloudIcon className="size-20" />,
    founded: 2013,
    datapoints: [
      {
        text: "Launched a new IoT platform for smart city infrastructure management.",
        strategy: "Product Launch",
      },
      {
        text: "Opened a new data center in Europe to comply with GDPR.",
        strategy: "Expansion",
      },
    ],
  },
  {
    name: "EcoVerse Energy",
    icon: <LeafIcon className="size-20" />,
    founded: 2017,
    datapoints: [
      {
        text: "Developed a new, more efficient solar panel using perovskite materials.",
        strategy: "R&D",
      },
      {
        text: "Committed to 100% recyclable materials in all their products by 2028.",
        strategy: "Sustainability",
      },
    ],
  },
  {
    name: "BioSyn Labs",
    icon: <Dna className="size-20" />,
    founded: 2019,
    datapoints: [
      {
        text: "Began Phase II clinical trials for a new gene-editing therapy.",
        strategy: "R&D",
      },
      {
        text: "Raised $120 million in an oversubscribed Series C funding round.",
        strategy: "Funding",
      },
    ],
  },
  {
    name: "Nexus Data Analytics",
    icon: <Database className="size-20" />,
    founded: 2014,
    datapoints: [
      {
        text: "Their data visualization tool was named 'Tool of the Year' by a major tech publication.",
        strategy: "Marketing",
      },
      {
        text: "Acquired a small data-cleaning startup to enhance their platform's capabilities.",
        strategy: "Acquisition",
      },
    ],
  },
  {
    name: "FinCore Capital",
    icon: <Landmark className="size-20" />,
    founded: 2016,
    datapoints: [
      {
        text: "Launched a robo-advisor platform for retail investors.",
        strategy: "Product Launch",
      },
      {
        text: "Reached $1 billion in assets under management.",
        strategy: "Expansion",
      },
    ],
  },
  {
    name: "Orion Mobile",
    icon: <Smartphone className="size-20" />,
    founded: 2011,
    datapoints: [
      {
        text: "Their primary social media app crossed 50 million daily active users.",
        strategy: "Marketing",
      },
      {
        text: "Shifted their entire infrastructure to a new cloud provider for better scalability.",
        strategy: "Operations",
      },
    ],
  },
  {
    name: "AeroDynamics Galactic",
    icon: <Rocket className="size-20" />,
    founded: 2008,
    datapoints: [
      {
        text: "Successfully launched their first commercial satellite into low-Earth orbit.",
        strategy: "Product Launch",
      },
      {
        text: "Partnered with NASA for a cargo resupply mission study.",
        strategy: "Partnership",
      },
    ],
  },
  {
    name: "HealthWave Diagnostics",
    icon: <HeartPulse className="size-20" />,
    founded: 2018,
    datapoints: [
      {
        text: "Received FDA approval for their AI-powered cancer detection tool.",
        strategy: "Regulatory",
      },
      {
        text: "Signed contracts with 5 major hospital networks to pilot their software.",
        strategy: "Market Entry",
      },
    ],
  },
  {
    name: "Veritas VR",
    icon: <View className="size-20" />,
    founded: 2020,
    datapoints: [
      {
        text: "Launched a new lightweight headset with a 4K per-eye display.",
        strategy: "Product Launch",
      },
      {
        text: "Raised $25 million in seed funding to build their metaverse platform.",
        strategy: "Funding",
      },
    ],
  },
  {
    name: "Apex Robotics",
    icon: <Bot className="size-20" />,
    founded: 2013,
    datapoints: [
      {
        text: "Automated a major auto manufacturer's assembly line, increasing efficiency by 40%.",
        strategy: "Market Entry",
      },
      {
        text: "Hired a new CEO from Boston Dynamics to lead their next phase of growth.",
        strategy: "Talent",
      },
    ],
  },
  {
    name: "CloudSphere Solutions",
    icon: <Cloud className="size-20" />,
    founded: 2015,
    datapoints: [
      {
        text: "Achieved 'Premier Partner' status with all three major cloud providers (AWS, Azure, GCP).",
        strategy: "Partnership",
      },
      {
        text: "Launched a new cloud cost-management tool that saves clients an average of 20%.",
        strategy: "Product Launch",
      },
    ],
  },
  {
    name: "GenetiCore",
    icon: <Dna className="size-20" />,
    founded: 2017,
    datapoints: [
      {
        text: "Pioneered a new CRISPR-Cas9 delivery method, reducing off-target effects.",
        strategy: "R&D",
      },
      {
        text: "Went public via a SPAC merger, valuing the company at $2 billion.",
        strategy: "Funding",
      },
    ],
  },
  {
    name: "Terraform Green",
    icon: <Leaf className="size-20" />,
    founded: 2019,
    datapoints: [
      {
        text: "Developed a carbon capture technology that is 99% efficient at the source.",
        strategy: "R&D",
      },
      {
        text: "Began construction on their first full-scale carbon capture plant.",
        strategy: "Expansion",
      },
    ],
  },
  {
    name: "QuantumSecure",
    icon: <ShieldCheck className="size-20" />,
    founded: 2021,
    datapoints: [
      {
        text: "Launched the first commercially available quantum-resistant encryption algorithm.",
        strategy: "Product Launch",
      },
      {
        text: "Formed a consortium with major banks to standardize post-quantum cryptography.",
        strategy: "Partnership",
      },
    ],
  },
  {
    name: "AgileSoft Inc.",
    icon: <AppWindow className="size-20" />,
    founded: 2009,
    datapoints: [
      {
        text: "Acquired by a larger tech conglomerate for $800 million.",
        strategy: "Acquisition",
      },
      {
        text: "Consistently rated as a 'Best Place to Work' for its remote-first culture.",
        strategy: "Talent",
      },
    ],
  },
  {
    name: "NeuralNet Systems",
    icon: <BrainCircuit className="size-20" />,
    founded: 2016,
    datapoints: [
      {
        text: "Their AI model for predicting stock market trends has shown 80% accuracy in back-testing.",
        strategy: "R&D",
      },
      {
        text: "Pivoted from financial tech to providing a general-purpose prediction API.",
        strategy: "Pivot",
      },
    ],
  },
  {
    name: "Pioneer Processors",
    icon: <Cpu className="size-20" />,
    founded: 2005,
    datapoints: [
      {
        text: "Announced a new 3nm chip architecture, pushing the boundaries of Moore's Law.",
        strategy: "Product Launch",
      },
      {
        text: "Invested $5 billion in building a new fabrication plant in Arizona.",
        strategy: "Expansion",
      },
    ],
  },
  {
    name: "Momentum Machines",
    icon: <CpuIcon className="size-20" />,
    founded: 2018,
    datapoints: [
      {
        text: "Created a new GPU architecture specifically for federated learning tasks.",
        strategy: "R&D",
      },
      {
        text: "Secured a $40 million Series A to compete with established chipmakers.",
        strategy: "Funding",
      },
    ],
  },
  {
    name: "DataWeave Corp.",
    icon: <Database className="size-20" />,
    founded: 2012,
    datapoints: [
      {
        text: "Launched a real-time data streaming and processing platform.",
        strategy: "Product Launch",
      },
      {
        text: "Achieved ISO 27001 certification for their data handling practices.",
        strategy: "Regulatory",
      },
    ],
  },
  {
    name: "Zenith BankTech",
    icon: <Landmark className="size-20" />,
    founded: 2017,
    datapoints: [
      {
        text: "Provides the core banking-as-a-service (BaaS) infrastructure for 15 new neo-banks.",
        strategy: "Market Entry",
      },
      {
        text: "Acquired a KYC/AML verification startup to streamline customer onboarding.",
        strategy: "Acquisition",
      },
    ],
  },
  {
    name: "ConnectApp",
    icon: <Smartphone className="size-20" />,
    founded: 2019,
    datapoints: [
      {
        text: "Launched a viral marketing campaign that resulted in 1 million downloads in 24 hours.",
        strategy: "Marketing",
      },
      {
        text: "Introduced a new 'Digital Wellbeing' feature based on user feedback.",
        strategy: "Product Launch",
      },
    ],
  },
  {
    name: "MediVerse Solutions",
    icon: <View className="size-20" />,
    founded: 2018,
    datapoints: [
      {
        text: "Developed a VR platform for surgical training, now used in 20 medical schools.",
        strategy: "Market Entry",
      },
      {
        text: "Published a study showing their VR training reduces surgical errors by 25%.",
        strategy: "R&D",
      },
    ],
  },
  {
    name: "VitaHealth",
    icon: <HeartPulse className="size-20" />,
    founded: 2020,
    datapoints: [
      {
        text: "Launched a personalized nutrition app based on user's genetic markers.",
        strategy: "Product Launch",
      },
      {
        text: "Partnered with a large chain of fitness centers to offer co-branded memberships.",
        strategy: "Partnership",
      },
    ],
  },
  {
    name: "Atlas Unmanned",
    icon: <Drone className="size-20" />,
    founded: 2016,
    datapoints: [
      {
        text: "Their heavy-lift cargo drone successfully completed a 100-mile automated delivery.",
        strategy: "R&D",
      },
      {
        text: "Secured a pilot program for offshore rig inspections with a major oil company.",
        strategy: "Market Entry",
      },
    ],
  },
  {
    name: "BioEnhance Inc.",
    icon: <Dna className="size-20" />,
    founded: 2015,
    datapoints: [
      {
        text: "Created a new line of biodegradable plastics from algae.",
        strategy: "Product Launch",
      },
      {
        text: "Secured a major distribution deal with a global packaging company.",
        strategy: "Partnership",
      },
    ],
  },
  {
    name: "Solaris Innovations",
    icon: <SolarPanel className="size-20" />,
    founded: 2011,
    datapoints: [
      {
        text: "Launched a community solar program allowing renters to buy into solar energy.",
        strategy: "Product Launch",
      },
      {
        text: "Successfully lobbied for new green energy tax credits in three states.",
        strategy: "Regulatory",
      },
    ],
  },
  {
    name: "Fortress Cyber",
    icon: <ShieldCheck className="size-20" />,
    founded: 2019,
    datapoints: [
      {
        text: "Specializes in endpoint security for remote-first workforces.",
        strategy: "Product Launch",
      },
      {
        text: "Grew annual recurring revenue (ARR) by 300% in the last fiscal year.",
        strategy: "Expansion",
      },
    ],
  },
  {
    name: "Synapse AI",
    icon: <BrainCircuit className="size-20" />,
    founded: 2022,
    datapoints: [
      {
        text: "A spin-off from a university research lab, founded by a leading AI professor.",
        strategy: "Market Entry",
      },
      {
        text: "Raised one of the largest seed rounds on record, $75 million, to build a foundational model.",
        strategy: "Funding",
      },
    ],
  },
  {
    name: "LogicChip Designs",
    icon: <Cpu className="size-20" />,
    founded: 2017,
    datapoints: [
      {
        text: "Designs custom, low-power ASICs for edge computing devices.",
        strategy: "Product Launch",
      },
      {
        text: "Their chip is now used in the top three best-selling smart home cameras.",
        strategy: "Market Entry",
      },
    ],
  },
  {
    name: "RenderCore",
    icon: <Cpu className="size-20" />,
    founded: 2020,
    datapoints: [
      {
        text: "Launched a cloud-based GPU rendering service for VFX and animation studios.",
        strategy: "Product Launch",
      },
      {
        text: "Partnered with a major art college to provide free access to students.",
        strategy: "Marketing",
      },
    ],
  },
  {
    name: "Automata Labs",
    icon: <Bot className="size-20" />,
    founded: 2018,
    datapoints: [
      {
        text: "Developed a new robotic arm with tactile feedback for delicate assembly tasks.",
        strategy: "R&D",
      },
      {
        text: "Expanded their manufacturing facility to meet a 5x increase in orders.",
        strategy: "Expansion",
      },
    ],
  },
  {
    name: "NebulaCloud",
    icon: <Cloud className="size-20" />,
    founded: 2016,
    datapoints: [
      {
        text: "Provides a specialized, high-performance cloud for scientific computing.",
        strategy: "Product Launch",
      },
      {
        text: "Was acquired by a major public cloud provider to integrate its niche services.",
        strategy: "Acquisition",
      },
    ],
  },
  {
    name: "Streamline SaaS",
    icon: <AppWindow className="size-20" />,
    founded: 20,
    datapoints: [
      {
        text: "Offers a suite of productivity tools for remote and hybrid teams.",
        strategy: "Product Launch",
      },
      {
        text: "Reached profitability within 2 years of launch through efficient operations.",
        strategy: "Operations",
      },
    ],
  },
];

const datapoints = [
  {
    text: "The company partnered with a leading AI research lab to find easy way to enter market.",
    strategy: "Market Entry",
    company: "Tech Innovators Inc.",
  },
  {
    text: "They secured $10 million in Series A funding to expand their operations.",
    strategy: "Funding",
    company: "Tech Innovators Inc.",
  },
  {
    text: "The startup launched a new product that leverages machine learning for better user experience.",
    strategy: "Product Launch",
    company: "Quantum Leap Enterprises",
  },
  {
    text: "The company partnered with a leading AI research lab to find easy way to enter market.",
    strategy: "Market Entry",
    company: "Tech Innovators Inc.",
  },
  {
    text: "They secured $10 million in Series A funding to expand their operations.",
    strategy: "Funding",
    company: "CyberTech Dynamics",
  },
  {
    text: "The startup launched a new product that leverages machine learning for better user experience.",
    strategy: "Product Launch",
    company: "Innovatech Solutions",
  },
];

const CompanyDialog = ({
  company,
}: {
  company: {
    name: string;
    icon: React.ReactNode;
    founded: number;
    datapoints: { text: string; strategy: string }[];
  };
}) => {
  const [strategyType, setStrategyType] = useState<string>("All");
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div
            className="flex flex-col justify-center items-center p-2 text-center rounded-md hover:cursor-pointer hover:bg-muted"
            key={company.name}
          >
            <div>{company.icon}</div>
            <p className="font-medium text-wrap">{company.name}</p>
            <p className="text-sm text-muted-foreground">
              Founded: {company.founded}
            </p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <div className="flex flex-col gap-2">
            <div>
              <img
                src={`https://placehold.co/1920x720/000000/FFFFFF?text=${encodeURIComponent(company.name)}`}
                alt="Company Banner"
              />
            </div>
            <div className="flex flex-col gap-2 mt-5 h-[400px]">
              <div className="flex overflow-y-auto gap-2">
                <Badge
                  variant={strategyType === "All" ? "default" : "outline"}
                  onClick={() => setStrategyType("All")}
                >
                  All
                </Badge>
                {company.datapoints.map((data, index) => (
                  <Badge
                    key={index}
                    variant={
                      strategyType === data.strategy ? "default" : "outline"
                    }
                    onClick={() => setStrategyType(data.strategy)}
                  >
                    {data.strategy}
                  </Badge>
                ))}
              </div>
              <div className="flex overflow-y-auto flex-col flex-1 gap-2">
                {company.datapoints
                  .filter(
                    (data) =>
                      strategyType === "All" || data.strategy === strategyType,
                  )
                  .map((data, index) => (
                    <div
                      className="flex flex-col justify-between items-start p-4 w-full rounded-md border"
                      key={index}
                    >
                      <p className="text-wrap">{data.text}</p>
                      {strategyType === "All" && (
                        <div className="flex flex-col gap-1">
                          <Badge variant={"outline"}>{data.strategy}</Badge>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default function Page() {
  return (
    <div className="flex flex-col min-h-dvh">
      <div className="flex flex-col flex-1 p-2">
        <div className="flex justify-center items-center mt-5">
          <Input
            placeholder="Search related companies & data points to your idea"
            className="lg:mx-20 p-8 text-xl! rounded-full placeholder:text-xl"
          />
        </div>
        <div className="mt-10 lg:ml-20">
          <div className="flex flex-col gap-5">
            <p className="text-2xl font-semibold">Related Companies</p>
            <div className="grid overflow-y-auto grid-flow-col auto-cols-max gap-10 w-full">
              {companies
                .slice(0, 10) // take 10
                .map((company) => (
                  <div key={company.name} className="mb-5">
                    <CompanyDialog company={company} />
                  </div>
                ))}
            </div>
          </div>
          <div className="flex flex-col gap-5 mt-10">
            <p className="text-2xl font-semibold">Related Datapoints</p>
            <div className="grid overflow-y-auto grid-flow-col auto-cols-max gap-10 w-full">
              {datapoints.map((data, index) => (
                <div
                  className="flex flex-col justify-between items-start p-4 mb-5 w-80 rounded-md border"
                  key={index}
                >
                  <p className="text-wrap">{data.text}</p>
                  <div className="flex flex-col gap-1">
                    <p className="mt-2 text-sm text-muted-foreground">
                      {data.company}
                    </p>
                    <Badge variant={"outline"}>{data.strategy}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-5 mt-10">
            <p className="text-2xl font-semibold">Companies</p>
            <div className="grid grid-cols-5 gap-5 w-full">
              {companies.map((company) => (
                <CompanyDialog key={company.name} company={company} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
