import { useContext } from "react";
import { AppContext } from "@/utils/AppContext";
import ProductCard from "@/components/productCard";
import EmptyState from "@/components/EmptyState";
import Image from "next/image";
import savedIcon from "../../public/saved.svg";
export default function SavedItems() {
  const { savedItems, count } = useContext(AppContext);
  return (
    <div className="min-h-[50vh] m-auto" suppressHydrationWarning={true}>
      <h1 className="px-6 py-2 text-xl font-semibold max-w-[1208px] m-auto">
        SAVED ITEMS
      </h1>
      {savedItems.length > 0 ? (
        <div className=" grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))]  w-full gap-x-[1.50rem] gap-y-4 pt-10 max-w-[1280px] px-6 py-10 mx-auto ">
          {savedItems.map(
            (
              items: {
                images: any;
                originalPrice: string;
                saleScale: string;
                name: string;
                _id: string;
                stock: string;
              },
              index: number
            ) => (
              <ProductCard
                item={items}
                key={index}
                src={items.images[0].url}
                index={index}
                originalPrice={items.originalPrice}
                title={items.name}
                count={count}
                _id={items._id}
                stock={items.stock}
              />
            )
          )}
        </div>
      ) : (
        <EmptyState
          title="No saved items yet"
          message="Tap the bookmark icon on any product to keep it here for later."
          actionLabel="Browse products"
          actionHref="/"
          icon={<Image src={savedIcon} alt="" width={32} height={32} />}
        />
      )}
    </div>
  );
}
