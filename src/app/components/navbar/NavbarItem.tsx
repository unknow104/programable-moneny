"use client";

import { IconType } from "react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import qs from "query-string";

interface NavbarItemProps {
    title: string;
    icon: IconType;
    isActive: boolean; // Nhận trạng thái isActive thông qua props
    onClick: () => void; // Nhận hàm onClick thông qua props
}

const NavbarItem: React.FC<NavbarItemProps> = ({
    icon: Icon,
    title,
    isActive,
    onClick,
}) => {
    const router = useRouter();
    const params = useSearchParams();
    const handleClick = useCallback(() => {
        let currentQuery = {};
        if (params) {
            currentQuery = qs.parse(params.toString());
        }
        const updatedQuery: any = {
            ...currentQuery,
            index: title,
        };
        if (params?.get("") === title) {
            delete updatedQuery.index;
        }
        const url = qs.stringifyUrl(
            {
                url: "/",
                query: updatedQuery,
            },
            { skipNull: true }
        );
        router.push(url);
    }, [title, params, router]);
    const combinedClick = () => {
        onClick(); // Gọi hàm onClick
        handleClick(); // Gọi hàm handleClick
    };
    return (
        <button
            onClick={combinedClick} // Sử dụng hàm onClick để thay đổi trạng thái
            className={`w-[210px]  px-[55px] py-5 rounded-[15px] justify-center items-center gap-2.5 inline-flex hover:bg-pink-200
            ${isActive ? "bg-purple-500 text-white" : "bg-purple-200 text-black"}
        `}
        >
            <Icon size={24} />
            <div className="w-20 h-[20px] text-[12px] font-semibold">{title}</div>
        </button>
    );
};
export default NavbarItem;
