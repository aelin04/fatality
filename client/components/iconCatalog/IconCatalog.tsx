import { IconProps } from "./IconCatalog.props";
import cn from "classnames"
import { GiKidSlide } from "react-icons/gi"
import { MdPets } from "react-icons/md"
import { FaLeaf } from "react-icons/fa"
import { FaBusinessTime } from "react-icons/fa"
import { IoIosWine } from "react-icons/io"
import styles from "./IconCatalog.module.scss"

export const IconCatalog = ({ pet = false, wine = false, vegetarian = false, playground =false, lunches= false, className, ...props }: IconProps): JSX.Element => {
    return (
        <div {...props} className={styles.catalog}>
            <div className={cn(styles.false, {
                [styles.true]: playground,
            })}><GiKidSlide size={30} /></div>
            <div className={cn(styles.false, {
                [styles.true]: wine,
            })}><IoIosWine size={30}/></div>
            <div className={cn(styles.false, {
                [styles.true]: lunches,
            })}><FaBusinessTime size={30}/></div>
            <div className={cn(styles.false, {
                [styles.true]: vegetarian,
            })}><FaLeaf size={30} /></div>
            <div className={cn(styles.false, {
                [styles.true]: pet,
            })}><MdPets size={30}/></div>
        </div>
    )
}