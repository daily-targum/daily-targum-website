import React from "react";
import { Text, Button } from "./";
import styles from "./Modal2.module.css";
import Logo from "./Logo";

export const DonateModal = () => {
  return (
    <>
      <div className={styles.modalHeader}>
        <Text variant="h3">Consider Donating</Text>
      </div>
      <div className={styles.donateModal}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Logo style={{ width: "80%" }} />
        </div>
        <Text variant="p">
          Give back to The Daily Targum and support independent student
          journalism this holiday season. Donations are tax deductible.
        </Text>
        <br />
        <div>
          <Button
            style={{ alignSelf: "flex-start" }}
            href="https://www.paypal.com/donate/?hosted_button_id=GPJZ5VKSNUBRQ"
          >
            Donate
          </Button>
        </div>
      </div>
    </>
  );
};
