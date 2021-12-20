import { DetailedHTMLProps, HTMLAttributes,  ReactNode } from "react";

export interface CardsProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {

}

export interface place {
    id: number
    name: string
    img: string
    adress: string[]
    kitchen: string
    filtr: filter
}

export interface filter {
    businessLunches: boolean
    petFriendly: boolean
    vegetarianMenu :boolean
    wineMap: boolean
    playground: boolean
}