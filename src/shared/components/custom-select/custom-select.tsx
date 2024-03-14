import { FC, useEffect, useState } from "react";
import styles from "./custom-select.module.scss";

interface Option {
  label: string;
  value: string;
  imageSrc?: string;
}

interface Props {
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
}

export const CustomSelect: FC<Props> = ({
  options,
  selectedValue,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  const renderImage = (option: Option) => {
    return (
      option.imageSrc && (
        <img
          src={option.imageSrc}
          alt=""
          className={styles.dropdownItemImage}
        />
      )
    );
  };

  const dropdownListClass = isOpen
    ? `${styles.dropdownList} ${styles.open}`
    : styles.dropdownList;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdownHeader} onClick={() => setIsOpen(!isOpen)}>
        <span className={styles.dropdown_option}>
          {renderImage(
            options.find((option) => option.value === selectedValue),
          )}
          {options.find((option) => option.value === selectedValue)?.label}
        </span>
      </div>
      <ul className={dropdownListClass}>
        {options.map((option) => (
          <li
            key={option.value}
            className={`${styles.dropdownItem} ${
              selectedValue === option.value ? styles.selected : ""
            }`}
            onClick={() => handleItemClick(option.value)}
          >
            {renderImage(option)}
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
