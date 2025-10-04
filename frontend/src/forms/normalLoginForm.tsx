import {useForm} from "react-hook-form";
import {normalLoginSchema, type NormalLoginType} from "@/schema/auth.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Alert,
    AlertDescription,
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
import {useNavigate} from "react-router";
import {useAuthStore} from "@/stores/auth.store.ts";
import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {authService} from "@/services/auth.service.ts";
import {Loader2} from "lucide-react";

export const NormalLoginForm = () => {
    const navigate = useNavigate()
    const setUser = useAuthStore((state) => state.setUser)
    const [error, setError] = useState<string | null>(null)


    const form = useForm<NormalLoginType>({
        resolver: zodResolver(normalLoginSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    })

    const loginMutation = useMutation({
        mutationFn: async (credentials: NormalLoginType) => {
            // Step 1: Login (sets cookie)
            await authService.login(credentials)
            // Step 2: Fetch user data using the cookie
            return await authService.getCurrentUser()
        },
        onSuccess: (user) => {
            setUser(user)
            navigate("/dashboard")
        },
        onError: (error: Error) => {
            setError(error.message)
        },
    })

    function onSubmit(values: NormalLoginType) {
        setError(null)
        loginMutation.mutate(values)
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
                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        <FormField
                            control={form.control}
                            name={"username"}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input type={'text'} placeholder={'Enter your username'} {...field}  disabled={loginMutation.isPending} />
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
                                    <FormControl  >
                                        <Input type={'password'} placeholder="••••••••" {...field} disabled={loginMutation.isPending} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your password to login.
                                    </FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={loginMutation.isPending}> {loginMutation.isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Signing in...
                            </>
                        ) : (
                            "Sign in"
                        )}</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )

}