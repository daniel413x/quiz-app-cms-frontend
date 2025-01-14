interface LabelTextProps {
  string: string;
}

function LabelText({
  string,
}: LabelTextProps) {
  return (
    <span className="text-gray-500">
      {" "}
      <span aria-hidden="true">
        &#40;
      </span>
      {string}
      <span aria-hidden="true">
        &#41;
      </span>
    </span>
  );
}

export default LabelText;
