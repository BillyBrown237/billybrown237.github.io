import {Button} from "@/components/ui";

export const DownloadCv = () => {
    return (
        <Button onClick={() => window?.open('/files/CV.pdf', '_blank')} >Download CV</Button>
    )
}