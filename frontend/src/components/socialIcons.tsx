import {SOCIAL_LINKS} from "@/constants";
import {Link} from "react-router";
import {Button} from "@/components/ui";

export const SocialIcons = () => {
    return (
        <div className="flex gap-1">
            {SOCIAL_LINKS.map(link => (
                <Link
                    key={link.label}
                    to={link.href}
                    target={'_blank'}>
                    <Button size={'icon'} variant={'icon'}>
                        {link.icon}
                    </Button>
                </Link>
            ))}
        </div>
    )
}