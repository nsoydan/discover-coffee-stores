import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import cls from "classnames";
import CoffeStoresData from "../../data/coffee-stores.json";
import styles from "../../styles/coffee-store.module.css";

export function getStaticProps(staticProps) {
  const params = staticProps.params;
  // console.log("params", params);
  return {
    props: {
      coffestore: CoffeStoresData.find((store) => {
        return store.id.toString() === params.id;
      }),
    },
  };
}

export function getStaticPaths(props) {
  const paths = CoffeStoresData.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

const CoffeeStore = (props) => {
  const router = useRouter();
  // console.log("router=>", router);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { name, address, imgUrl, neighbourhood } = props.coffestore;
  const handleUpvoteButton = () => {
    console.log("handleUpvote works");
  };

  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.backToHomeLink}>
        <Link href="/">Back to homepage</Link>
      </div>
      <div className={styles.container}>
        <div className={styles.column1}>
          <div className={styles.nameWrapper}>
            <p className={styles.name}>{name}</p>
          </div>

          <Image
            className={styles.storeImg}
            src={imgUrl}
            alt={name}
            width={600}
            height={200}
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
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/nearMe.svg"
              width="24"
              height="24"
              alt=""
            />
            <p className={styles.text}>{neighbourhood}</p>
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
