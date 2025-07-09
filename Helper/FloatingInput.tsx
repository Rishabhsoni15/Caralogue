"use client";

import React from "react";

type Props = {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FloatingInput({ id, label, value, onChange }: Props) {
  return (
    <div className="relative w-full">
      {/* Label embedded in border */}
      <label
        htmlFor={id}
        className="
          absolute -top-3 left-3 z-[1] 
          bg-white px-0.5 text-[12px] font-semibold text-[#919EAB]
        "
      >
        {label}
      </label>

      {/* Input */}
      <input
        id="abcd"
        type="text"
        value={value}
        onChange={onChange}
        className="
          w-full rounded-lg border text-[15px] border-gray-200
          pl-[14px]  pr-[14px] pt-[16px] pb-[16px] text-[#919EAB]
          placeholder-gray-400 outline-1 outline-gray-50
        "
      />
    </div>
  );
}
