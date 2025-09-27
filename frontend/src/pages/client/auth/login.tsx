import {NormalLoginForm} from "@/forms/normalLoginForm.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui";
import {TempTokenLoginForm} from "@/forms/tempTokenLoginForm.tsx";

export const Login = () => {


    return (
        <section className="flex w-full max-w-sm flex-col gap-6">
            <Tabs defaultValue="username" className="w-[400px]">
                <TabsList>
                    <TabsTrigger value="username">Username</TabsTrigger>
                    <TabsTrigger value="tempToken">Temporary Token</TabsTrigger>
                </TabsList>
                <TabsContent value="username"><NormalLoginForm/></TabsContent>
                <TabsContent value="tempToken"><TempTokenLoginForm/></TabsContent>
            </Tabs>
        </section>
    )
}