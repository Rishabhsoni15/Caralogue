"use client";
import { Bokor, Inter } from "next/font/google";
import { IoMdSearch } from "react-icons/io";
import { FaPlus, FaMinus } from "react-icons/fa6"; // ← both icons
import { useState } from "react";

export default function Home() {
  const [disableGutters, setDisableGutters] = useState(false);
  const [openItems, setOpenItems] = useState<string[]>([]);

  const accordionData = [
    {
      id: "item-1",
      title: "The Future of Renewable Energy: Innovations and Challenges Ahead",
      content:
        "Renewable energy technologies are rapidly evolving, with solar and wind power becoming increasingly cost‑effective. However, challenges remain in energy storage, grid integration, and policy frameworks. This section explores the latest innovations in renewable energy and the obstacles that must be overcome to achieve a sustainable energy future.",
      disabled: false,
    },
    {
      id: "item-2",
      title:
        "Exploring the Impact of Artificial Intelligence on Modern Healthcare",
      content:
        "Artificial Intelligence is revolutionizing healthcare through improved diagnostics, personalized treatment plans, and drug discovery. From machine‑learning algorithms that can detect diseases earlier than human doctors to AI‑powered surgical robots, the healthcare industry is being transformed. This section examines both the benefits and ethical considerations of AI in medicine.",
      disabled: false,
    },
    {
      id: "item-3",
      title: "Climate Change and Its Effects on Global Food Security",
      content:
        "Climate change poses significant threats to global food production through changing weather patterns, extreme weather events, and shifting agricultural zones. This section discusses how rising temperatures and changing precipitation patterns affect crop yields and food‑distribution systems worldwide.",
      disabled: true,
    },
    {
      id: "item-4",
      title: "The Rise of Remote Work: Benefits, Challenges, and Future Trends",
      content:
        "The COVID‑19 pandemic accelerated the adoption of remote work, fundamentally changing how we think about the workplace. While remote work offers flexibility and can improve work‑life balance, it also presents challenges in collaboration, company culture, and employee wellbeing. This section explores the long‑term implications of this shift.",
      disabled: false,
    },
  ];

  const toggleItem = (itemId: string) =>
    setOpenItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );

  return (
    <div className=" min-h-screen w-full h-full ">
      <div className="  max-w-[1200px] w-[100%]   md:mx-auto  flex flex-col  ">
        <div className="bg-white max-w-[1200px] rounded-2xl shadow-sm border border-gray-200 p-6">
          {/* ─────────────── Header ─────────────── */}
          <div className="flex relative items-center justify-between mb-8">
            <div className="flex border w-1/2 border-gray-200 rounded-sm p-2 items-center">
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 outline-none text-sm"
              />
              <IoMdSearch className="w-6 h-6 text-gray-500" />
            </div>
          </div>

          {/* ─────────────── Accordion ─────────────── */}
          <div className={disableGutters ? "space-y-0" : "space-y-4"}>
            {accordionData.map((item, idx) => {
              const isOpen = openItems.includes(item.id);

              return (
                <div
                  key={item.id}
                  className={`
                    border border-gray-200 rounded-lg overflow-hidden 
                    ${item.disabled ? "opacity-50 cursor-not-allowed" : ""}
                    ${
                      disableGutters
                        ? "rounded-none border-t-0 first:border-t first:rounded-t-lg last:rounded-b-lg"
                        : ""
                    }
                  `}
                >
                  <button
                    onClick={() => !item.disabled && toggleItem(item.id)}
                    disabled={item.disabled}
                    className="w-full px-6 py-4 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:hover:bg-transparent transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <span className="text-sm font-medium text-gray-900 whitespace-nowrap">
                          Accordion {idx + 1}
                          {item.disabled && " (disabled)"}
                        </span>
                        <span className="text-sm text-gray-600">
                          {item.title}
                        </span>
                      </div>

                      {/* Icon container: plus spins & fades; minus fades in */}
                      <span className="relative h-4 w-4 shrink-0">
                        {/* plus */}
                        <FaPlus
                          className={`absolute inset-0 transform transition-all duration-300 ${
                            isOpen
                              ? "rotate-45 opacity-0"
                              : "rotate-0 opacity-100"
                          }`}
                        />
                        {/* minus */}
                        <FaMinus
                          className={`absolute inset-0 transform transition-all duration-300 ${
                            isOpen
                              ? "opacity-100 rotate-0"
                              : "opacity-0 rotate-45"
                          }`}
                        />
                      </span>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-4shadow-lg  bg-white">
                      <div className="text-sm   text-gray-600 leading-relaxed pt-4">
                        {item.content}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
