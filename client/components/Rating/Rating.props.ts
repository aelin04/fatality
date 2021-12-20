import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";

export interface RatingProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement> , HTMLDivElement> {
    isEditTable?: boolean
    rating: number 
    setRating?: (rating: number) => void
}