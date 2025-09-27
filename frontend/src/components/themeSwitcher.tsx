import {useState} from "react";
import {Button} from "@/components/ui";
import {MoonStar, Sun} from "lucide-react";

export const ThemeSwitcher = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>("light")

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };


    return (
        <Button size={'icon'} variant={'icon'} onClick={toggleTheme}>
            {theme === 'light' ? <Sun /> : <MoonStar />}
        </Button>
    )
}