import { KeyboardEvent, useEffect, useState } from "react"
import { RatingProps } from "./Rating.props"
import cn from "classnames"
import {FaStar} from "react-icons/fa"


import styles from "./Rating.module.scss"

export const Rating = ({ isEditTable = false, rating, setRating, ...props }: RatingProps): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

    useEffect(() => {
        constructRating(rating);
    }, [rating]);

    const constructRating = (currentRating: number) => {
        const updateArray = ratingArray.map((r: JSX.Element, i: number) => {
            return (
                <span onMouseEnter={() => changeDisplay(i + 1)}
                    onMouseLeave={() => changeDisplay(rating)}
                    onClick={() => onClick(i + 1)}
                    className={cn(styles.star, {
                        [styles.filled]: i < currentRating,
                        [styles.editable]: isEditTable,
                    })}>
                    <FaStar fill="none" stroke="#222222"  size={19} stroke-width="50" stroke-linecap="round" />


                </span>
            );
        });
        setRatingArray(updateArray);
    };

    const changeDisplay = (i: number) => {
        if (!isEditTable) return;
        constructRating(i);
    }

    const handleSpace = (i: number, e: KeyboardEvent<SVGElement>) => {
        if (e.code != "Space" || !setRating) {
            return
        }
        setRating(i);
    }

    const onClick = (i: number) => {
        if (!isEditTable || !setRating) return;
        setRating(i);
    }

    return (<div {...props}>{ratingArray.map((r, i) => (
        <span key={i}>{r}</span>
    ))}</div>
    );
};