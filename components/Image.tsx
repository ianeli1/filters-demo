import Box from "./Box";

interface ImageProps {
  image?: string;
  size?: string;
}

export default function Image(props: ImageProps) {
  return props.image ? (
    <Box noPadding>
      <img
        src={props.image}
        className={`${props.size ?? "w-full h-auto"} object-cover box-border`}
      />
    </Box>
  ) : null;
}
