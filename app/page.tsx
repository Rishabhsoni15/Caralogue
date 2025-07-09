import Forms from "@/components/Forms";
import React from "react";
import CatalogueAccordion from "@/components/CatalogueAccordion";
function page() {
  return (
    <div className="w-full ] bg-[#fbfbfc]">
      <Forms />
      {/* <div className="max-w-[1200px] w-[100%]   mx-auto px-8 py-6 ">
        <h2 className="text-[14px] font-semibold ">Pattern And Designs</h2>
      </div> */}
      <CatalogueAccordion catalogueId="686cda62ddc80c3ea14db4e3" />
      {/* <Accordion /> */}
    </div>
  );
}
export default page;
