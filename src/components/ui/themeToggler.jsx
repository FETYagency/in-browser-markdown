import { useEffect, useRef, useState } from "react";
import LightSvg from "../../assets/ligntSvg";
import DarkSvg from "../../assets/darkSvg";
import useMediaQuery from "../../services/hooks/useThemeQuery";

export default function ThemeToggler({ className = "" }) {
  const { toggleDark, toggleLight, api } = useMediaQuery(
    "(prefers-color-scheme:dark)"
  );
  const toggler = useRef(null);
  let [isChecked, setIsChecked] = useState(api);
  useEffect(() => {
    setIsChecked(api);
  }, [api]);
  useEffect(() => {
    if (!isChecked) {
      toggleLight();
    } else {
      toggleDark();
    }
  }, [isChecked]);
  return (
    <div
      className={"flex items-center flex-row-reverse gap-[12px] " + className}
    >
      <span
        className={`dark:text-light-100 text-white`}
        onClick={() => setIsChecked(false)}
      >
        <LightSvg />
      </span>
      <label htmlFor="target" className="relative">
        <input
          ref={toggler}
          checked={isChecked}
          id="target"
          type="checkbox"
          onChange={(e) => setIsChecked((prev) => !prev)}
          className="absolute opacity-0 pointer-events-none w-[0px] h-[0px]"
        />
        <div className="h-[24px] w-[48px] bg-light-100 rounded-[14px] px-[6px] flex items-center">
          <div className="h-[12px] w-full flex justify-end dark:justify-start">
            <div className="h-full aspect-square bg-white rounded-full"></div>
          </div>
        </div>
      </label>
      <span
        className={`text-light-100 dark:text-white`}
        onClick={() => setIsChecked(true)}
      >
        <DarkSvg />
      </span>
    </div>
  );
}
