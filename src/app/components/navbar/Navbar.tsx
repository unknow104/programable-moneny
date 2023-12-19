"use client";

import { SafeUser } from "@/app/types";
import Avatar from "./Avatar";
import ListItem from "./ListItem";
import { PrismaClient } from '@prisma/client';

interface NavbarProps {
    currentUser?: SafeUser | null
}


const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
    return (
        <div className="w-[230px] h-full relative bg-purple-200 rounded-tl-[20px] ">
            <Avatar name={currentUser?.name} src={currentUser?.image} />
            <ListItem currentUser={currentUser} />
        </div>
    )
}
export default Navbar;