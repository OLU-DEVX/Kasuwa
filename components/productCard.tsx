"use client";
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Image,
  CardHeader,
} from "@nextui-org/react";
import { useState, useContext } from "react";
import { AppContext } from "@/utils/AppContext";
import { formatNaira } from "@/lib/format";
import { parseStock, stockColorClass, stockLabel } from "@/lib/stock";
import type { Product } from "@/lib/types";

// Card accepts the product subset its callers actually have on hand —
// `description` and `category` aren't always present in the home/listing
// payloads, so we keep them optional here.
type ProductCardItem = Pick<
  Product,
  "_id" | "name" | "originalPrice" | "stock" | "images"
> &
  Partial<Pick<Product, "description" | "category" | "saleScale">>;

interface card {
  _id: string;
  src: string;
  index: number;
  originalPrice: string;
  title: string;
  item: ProductCardItem;
  count: number;
  stock: string;
}
import Bookmark from "./bookmark";
import Link from "next/link";
export default function ProductCard({
  item,
  src,
  index,
  title,
  originalPrice,
  count,
  _id,
  stock,
}: card) {
  const { amount, status } = parseStock(stock);
  const [localCount, setLocalCount] = useState(Math.min(count, Math.max(amount, 1)));
  const { addToCart } = useContext(AppContext);
  const increament = () => {
    if (localCount < amount) {
      setLocalCount(localCount + 1);
    }
  };
  const decreament = () => {
    if (localCount > 0) {
      setLocalCount(localCount - 1);
    }
  };

  function getStockStatus() {
    return <p className={stockColorClass(status)}>{stockLabel(status)}</p>;
  }
  return (
    <Card
      shadow="md"
      key={index}
      className="shadow-sm rounded-md w-full p-0 bg-white mx-auto sm:max-w-[250px]"
      style={{
        padding: "0px",
      }}
      radius="none"
    >
      <CardHeader className="absolute z-20 top-1 flex-col !items-start ">
        <Button
          style={{
            background: "transparent",
            marginLeft: "auto",
            width: "fit",
            padding: "4px",
            borderRadius: "23px",
            minWidth: "fit-content",
          }}
          startContent={<Bookmark title={title} item={item} />}
        ></Button>
      </CardHeader>
      <CardBody
        className="p-0 max-w-[unset] w-full"
        style={{
          maxWidth: "unset",
        }}
      >
        <Image
          radius="none"
          removeWrapper
          src={src}
          className="w-full m-auto  h-[200px] object-cover max-w-[unset] "
          alt="img"
        />
        <CardFooter className="text-small justify-between flex flex-col gap-3 w-full p-0 pt-2">
          <div className="px-2 w-full">
            <div className="flex justify-between">
              <Link  href={`/product/${_id}`}>
                <b>{title}</b>
              </Link>
              <div className="flex justify-center gap-1 items-center">
                <Button
                  radius="none"
                  className=" h-[25px] min-w-[25px]  p-1"
                  onClick={decreament}
                >
                  -
                </Button>
                <span>{localCount}</span>
                <Button
                  radius="none"
                  className="w-[25px] h-[25px] min-w-[25px] p-1"
                  onClick={increament}
                >
                  +
                </Button>
              </div>
            </div>
            <div>{getStockStatus()}</div>
            <div className="flex justify-between">
              <p>Price:</p>
              <p className="text-default-500">
                {formatNaira(originalPrice)}
              </p>
            </div>
          </div>
          {amount > 0 && (
            <Button
              radius="none"
              className="flex gap-2 w-full bg-[#38B419] text-white py-2"
              onClick={() => {
                addToCart(item, localCount);
              }}
            >
              <Image src="cart copy.svg" alt="cart" />
              <span>Add to cart</span>
            </Button>
          )}
          {amount === 0 && (
            <Button
              isDisabled
              radius="none"
              className="flex gap-2 w-full bg-[#38B419] text-white py-2"
              onClick={() => {
                addToCart(item, localCount);
              }}
            >
              <Image src="cart copy.svg" alt="cart" />
              <span>Add to cart</span>
            </Button>
          )}
        </CardFooter>
      </CardBody>
    </Card>
  );
}
