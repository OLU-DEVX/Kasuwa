import ProductCard from "./productCard";
import SkeletonLoading from "./skeletonLoading";

interface ListedProduct {
  _id: string;
  name: string;
  originalPrice: string;
  stock: string;
  images: { url: string }[];
  category?: string;
  saleScale?: string;
}

interface Props {
  items?: ListedProduct[];
  count: number;
  /** Optional inclusive slice — handy for the home page's flash/most-searched grids. */
  slice?: [number, number];
  /** Override the empty-state element. Defaults to the standard skeleton. */
  loading?: React.ReactNode;
}

/**
 * Shared product grid used on the home page, cart, and search dropdown so
 * the layout and skeleton behaviour stay consistent.
 */
export default function ProductGrid({ items, count, slice, loading }: Props) {
  if (!items || items.length === 0) {
    return <>{loading ?? <SkeletonLoading />}</>;
  }

  const visible = slice ? items.slice(slice[0], slice[1]) : items;
  return (
    <>
      {visible.map((item, index) => (
        <ProductCard
          key={item._id ?? index}
          stock={item.stock}
          _id={item._id}
          item={item}
          src={item.images[0]?.url}
          index={index}
          originalPrice={item.originalPrice}
          title={item.name}
          count={count}
        />
      ))}
    </>
  );
}
