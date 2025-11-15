import styles from "./Banner.module.css";
const ProductBanner = ({ title, path }: { title: string; path: string }) => {
  return (
    <div
      className={`${styles.banner} border-2 border-white rounded-3xl  py-10 px-5 text-center`}
    >
      <div className="text-center">
        <h2 className="font-bold text-xl md:text-3xl leading-relaxed">
          {title}
        </h2>
        <p className="text-sm md:text-base">{path}</p>
      </div>
    </div>
  );
};

export default ProductBanner;
