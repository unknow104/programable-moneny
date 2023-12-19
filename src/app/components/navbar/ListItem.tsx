"use client";

import { GoTable } from "react-icons/go";
import { IoWalletOutline } from "react-icons/io5";
import { FiPieChart } from "react-icons/fi";
import { LiaFileContractSolid } from "react-icons/lia";
import { MdOutlineSavings } from "react-icons/md";
import { AiOutlineSetting, AiOutlineLogin } from "react-icons/ai";
import { RiLogoutCircleLine } from "react-icons/ri";
import NavbarItem from "./NavbarItem";
import React, { useState, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useLoginModal from "@/app/hook/userLoginModal";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";
import useRegisterModal from "@/app/hook/userRegisterModal";


export const items = [
    {
        label: "Dashborad",
        icon: GoTable,
        href: "/Dashborad"
    },
    {
        label: "Wallet",
        icon: IoWalletOutline,
        href: "/Wallet"
    },
    {
        label: "Statistics",
        icon: FiPieChart,
        href: "/Statistics"
    },
    {
        label: "Transaction",
        icon: LiaFileContractSolid,
        href: "/Transaction"
    },
    {
        label: "Saving",
        icon: MdOutlineSavings,
        href: "/Saving"
    }
]
interface UserMenuProps {
    currentUser?: SafeUser | null
}

const ListItem: React.FC<UserMenuProps> = ({ currentUser }) => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [activeItem, setActiveItem] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const isMainPage = pathname === '/';
    // Trong một hàm hoặc sự kiện xử lý, bạn có thể thực hiện chuyển hướng như sau:
    const handleRedirectToWalletPage = (href: any, label: any) => {
        setActiveItem(label); // Đặt mục hiện tại là active
    }
    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);
    if (!isMainPage) {
        return null;
    }
    return (
        <div>
            <div className="w-[230px] h-[388px] px-3 py-3.5 bg-purple-200 flex-col justify-center items-center gap-2.5 inline-flex">
                {items.map((item) => (
                    <NavbarItem
                        onClick={() => handleRedirectToWalletPage(item.href, item.label)}
                        isActive={activeItem === item.label}
                        key={item.label}
                        title={item.label}
                        icon={item.icon}
                    />
                ))}
            </div>
            <div className="w-[230px] h-[150px] px-1 pb-[81px] bg-purple-200 flex-col justify-start items-center gap-2.5 inline-flex">
                {currentUser ? (
                    <>
                        <NavbarItem
                            onClick={() => { }}
                            isActive={activeItem === "Setting"}
                            key={"Setting"}
                            title="Setting"
                            icon={AiOutlineSetting}
                        />
                        <NavbarItem
                            onClick={() => signOut()}
                            isActive={activeItem === "Logout"}
                            key={"Logout"}
                            title="Logout"
                            icon={RiLogoutCircleLine}
                        />
                    </>
                ) : (
                    <>
                        <NavbarItem
                            onClick={loginModal.onOpen}
                            isActive={activeItem === "Login"}
                            key={"Login"}
                            title="Login"
                            icon={AiOutlineLogin}
                        />
                    </>
                )}
            </div>
        </div>

    )
}
export default ListItem;