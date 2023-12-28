export default function Typo({ variant, text, className = "" }) {
  let content;
  switch (variant) {
    case "H(m)":
      content = (
        <h5
          className={className + " " + "font-normal text-[15px] leading-normal"}
        >
          {text}
        </h5>
      );
      break;
    case "H(s)":
      content = (
        <h5
          className={
            className +
            " " +
            "font-medium tracking-[2px] text-[14px] leading-normal"
          }
        >
          {text}
        </h5>
      );
      break;
    case "B(s)":
      content = (
        <p
          className={className + " " + "font-normal text-[13px] leading-normal"}
        >
          {text}
        </p>
      );
      break;
    default:
      throw new Error(
        "you must add a variant to the given prop 'variant' of the the Typography component !"
      );
  }
  return <>{content}</>;
}
