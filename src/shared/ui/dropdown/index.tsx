import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import styles from "./index.module.scss";

interface DropdownProps {
  onClick: () => void;
  className?: string;
  text?: string;
  hideDropdown: () => void;
}
export const Dropdown = ({
  onClick,
  className,
  text,
  hideDropdown,
}: DropdownProps) => {
  const ref = useRef(null);

  useOnClickOutside(ref, hideDropdown);

  return (
    <div className={styles.dropdown}>
      <button ref={ref} onClick={onClick} className={className}>
        {text || "Вашего города нет в списке"}
      </button>
    </div>
  );
};
