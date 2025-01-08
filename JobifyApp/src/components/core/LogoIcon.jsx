
export default function LogoIcon({type, className = ""}) {
  // debugger;
  const src = (type === "dark") ?
      "/src/assets/LogoIcons/black_on_trans.png":
     (type === "light") ?
      "/src/assets/LogoIcons/white_on_trans.png":
      ""
      

  return (
    <img
        src={src}  // Replace with the actual logo path
        alt="Jobify Logo"
        className={className}
    />
  )
}
