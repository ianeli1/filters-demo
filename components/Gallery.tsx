import Box from "./Box";
import Image from "./Image";

interface GalleryProps {
  images: string[];
  onSelect: (image: string, id: number) => void;
  selected: number;
}

export default function Gallery(props: GalleryProps) {
  return (
    <Box color="bg-gray-500" styles="grid lg:grid-cols-3 grid-cols-1">
      {props.images.map((x, i) => (
        <div onClick={() => props.onSelect(x, i)} className={`m-2`}>
          <Image
            size={`h-40 box-border rounded-xl ${
              props.selected === i ? "border-4 border-blue-600" : ""
            }`}
            image={x}
          />
        </div>
      ))}
    </Box>
  );
}
