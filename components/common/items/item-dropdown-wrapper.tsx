import styles from "./item-dropdown-wrapper.module.css";
import { Utilities } from "../../../assets";

const ItemDropdownWrapper = ({
  image,
  data = null,
  optionOnClick = () => {},
  hasOption = false,
  overrideIcon = false,
  OverrideIconComp = () => <></>,
  children,
}) => (
  <div className={styles["container"]}>
    {overrideIcon ? (
      <OverrideIconComp />
    ) : (
      <img className={styles["icon-left"]} src={image} />
    )}
    <div className={styles["data-dropdown"]}>
      <span
        className={`${data ? styles["data-text"] : styles["text-placeholder"]}`}
      >
        {data}
        {children}
      </span>
    </div>
    {hasOption && (
      <div className={styles["icon-container"]} onClick={optionOnClick}>
        <img src={Utilities.arrowDark} />
      </div>
    )}
  </div>
);

export default ItemDropdownWrapper;
