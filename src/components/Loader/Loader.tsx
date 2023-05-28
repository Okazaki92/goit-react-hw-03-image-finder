import { Dna } from "react-loader-spinner";
import styles from "./Loader.module.css";
export const Loader = () => {
  return (
    <div className={styles.loader}>
      <Dna
        visible={true}
        height="300"
        width="300"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
};
