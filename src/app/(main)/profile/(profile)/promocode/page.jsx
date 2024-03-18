"use client";
import Header from "@/components/Header";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaSearch, FaTimes } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const page = () => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [promocode, setPromocode] = useState([]);

  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_NGROK_LINK}/promo`
      );
      console.log(response);
      setPromocode(response.data.data);
      console.log(promocode);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <main className="min-h-[700px] ">
        <section
          className={`px-[15px] pt-[8px] pb-[12px] shadow-md relative ${
            isSearchVisible ? "search-visible" : ""
          }`}
        >
          <section className="justify-between flex items-center">
            <Link href="/">
              <IoIosArrowBack size={20} />
            </Link>

            <h1 className="text-[18px] leading-[22px] font-semibold">
              Promo Code
            </h1>

            {!isSearchVisible && (
              <button onClick={toggleSearch}>
                <FaSearch size={18} />
              </button>
            )}

            {isSearchVisible && (
              <button onClick={toggleSearch}>
                <FaTimes size={18} />
              </button>
            )}
          </section>

          {isSearchVisible && (
            <div
              className={`absolute z-50 w-[92%] top-16 rounded-[4px] border-[1px] border-[rgb(20,23,24)] ease-in-out transition-all duration-500 ${
                isSearchVisible ? "translate-x-[0]" : "translate-x-[100%]"
              }`}
            >
              <Input type="text" placeholder="Search" />
            </div>
          )}
        </section>
        <section className="mt-[30px] px-[15px]">
          <h1 className="text-[32px] font-bold pb-[18px]">Your Promocode</h1>
          <div className="space-y-[20px]">
            {promocode.map((item) => (
              <div
                className="bg-[rgb(255,255,255)] flex items-center justify-between space-x-3 rounded-[8px] h-[120px] p-0"
                key={item._id}
              >
                <div className="h-[120px] w-[200px]">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_NGROK_LINK}/${item.image}`}
                    alt=""
                    width={200}
                    height={120}
                    className="h-[120px] w-[200px] object-contain "
                  />
                </div>
                <div className="w-full flex justify-between items-center  pt-[20px] pb-[20px]">
                  <div className="w-full">
                    <h1 className="text-[14px] leading-[20px] font-semibold">
                      {item.code_name}
                    </h1>
                    <h1 className="text-[14px] leading-[20px] text-muted-foreground">
                      {item.promo_code_name}
                    </h1>
                  </div>
                  <div className="w-full py-[10px] ml-auto">
                    <h1 className="text-[14px] leading-[20px] text-muted-foreground">
                      6 days remaining
                    </h1>
                    <Button className="w-fit ml-8  mt-4 bg-white text-black hover:text-white border-[2px] border-[rgb(20,23,24)] hover:bg-[rgb(219,48,34)]  rounded-[24px] text-[14px] leading-[20px] hover:border-[rgb(219,48,34)] ">
                      <Link href={"/bag"}>Apply</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Header />
    </>
  );
};

export default page;
