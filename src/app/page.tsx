import Header from "~/presentation/components/header";
import styles from "./page.module.css";
import ProductView from "~/presentation/components/product";

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <ProductView />
    </main>
  );
}
