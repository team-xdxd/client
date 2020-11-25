import styles from "./button-icon.module.css";

const ButtonIcon = ({
  text,
  disabled = false,
  icon,
  onClick,
  buttonType = "submit",
  isGray = false,
}) => {
  return (
    <button
      className={`${!isGray ? styles.container : styles["container-gray"]}`}
      disabled={disabled}
      onClick={onClick}
      // type="button"
    >
      <span className={styles.icon}>
        <img src={icon} />
      </span>
      <span className={styles.text}>{text}</span>
    </button>
  );
};

export default ButtonIcon;
