import Image from "next/image";
import { PaperPlaneTilt } from "phosphor-react";
import { getTodaysDate, prettyDateFormat } from "@utils/utils";
import SetRatingIcon from "./SetRatingIcon";
import RatingsView from "./RatingsView";
import ToggleFavoritedIcon from "./ToggleFavoritedIcon";
import { ICON_SIZE } from "@consts/consts";

const Card = ({ image }) => {
  const formattedDate = prettyDateFormat(image.date);
  const readOnly = image.date != getTodaysDate();

  const handleSharing = async () => {
    const data = {
      url: `/date/${image.date}`,
      text: `The Daily Gerth: ${formattedDate}`,
    };
    if (navigator.share === undefined) {
      alert("This Browser does not support sharing. Please try Safari browser");
    }
    try {
      if (navigator.canShare(data)) {
        await navigator.share(data);
      } else {
        throw new Error("Can't Share data");
      }
    } catch (err) {}
  };

  return (
    <div id={image.date} className="card p-1">
      <div className="w-full">
        <Image
          id={image.url}
          alt={"Image: " + image.date}
          src={image.url}
          width="100%"
          height="100%"
          layout="responsive"
          className="rounded-lg bg-neutral object-cover"
          placeholder="blur"
          blurDataURL={image.url}
        />
      </div>
      <div className="card-actions flow-root mt-1 mb-0">
        <div className="flex float-left">
          <SetRatingIcon image={image} readOnly={readOnly} />
          <PaperPlaneTilt
            onClick={() => handleSharing()}
            className="m-1 text-base-300"
            weight="regular"
            size={ICON_SIZE}
          />
        </div>
        <ToggleFavoritedIcon image={image} />
      </div>
      <div className="card-content px-2 text-sm">
        <h2 className="card-title text-md">{formattedDate}</h2>
        <RatingsView image={image} />
      </div>
    </div>
  );
};

export default Card;
