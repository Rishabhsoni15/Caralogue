"use client";
import FloatingInput from "@/Helper/FloatingInput";
import React from "react";

import { useState } from "react";
const Forms = () => {
  const [catalogue, setCatalogue] = useState("Gaia");
  return (
    <>
      <div className="flex flex-col min-h-[100%] w-full ">
        <div className="max-w-[1232px] mb-10 w-[100%] px-4  md:mx-auto  flex flex-col  ">
          <h4 className="text-[24px] font-bold pb-[28px]">Gaia</h4>
          <div className=" bg-white border-1 border-gray-100 shadow-md rounded-2xl w-full h-full">
            <main className="grid grid-cols-1 gap-6 md:grid-cols-3 p-6">
              <div className="w-full space-y-8 max-w-sm">
                <FloatingInput
                  id="catalogue-name"
                  label="Catalogue Name"
                  value={catalogue}
                  onChange={(e) => setCatalogue(e.target.value)}
                />
              </div>
              <div className="w-full max-w-sm">
                <FloatingInput
                  id="catalogue-name"
                  label="Catalogue Code"
                  value={catalogue}
                  onChange={(e) => setCatalogue(e.target.value)}
                />
              </div>
              <div className="w-full max-w-sm">
                <FloatingInput
                  id="catalogue-name"
                  label="Vendor"
                  value={catalogue}
                  onChange={(e) => setCatalogue(e.target.value)}
                />
              </div>
              <div className="w-full max-w-sm">
                <FloatingInput
                  id="catalogue-name"
                  label="Brand"
                  value={catalogue}
                  onChange={(e) => setCatalogue(e.target.value)}
                />
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forms;

{
  /* <div className="bg-white h-full w-full">
  <div className="text-black text-[24px] font-bold ">Gaia</div>
  <div className="flex relative items-center justify-between mb-8">
    <div className="flex  w-1/2 border-gray-200 rounded-sm p-2 items-center">
      <main className="flex min-h-screen  p-4">
        <div className="w-full max-w-sm">
          <FloatingInput
            id="catalogue-name"
            label="Catalogue Name"
            value={catalogue}
            onChange={(e) => setCatalogue(e.target.value)}
          />
        </div>
      </main>
    </div>
  </div>
</div> */
}
