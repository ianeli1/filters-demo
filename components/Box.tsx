interface BoxProps {
  children: React.ReactNode;
  color?: string;
  noPadding?: boolean;
  styles?: string;
}

export default function Box(props: BoxProps) {
  return (
    <section
      className={`${props.color ?? "bg-gray-100"} shadow rounded-xl ${
        props.noPadding ? "" : "p-4 pr-12"
      } m-4 w-full overflow-auto box-border ${props.styles}`}
    >
      {props.children}
    </section>
  );
}
