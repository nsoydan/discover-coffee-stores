import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import cls from "classnames";
import styles from "../../styles/coffee-store.module.css";
import { fetchCoffeeStores } from "../../lib/coffee-stores";
import { useState, useContext, useEffect } from "react";
import { StoreContext } from "../../store/store-context";
import { isEmpty } from "../../utils";

export async function getStaticProps(staticProps) {
  const params = staticProps.params;
  const coffeeStores = await fetchCoffeeStores();
  const findCoffeeStoreById = coffeeStores.find((store) => {
    return store.id === params.id;
  });
  return {
    props: {
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
    },
  };
}

export async function getStaticPaths(props) {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

const CoffeeStore = (initialProps) => {
  const router = useRouter();
  const { coffeeStores } = useContext(StoreContext);
  console.log("------", coffeeStores);
  console.log("****", initialProps);
  const [store, setStore] = useState(initialProps.coffeeStore);
  const id = router.query.id;

  const handleCreateCoffeeStore = async (coffeeStore) => {
    const { id, name, voting, address, imgUrl, neighborhood } = coffeeStore;

    try {
      const response = await fetch("/api/createCoffeeStore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          voting: 0,
          address: address || "",
          imgUrl,
          neighborhood: neighborhood || "",
        }),
      });
      const dbCoffeeStore = await response.json();
      console.log({ dbCoffeeStore });
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    if (isEmpty(initialProps.coffeeStore)) {
      if (coffeeStores.length > 0) {
        const coffeeStoreFromContext = coffeeStores.find((store) => {
          return store.id === id;
        });
        if (coffeeStoreFromContext) {
          setStore(coffeeStoreFromContext);
          handleCreateCoffeeStore(coffeeStoreFromContext);
        }
      }
    } else {
      handleCreateCoffeeStore(initialProps.coffeeStore);
    }
  }, [id, initialProps.coffeeStore, coffeeStores]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { name, address, neighborhood, imgUrl } = store;

  const handleUpvoteButton = () => {};

  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.backToHomeLink}>
        <Link href="/"> ←Back to homepage</Link>
      </div>
      <div className={styles.container}>
        <div className={styles.column1}>
          <div className={styles.nameWrapper}>
            <p className={styles.name}>{name}</p>
          </div>

          <Image
            className={styles.storeImg}
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzOTczMDJ8MHwxfHNlYXJjaHwyfHxjb2ZmZWUlMjBzaG9wfGVufDB8fHx8MTY3MzU5MDUyNg&ixlib=rb-4.0.3&q=80&w=400"
            }
            alt="alt"
            width={360}
            height={600}
          />
        </div>

        <div className={cls("glass", styles.column2)}>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/places.svg"
              width="24"
              height="24"
              alt=""
            />
            {address && <p className={styles.text}>{address}</p>}
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/nearMe.svg"
              width="24"
              height="24"
              alt=""
            />
            {neighborhood && <p className={styles.text}>{neighborhood}</p>}
          </div>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/star.svg" width="24" height="24" alt="" />
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            {" "}
            Upvote
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
