import { Link } from "react-router-dom";

export default function TButton({
  color = "blue",
  to = "",
  href = "",
  link = false,
  target = "_blank",
  onClick = () => { },
  transparent = false,
  overideClass = false,
  children,
  className = "",
  size="md"
}) {

  let classes = [
    "transition duration-300"
  ];

  switch (size) {
    case "md":
      classes = [...classes, "text-base", "border-2", "px-6", "py-3", "rounded-lg"]
      break;
    case "sm":
      classes = [...classes, "text-sm", "border-1", "px-3", "py-2", "rounded-md"]
      break;

    case "lg":
      classes = [...classes, "text-lg", "border-2", "px-6", "py-3", "rounded-lg"]
      break;
  
    default:
      break;
  }

  switch (color) {
    case "blue":
      classes = !transparent ?
        [...classes, "bg-blue-600", "hover:bg-blue-700", "text-white border-blue-700"]
        : [...classes, "border-2", "bg-transparent", "text-blue-600", "border-blue-600", "hover:bg-blue-700", "hover:text-white"]
      break;
    case "green":
      classes = !transparent ?
        [...classes, "bg-emerald-600", "hover:bg-emerald-700", "text-white"]
        : [...classes, "bg-transparent", "text-emerald-600", "border-emerald-600", "hover:bg-emerald-700", "hover:text-white"]
      break;
    case "gray":
      classes = !transparent ?
        [...classes, "bg-slate-800", "hover:bg-slate-900", "text-white"]
        : [...classes, "bg-transparent", "text-slate-800", "border-slate-800", "hover:bg-slate-900", "hover:text-white"]
      break;
    case "light-gray":
      classes = [ ...classes, "bg-gray-300", "text-gray-700", "hover:bg-gray-400"]
      break;
    default:
      classes = [...classes, "text-slate-800", "border-slate-800", "bg-transparent"]
  }

  const classNames = overideClass ? className : classes.join(" ") + " " + className;
  return (
    <>
      {href && (
        <a href={href} className={classNames} target={target}>
          {children}
        </a>
      )}
      {to && (
        <Link to={to} className={classNames}>
          {children}
        </Link>
      )}
      {!to && !href && (
        <button onClick={onClick} className={classNames}>{children}</button>
      )}
    </>
  );
}
