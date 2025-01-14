function DateLabelInfo() {
  return (
    <>
      <span className="text-gray-500">
        {" "}
        <span aria-hidden="true">
          &#40;
        </span>
        date
        <span aria-hidden="true">
          &#41;
        </span>
      </span>
      <span className="text-gray-500">
        {" "}
        <span aria-hidden="true">
          &#40;
        </span>
        <span aria-label="m m slash d d slash y y y y">
          mm/dd/yyyy
        </span>
        <span aria-hidden="true">
          &#41;
        </span>
      </span>
    </>
  );
}

export default DateLabelInfo;
