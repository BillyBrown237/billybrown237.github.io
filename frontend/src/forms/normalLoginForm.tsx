import {useForm} from "react-hook-form";
import {normalLoginSchema, type NormalLoginType} from "@/schema/auth.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input
} from "@/components/ui"

export const NormalLoginForm = () => {
    const form = useForm<NormalLoginType>({
        resolver: zodResolver(normalLoginSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    })

    function onSubmit(values: NormalLoginType) {
        console.log(values)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle></CardTitle>
                <CardDescription>
                   Enter your username and password to login.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name={"username"}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input type={'text'} placeholder={'Enter your username'} {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your unique username to login.
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={"password"}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type={'password'} placeholder={'Enter your password'} {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your password to login.
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Login</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )

}