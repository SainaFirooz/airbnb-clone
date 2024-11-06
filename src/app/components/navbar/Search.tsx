"use client";

import useSearchModal from "@/app/hooks/useSearchModal";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  const searchModal = useSearchModal();

  return (
    <div
      onClick={searchModal.onOpen}
      className="
       border-[1px]
       w-full
       md:w-auto
       py-2
       rounded-full
       shadow-sm
       hover:shadow-md
       transition
       cursor-pointer
       flex
       items-center
       justify-between
      "
    >
      <div
        className="
          text-sm 
          font-semibold 
          px-6
          text-center
        "
      >
        Anywhere
      </div>
      <div
        className="
          text-sm 
          font-semibold 
          px-6 
          border-l-[1px] 
          border-gray-300
          text-center
        "
      >
        Any Week
      </div>
      <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
        <div className="hidden sm:block">Add Guests</div>
        <div className="p-2 bg-rose-500 rounded-full text-white">
          <BiSearch size={18} />
        </div>
      </div>
    </div>
  );
};

export default Search;
