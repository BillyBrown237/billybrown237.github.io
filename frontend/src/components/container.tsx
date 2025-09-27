import type {PropsWithChildren, Ref, HTMLAttributes} from 'react';
import {cn} from "@/lib/utils.ts";

type ContainerProps = {
    ref?: Ref<HTMLElement> | undefined
} & HTMLAttributes<HTMLElement>


export const Container = ({ref, children , ...props}: PropsWithChildren<ContainerProps>) => {
    return (
        <section ref={ref} {...props} className={cn('w-full bg-gray py-16 md:py-20 2xl:py-24', {})}>
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 md:gap-12 md:px-8">
                {children}
            </div>
        </section>
    )
}
