import CartView from "~/presentation/components/cart";
import Header from "~/presentation/components/header";
import styles from "./page.module.css";

export default function Cart() {
  return (
    <main className={styles.main}>
      <Header />
      <CartView />
    </main>
  );
}
