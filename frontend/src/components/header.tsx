import {useState} from 'react';
import {NAV_LINKS} from "@/constants";
import {NavLink, Link, useLocation} from "react-router";
import {HamburgerIcon, XCircle} from "lucide-react";
import {Drawer, DrawerClose, DrawerContent, DrawerTrigger} from "@/components/ui";
import {Logo} from "@/components/logo.tsx";
import {ThemeSwitcher} from "@/components/themeSwitcher.tsx";
import {DownloadCv} from "@/components/downloadCv.tsx";
import {DialogTitle} from "@radix-ui/react-dialog";

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation()

    console.log(location)
    return (
        <header className="shadow-sm w-full p-4 md:px-8">
            <nav className='flex items-center justify-between mx-auto w-full max-w-7xl '>
               <Logo />
                <div className='hidden md:flex'>
                    <div hidden={location.pathname === '/login'} className='hidden md:flex'>
                        <ul className="flex list-none items-center gap-6">
                                {NAV_LINKS.map((link) => (
                                    <Link
                                        key={link.href}
                                        to={link.href}
                                    >{link.label}</Link>
                                ))}
                        </ul>
                    </div>
                    <div className="h-10 w-0.5 bg-gray-100 mx-4"></div>
                    <div className="flex items-center gap-4">
                        <ThemeSwitcher />
                        <DownloadCv />
                    </div>
                </div>
                <div className={'flex md:hidden'}>
                    <Drawer direction={'left'} open={isOpen} onOpenChange={setIsOpen} >
                        <DrawerTrigger asChild className={'flex md:hidden'}>
                            <HamburgerIcon/>
                        </DrawerTrigger>
                        <DrawerContent aria-describedby={'mobile header'}
                        >
                            <DialogTitle hidden>
                                Menu
                            </DialogTitle>
                            <div className="flex items-center justify-between border-b border-gray-100 p-4">
                                <Logo />
                                <DrawerClose>
                                    <XCircle />
                                </DrawerClose>
                            </div>
                            <div className="border-b border-gray-100 p-4">
                                <ul className="flex list-none flex-col gap-4">
                                    {NAV_LINKS.map((link, index) => (
                                        <li key={index}>
                                            <NavLink
                                                to={link.href}
                                                onClick={() => {
                                                    const timeoutId = setTimeout(() => {
                                                        setIsOpen(false);
                                                        clearTimeout(timeoutId);
                                                    }, 500);
                                                }}
                                            >
                                                {link.label}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex flex-col gap-4 p-4">
                                <div className="flex items-center justify-between">
                                    <p>Switch Theme</p>
                                    <ThemeSwitcher />
                                </div>
                                <DownloadCv />
                            </div>
                        </DrawerContent>
                    </Drawer>
                </div>
            </nav>
        </header>
    )
}