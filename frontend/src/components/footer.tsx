import {Logo} from "@/components/logo.tsx";
import {Copyright} from "lucide-react";
import {Link} from "react-router";
import {EXTERNAL_LINKS} from "@/constants";

export const Footer = () => {
    return (
        <footer className="w-full bg-gray-50 p-2">
            <div className="w-full flex flex-wrap md:flex-row items-center justify-center gap-1">
                <Logo/>
                <div className={'flex gap-2'}>
                    <Copyright/> {new Date().getFullYear()} |&nbsp;
                by
                    <Link className={'text-black font-medium hover:underline'} target={'_blank'} to={EXTERNAL_LINKS.GITHUB}>Kano Dekou Billy Brown</Link>
                </div>
            </div>
        </footer>)
}