interface ButtonProps {
  onClick?: () => void;
  children: string;
}

export default function Button(props: ButtonProps) {
  return (
    <div className="btn btn-secondary cursor-pointer" onClick={props.onClick}>
      {props.children}
    </div>
  );
}
