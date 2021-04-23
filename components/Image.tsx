import { useEffect, useRef, useState } from "react";
import { Maybe } from "../utils";
import Box from "./Box";

interface ImageProps {
  image?: string;
  size?: string;
  onLoading?: (done: boolean) => void;
  hidden?: boolean;
}

export default function Image(props: ImageProps) {
  const imageEl = useRef<HTMLImageElement>(null);
  const setLoadingTrue = () => Maybe(props.onLoading, true);

  useEffect(() => {
    Maybe(props.onLoading, false);
  }, [props.image]);

  return props.image ? (
    <Box noPadding>
      <img
        src={props.image}
        className={`${props.size ?? "w-full h-auto"} object-cover box-border ${
          props.hidden ? "hidden" : ""
        }`}
        onLoad={setLoadingTrue}
      />
    </Box>
  ) : null;
}
