import { CardsProps, place } from "./Cards.props"
import cn from "classnames"
import styles from "./Cards.module.scss"
import { IconCatalog } from "../iconCatalog/IconCatalog"
import { MdArrowForwardIos } from "react-icons/md"
import { Rating } from "../Rating/Rating"
import { useEffect, useState } from "react"
import axios from "axios"

export const Cards = ({ ...props }: CardsProps): JSX.Element => {
    const [rating, setRating] = useState<number>(0)
    const [place, setPlace] = useState<place[]>([])
    const getPlacesData = () => {
        axios.get('https://61af2b1c3e2aba0017c4908e.mockapi.io/DataRest')
        .then (resp => setPlace(resp.data))
    }
    
    useEffect(() => {
        getPlacesData()
    }, [])
    return (
       <div className={styles.main}>
           {place.map(i => (
                <div key={i.id} className={styles.card__wrapper}>
                <img src={i.img} alt={i.name} />
                <div className={styles.card__info}>
                    <div className={styles.card__title}><h4 className={styles.card__subtitle}>{i.kitchen.toUpperCase()}</h4>
                        <h3 className={styles.card__title}>{i.name.toUpperCase()}</h3>
                    </div>
                    <div className={styles.card__category}>
                        <div className={styles.card__rating}><Rating rating={rating} isEditTable setRating={setRating} /></div>
                        <div className={styles.card__filter}><IconCatalog lunches={i.filtr.businessLunches} pet={i.filtr.petFriendly} playground={i.filtr.playground} wine={i.filtr.wineMap} vegetarian={i.filtr.vegetarianMenu} /></div>
                        <div className={styles.card__button}><button>Подробнее <MdArrowForwardIos /></button></div>
                    </div>
                </div>
            </div>
           ))}
       </div>

    )
}