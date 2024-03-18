"use client";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";
import { useRouter } from "next/navigation";
import axios from "axios";


const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    // data.email = data.email.toLowerCase();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_NGROK_LINK}/login-user`,
        data
      );
      console.log(response);
      if (response) {
        router.push("/");
      }

      console.log("Login successful");
    } catch (error) {
      console.error("Error Login:", error);
    }
  };

  return (
    <main className="bg-[rgb(243,245,247)] px-[15px] pt-[10px] h-full">
      <section>
        <Link href="/">
          <IoIosArrowBack size={20} />
        </Link>
        <h1 className="mt-[30px] text-[34px] leading-[34px] font-bold">
          Login
        </h1>
      </section>
      <section>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-[20px] mt-[73px]"
        >
          <div className="bg-[rgb(255,255,255)] px-[20px] py-[15px] rounded-[4px] h-[64px] ">
            <h1 className="text-[11px] leading-[11px] text-[rgb(155,155,155)] mb-1">
              Email
            </h1>
            <input
              type="text"
              placeholder="Email"
              className="border-none focus:outline-none placeholder:text-[14px] placeholder:leading-[14px] w-full"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />

            {errors.email && (
              <h1 className="text-[rgb(240,31,14)] text-[11px] leading-[11px] mt-4">
                Please enter a valid email address
              </h1>
            )}
          </div>

          <div className="bg-[rgb(255,255,255)] px-[20px] py-[15px] rounded-[4px] h-[64px]">
            <h1 className="text-[11px] leading-[11px] text-[rgb(155,155,155)] mb-1">
              Password
            </h1>
            <input
              placeholder="Password"
              className="border-none focus:outline-none placeholder:text-[14px] placeholder:leading-[14px] w-full"
              type="password"
              {...register("password", { required: true, minLength: 6 })}
            />

            {errors.password && (
              <h1 className="text-[rgb(240,31,14)] text-[11px] leading-[11px] mt-4">
                Password must be at least 6 characters long
              </h1>
            )}
          </div>

          <Link
            href="/forgot-password"
            className="pt-[16px] pb-[28px] text-[14px] leading-[14px] flex justify-end"
          >
            <h1>Forgot your password?</h1>
            <FaLongArrowAltRight
              size={18}
              className="-mt-[2px] ml-1 text-[rgb(219,48,34)] "
            />
          </Link>

          <Button className="bg-[rgb(219,48,34)] w-full" type="submit">
            Sign Up
          </Button>
        </form>
      </section>
      <section className="mt-[150px]">
        <h1 className="text-[14px] leading-[20px] text-center">
          Or sign up with social account
        </h1>
        <div className="mt-[12px] flex space-x-3 items-center justify-center">
          <div className="py-[20px] px-[35px] bg-[rgb(255,255,255)] w-fit rounded-[24px]">
            <FcGoogle size={24} />
          </div>
          <div className="py-[20px] px-[35px] bg-[rgb(255,255,255)] w-fit rounded-[24px]">
            <ImFacebook2 size={24} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
