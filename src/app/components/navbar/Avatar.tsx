"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from 'axios';

interface AvataProps {
    src: string | null | undefined;
    name: string | null | undefined;
}


const Avatar: React.FC<AvataProps> = ({ src, name }) => {

    return (
        <div className="w-full h-[180px] px-[42px] py-8 bg-purple-200 flex-col justify-start items-center gap-[31px] inline-flex">
            <Image src={src || "/images/placeholder.png"} alt="Avatar" height="256" width="256" className="w-20 h-20 rounded-full border-2 border-purple-300 shadow-xl" />
            <div className="rounded-md shadow-lg bg-purple-100 text-center text-[20px] font-semibold text-gray-600">Hi, {name || "Someone"}</div>
        </div>
    )
}
export default Avatar;