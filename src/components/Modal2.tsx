import React from "react";
import styles from "./Modal2.module.css";
import { ReactChildren } from "../types";
import Text from "./Text";
import { IoMdClose } from "react-icons/io";

export const Modal2 = ({
  header,
  footer,
  children,
}: {
  header: string;
  footer?: string;
  children: ReactChildren;
}) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <div>Hello world</div>
          <button
            aria-label="Close modal"
            data-tooltip-position="left"
            //onClick={handleClose}
            className={styles.close}
          >
            <IoMdClose size={10} />
          </button>
          {/*  <span className={styles.close}>&times;</span> */}
          <Text variant="h3">{header}</Text>
        </div>
        <div className={styles.modalBody}>{children}</div>
        <div className={styles.modalFooter}>{footer}</div>
      </div>
    </div>
  );
};
