"use client";

import Link from "next/link";

interface LinkButtonProps {
    location: string;
    content: string;
}

function LinkButton({location, content}: LinkButtonProps) {
    return (
        <Link href={location} className="flex justify-center items-center font-bold border-brown-70  border-[3px] rounded-lg text-brown-10 bg-center bg-repeat bg-[url('/assets/img/bg_wood_dark.svg')] px-[13px] py-[7.5px] bg-[length:54px] text-[20px] h-[44px]">{content}</Link>
    )
}

function AuthButton({location, content}: LinkButtonProps) {
    return (
        <Link href={location} className="flex justify-center items-center font-bold border-brown-50  border-[3px] rounded-lg text-brown-40 bg-center bg-repeat bg-[url('/assets/img/bg_wood_light.svg')] px-[13px] py-[7.5px] bg-[length:54px] text-[20px] h-[44px]">{content}</Link>
    )
}

function HeaderUser() {
    return (
        <img src="/assets/img/bg_default.png" alt="profile_img" width={44} height={44} className="rounded-[50%] border-brown-50 border-[3px]" />
    )
}

export default function HeaderLink() {
    // 후에 token 유무로 변경하기
    const userState: string = "login";

    const handleLogout = (): void => {
        if(userState === "login") {
            console.log("logout!");
        }
    }

    return (
        <div className="flex gap-[10px]">
            <LinkButton content="정원" location="/garden/1" />
            <LinkButton content="커뮤니티" location="/board" />
            <LinkButton content="식물 카드" location="/leafs/1" />
            {userState === "login" ? 
            // <div onClick={handleLogout}><AuthButton content="로그아웃" location="/" /></div> :
            <HeaderUser /> :
            <AuthButton content="로그인" location="/signin" />}
        </div>
    )
}