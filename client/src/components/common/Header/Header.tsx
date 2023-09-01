import Logo from "../Logo"
import HeaderLink from "./HeaderLink"

export default function Header() {
  
    return (
        <header className="
        flex
        justify-between
        items-center
        bg-[url('/assets/img/bg_wood_yellow.svg')] 
        bg-[length:64px] 
        h-[64px] 
        border-b-[8px] 
        border-[#EC9254] 
        shadow-outer/down 
        px-[15px]
        ">
         <Logo size="small"/>
         <HeaderLink />
        </header>
    )
}