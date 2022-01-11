import React, { useState, useEffect } from "react";
import styles from "./Modal2.module.css";
import { ReactChildren } from "../types";
import { IoMdClose } from "react-icons/io";

export const Modal2 = ({ children }: { children: ReactChildren }) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  return (
    <div
      style={open ? { display: "block" } : { display: "none" }}
      className={styles.modal}
    >
      <div className={styles.modalContent}>
        <button
          aria-label="Close modal"
          data-tooltip-position="left"
          onClick={() => setOpen(false)}
          className={styles.close}
        >
          <IoMdClose size={25} />
        </button>
        {children}
        <div className={styles.modalFooter} />
      </div>
    </div>
  );
};
