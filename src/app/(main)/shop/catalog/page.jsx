"use client";
import Link from "next/link";
import { lazy, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import { IoIosArrowBack } from "react-icons/io";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaSearch, FaTimes } from "react-icons/fa";
import axios from "axios";
import Image from "next/image";

const page = () => {
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [product, setProduct] = useState([]);

  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_NGROK_LINK}/product`
        );
        console.log(response);
        setProduct(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <main className="scrollbar min-h-[700px] overflow-y-auto overflow-clip">
        <section
          className={`px-[15px] pt-[8px] pb-[12px] shadow-md relative ${
            isSearchVisible ? "search-visible" : ""
          }`}
        >
          <section className="justify-between flex items-center">
            <Link href="/shop">
              <IoIosArrowBack size={20} />
            </Link>

            <h1 className="font-semibold text-[18px] leading-[22px]">
              Order Details
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
        <section className="mt-[15px] px-[15px]">
          <Tabs
            defaultValue="tshirts"
            className="w-full flex flex-col items-center"
          >
            <TabsList className="w-full flex  items-center  md:justify-between children space-x-[20px] mb-[30px] overflow-x-auto scrollbar">
              <TabsTrigger
                className="data-[state=active]:text-[rgb(255,255,255)] data-[state=active]:bg-[rgb(20,23,24)] data-[state=active]:rounded-[29px] data-[state=active]:px-[12px] text-[14px] leading-[20px]"
                value="tshirts"
              >
                T-shirts
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:text-[rgb(255,255,255)] data-[state=active]:bg-[rgb(20,23,24)] data-[state=active]:rounded-[29px] data-[state=active]:px-[12px] text-[14px] leading-[20px]"
                value="croptop"
              >
                Crop tops
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:text-[rgb(255,255,255)] data-[state=active]:bg-[rgb(20,23,24)] data-[state=active]:rounded-[29px] data-[state=active]:px-[12px] text-[14px] leading-[20px]"
                value="sleeveless"
              >
                Sleeveless
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:text-[rgb(255,255,255)] data-[state=active]:bg-[rgb(20,23,24)] data-[state=active]:rounded-[29px] data-[state=active]:px-[12px] text-[14px] leading-[20px]"
                value="shirts"
              >
                Shirts
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tshirts" className="w-full">
              <div className="w-full grid grid-cols-2 gap-[24px]">
                {product.map((product) => {
                  return (
                    <div className="flex flex-col justify-b${product._id}_${product.name}etween items-center w-full">
                      <Link href={`/shop/catalog/`}>
                        <div className="w-full relative">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_NGROK_LINK}${product.image}`}
                            alt={product.name}
                            width={164}
                            height={184}
                            className="w-full h-full object-cover rounded-[4px]"
                          />
                          {product.is_discount && (
                            <div className="z-1 absolute bg-[rgb(219,48,34)] text-white text-[11px] font-semibold p-[5px] rounded-xl top-3 left-3">
                              <h1>{product.discount_percent}</h1>
                            </div>
                          )}
                        </div>
                        <div className="w-full mt-[5px]">
                          <h1 className="text-[13px] font-normal text-[rgb(155,155,155)]">
                            {product.brand_name}
                          </h1>
                          <h1 className="text-[16px] font-semibold">
                            {product.name}
                          </h1>
                          <div className="flex space-x-2">
                            <h1>{product.sell_price}$</h1>
                            {product.is_discount && (
                              <h1 className="text-[rgb(219,48,34)] line-through">
                                {product.price}$
                              </h1>
                            )}
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
            <TabsContent value="croptop">
              <div className="w-full grid grid-cols-2 gap-[24px]">
                {product.map((product) => {
                  return (
                    <div className="flex flex-col justify-between items-center w-full">
                      <div className="w-full relative">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_NGROK_LINK}${product.image}`}
                          alt={product.name}
                          width={164}
                          height={184}
                          className="w-full h-full object-cover rounded-[4px]"
                        />
                        {product.is_discount && (
                          <div className="z-1 absolute bg-[rgb(219,48,34)] text-white text-[11px] font-semibold p-[5px] rounded-xl top-3 left-3">
                            <h1>{product.discount_percent}</h1>
                          </div>
                        )}
                      </div>
                      <div className="w-full mt-[5px]">
                        <h1 className="text-[13px] font-normal text-[rgb(155,155,155)]">
                          {product.brand_name}
                        </h1>
                        <h1 className="text-[16px] font-semibold">
                          {product.name}
                        </h1>
                        <div className="flex space-x-2">
                          <h1>{product.sell_price}$</h1>
                          {product.is_discount && (
                            <h1 className="text-[rgb(219,48,34)] line-through">
                              {product.price}$
                            </h1>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
            <TabsContent value="sleeveless">
              <div className="w-full grid grid-cols-2 gap-[24px]">
                {product.map((product) => {
                  return (
                    <div className="flex flex-col justify-between items-center w-full">
                      <div className="w-full relative">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_NGROK_LINK}${product.image}`}
                          alt={product.name}
                          width={164}
                          height={184}
                          className="w-full h-full object-cover rounded-[4px]"
                        />
                        {product.is_discount && (
                          <div className="z-1 absolute bg-[rgb(219,48,34)] text-white text-[11px] font-semibold p-[5px] rounded-xl top-3 left-3">
                            <h1>{product.discount_percent}</h1>
                          </div>
                        )}
                      </div>
                      <div className="w-full mt-[5px]">
                        <h1 className="text-[13px] font-normal text-[rgb(155,155,155)]">
                          {product.brand_name}
                        </h1>
                        <h1 className="text-[16px] font-semibold">
                          {product.name}
                        </h1>
                        <div className="flex space-x-2">
                          <h1>{product.sell_price}$</h1>
                          {product.is_discount && (
                            <h1 className="text-[rgb(219,48,34)] line-through">
                              {product.price}$
                            </h1>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
            <TabsContent value="shirts">
              <div className="w-full grid grid-cols-2 gap-[24px]">
                {product.map((product) => {
                  return (
                    <div className="flex flex-col justify-between items-center w-full">
                      <div className="w-full relative">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_NGROK_LINK}${product.image}`}
                          alt={product.name}
                          width={164}
                          height={184}
                          className="w-full h-full object-cover rounded-[4px]"
                        />
                        {product.is_discount && (
                          <div className="z-1 absolute bg-[rgb(219,48,34)] text-white text-[11px] font-semibold p-[5px] rounded-xl top-3 left-3">
                            <h1>{product.discount_percent}</h1>
                          </div>
                        )}
                      </div>
                      <div className="w-full mt-[5px]">
                        <h1 className="text-[13px] font-normal text-[rgb(155,155,155)]">
                          {product.brand_name}
                        </h1>
                        <h1 className="text-[16px] font-semibold">
                          {product.name}
                        </h1>
                        <div className="flex space-x-2">
                          <h1>{product.sell_price}$</h1>
                          {product.is_discount && (
                            <h1 className="text-[rgb(219,48,34)] line-through">
                              {product.price}$
                            </h1>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <Header />
    </>
  );
};

export default page;
