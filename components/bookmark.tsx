import Image from "next/image";
import bookmark from "../public/bookmark.svg";
import isBookmarked from "../public/bookmark copy.svg";
import { useContext } from "react";
import { AppContext } from "@/utils/AppContext";

export default function Bookmark({ title, item }: any) {
  const { addToSavedItems, removeFromSavedItems, savedItems } =
    useContext(AppContext);

  const isFavourite = savedItems.includes(item);
  const label = isFavourite
    ? `Remove ${title} from saved items`
    : `Save ${title} for later`;
  const onToggle = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      "key" in event &&
      event.key !== "Enter" &&
      event.key !== " " &&
      event.type === "keydown"
    ) {
      return;
    }
    if (isFavourite) {
      removeFromSavedItems(title, item);
    } else {
      addToSavedItems(item);
    }
  };

  return (
    <div
      className="ml-auto cursor-pointer"
      role="button"
      tabIndex={0}
      aria-pressed={isFavourite}
      aria-label={label}
      onClick={onToggle}
      onKeyDown={onToggle}
    >
      <Image
        src={isFavourite ? isBookmarked : bookmark}
        width={30}
        height={30}
        alt=""
      />
    </div>
  );
}
