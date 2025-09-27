import * as React from 'react';
import {cn} from "@/lib/utils.ts";



interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
    label?: string;
}

export const Tag = React.forwardRef<HTMLDivElement, TagProps>(
    ({ label, className, ...props }: TagProps, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'flex items-center justify-center rounded-xl bg-gray-200 px-5 py-1',
                    className
                )}
                {...props}
            >
                <p className="font-medium">
                    {label}
                </p>
            </div>
        );
    }
);

