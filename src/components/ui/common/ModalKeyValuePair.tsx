interface ModalKeyValuePairProps {
  k: string;
  value: string | number;
  ariaLabel?: string;
}

function ModalKeyValuePair({
  k,
  value,
  ariaLabel,
}: ModalKeyValuePairProps) {
  return (
    <div
      className="flex flex-col"
      role="listitem"
      aria-label={ariaLabel || `${k} ${value}`}
    >
      <span className="uppercase text-xs" aria-hidden="true">
        {k}
      </span>
      <span aria-hidden="true">
        {value}
      </span>
    </div>
  );
}

export default ModalKeyValuePair;
