import { DetailedHTMLProps, HTMLAttributes,  ReactNode } from "react";

export interface IconProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    pet?: boolean
    lunches?: boolean
    vegetarian?: boolean
    wine?: boolean
    playground?: boolean
}