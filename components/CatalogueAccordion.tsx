/* components/CatalogueAccordion.tsx */
"use client";

import React, { useEffect, useState } from "react";
import { FaPlus, FaMinus, FaSearch } from "react-icons/fa";
import FloatingInput from "@/Helper/FloatingInput";

/* ─────────────────────────── Types ─────────────────────────── */
export interface CatalogueResponse {
  message: string;
  data: Catalogue;
}

export interface Catalogue {
  _id: string;
  createdBy: string;
  catalogueName: string;
  catalogueCode: string;
  brandId: string;
  vendorId: string;
  unitTypeIds: string[];
  standardUnitTypeId: string;
  moq: string;
  priceType: "SINGLE" | "MULTIPLE";
  priceCode: string;
  patternAndDesigns: PatternAndDesign[];
}

export interface PatternAndDesign {
  patternDesignName: string;
  categoryId: string;
  subCategoryId: string;
  superSubCategoryId: string;
  priceCode: string;
  standardUnitValue: string;
  prices: Price[];
  _id: string;
}

export interface Price {
  unitType: string;
  unitTypeId: string;
  basePrice: number;
  gst: number;
  hsnCode: string;
  rrp: number;
  _id: string;
}

interface ApiResponse {
  data: Catalogue;
}

interface Props {
  catalogueId: string;
}

/* ─────────────────────── Component ─────────────────────────── */
export default function CatalogueAccordion({ catalogueId }: Props) {
  const [catalogue, setCatalogue] = useState<Catalogue | null>(null);
  const [loading, setLoading] = useState(true);
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  /* one-time fetch */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `https://srujan-api.technolitics.com/api/v1/srujan/project-panel/catalogue/get-catalogue-by-id/${catalogueId}`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json: ApiResponse = await res.json();
        console.log("Catalogue fetched:", json.data);
        setCatalogue(json.data);
      } catch (err) {
        console.error("Catalogue fetch failed:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [catalogueId]);

  /* toggle accordion by pattern _id */
  const toggleAccordion = (patternId: string) => {
    setOpenAccordions((prev) =>
      prev.includes(patternId)
        ? prev.filter((id) => id !== patternId)
        : [...prev, patternId]
    );
  };

  /* filter patterns by search query */
  const filteredPatterns =
    catalogue?.patternAndDesigns.filter((pattern) =>
      pattern.patternDesignName
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    ) || [];

  /* helper for floating-label field */
  const Field = ({
    label,
    value,
  }: {
    label: string;
    value: string | number | undefined;
  }) => (
    <label className="relative block text-gray-700">
      <span className="pointer-events-none absolute left-3 -top-2.5 bg-white px-1 text-xs text-gray-500">
        {label}
      </span>
      <input
        readOnly
        value={value ?? ""}
        className="
          w-full rounded-lg border text-[15px] border-gray-200
          pl-[14px] pr-[14px] pt-[16px] pb-[16px] text-[#919EAB]
          placeholder-gray-400 outline-1 outline-gray-50
        "
      />
    </label>
  );

  /* ───────────────────────────── Render ────────────────────── */
  if (loading) return <p className="text-sm text-gray-600">Loading…</p>;
  if (!catalogue)
    return <p className="text-sm text-gray-600">No catalogue found.</p>;

  return (
    <div className="max-w-[1200px] bg-white px-4 mx-4 p-3 lg:mx-auto border  rounded-2xl border-gray-200 shadow-md flex flex-col">
      <div className="p-3">
        {/* Search Input */}
        <div className="my-5">
          <FloatingInput
            id="search-pattern"
            label="Search Pattern by Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Accordions for each pattern */}
        {filteredPatterns.length === 0 ? (
          <p className="text-sm text-gray-900">
            No patterns match your search.
          </p>
        ) : (
          filteredPatterns.map((pattern) => (
            <div key={pattern._id} className=" mb-4  border-gray-200">
              <button
                onClick={() => toggleAccordion(pattern._id)}
                className="flex w-full items-center border rounded-xl border-gray-200 justify-between gap-4 px-6 py-4 text-left"
              >
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-gray-500">
                    {pattern.patternDesignName ?? "Unnamed Pattern"}
                  </span>
                </div>
                {openAccordions.includes(pattern._id) ? (
                  <FaMinus className="shrink-0 text-gray-500 transition-transform duration-300" />
                ) : (
                  <FaPlus className="shrink-0 text-gray-500 transition-transform duration-300" />
                )}
              </button>

              {/* Accordion panel */}
              {openAccordions.includes(pattern._id) && (
                <div className="space-y-6 py-6 text-sm">
                  {/* Detail grid */}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Field label="Category" value={pattern.categoryId} />
                    <Field label="Sub Category" value={pattern.subCategoryId} />
                    <Field
                      label="Super Sub Category"
                      value={pattern.superSubCategoryId}
                    />
                    <Field label="Price Code" value={pattern.priceCode} />
                    <Field
                      label="Standard Unit Value"
                      value={pattern.standardUnitValue}
                    />
                  </div>

                  {/* Price table */}
                  {pattern.prices && pattern.prices.length > 0 ? (
                    <div className="overflow-hidden border rounded-xl border-gray-300">
                      <table className="w-full divide-y   divide-gray-200 ">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Unit Type
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Base Price
                            </th>
                            <th className="px-4 py-3   text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              GST
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              HSN Code
                            </th>
                            <th className="px-4 py-3   text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              RRP
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white text-[12px]  divide-y divide-gray-100">
                          {pattern.prices.map((price, idx) => (
                            <tr key={idx}>
                              <td className="px-4 py-2">
                                {price.unitType ?? "—"}
                              </td>
                              <td className="px-4 py-2">
                                {price.basePrice ?? "—"} Rs
                              </td>
                              <td className="px-4 py-2">
                                {price.gst ?? "—"} %
                              </td>
                              <td className="px-4 py-2">
                                {price.hsnCode ?? "—"}
                              </td>
                              <td className="px-4 py-2">
                                {price.rrp ?? "—"} Rs
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">
                      No prices available.
                    </p>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
