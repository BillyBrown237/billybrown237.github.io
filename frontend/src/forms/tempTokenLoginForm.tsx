import {useForm} from "react-hook-form";
import {tempTokenLoginSchema, type TempTokenLoginType} from "@/schema/auth.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Button ,Form,
    FormControl,
    FormDescription,
    Input,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui"

export const TempTokenLoginForm = () => {
    const form = useForm<TempTokenLoginType>({
        resolver: zodResolver(tempTokenLoginSchema),
        defaultValues: {
            tempToken: "",
        }
    })

    function onSubmit(values: TempTokenLoginType) {
        console.log(values)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle></CardTitle>
                <CardDescription>
                   Enter the temporary token to login to gain access
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name={"tempToken"}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Temporary Token</FormLabel>
                                    <FormControl>
                                        <Input type={'text'}
                                               placeholder={'Enter the temporary token issued'} {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your the temporary token issued by Billy
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