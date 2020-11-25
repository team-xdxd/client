import styles from "./item-dropdown-wrapper.module.css";
import { Utilities } from "../../../assets";

const ItemDropdownWrapper = ({
  image,
  data = null,
  optionOnClick = () => { },
  hasOption = false,
  overrideIcon = false,
  OverrideIconComp = () => <></>,
  children,
  styleType = false
}) => (

    <div className={styles["container"]} onClick={optionOnClick}>
      {overrideIcon ? (
        <OverrideIconComp />
      ) : (
          <img className={styles["icon-left"]} src={image} />
        )}
      <div className={styles["data-dropdown"]}>
        <span
          className={`${styleType ? styles["data-text"] : styles["text-placeholder"]}`}
        >
          {data}
        </span>
        {children}
      </div>
      {hasOption && (
        <div className={styles["icon-container"]}>
          <img src={Utilities.arrowDark} />
        </div>
      )}
    </div>
  );

export default ItemDropdownWrapper;
