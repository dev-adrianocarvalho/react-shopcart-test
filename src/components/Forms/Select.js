import { useRef, useState } from "react";
import Icon from "../Icon";

export const Select = (props) => {
  const [hovered, setHovered] = useState(false);
  const select = useRef("select_" + Math.random());

  const toggleHover = (event) => {
    event.stopPropagation();
    setHovered(!hovered);
    select.current.focus();
  };

  function handleChange(event) {
    props.onChange(event.nativeEvent);
    setHovered(false);
    select.current.blur();
  }

  return (
    <div
      className={`select ${hovered ? "select__hover" : ""}`}
      onClick={toggleHover}
    >
      <label htmlFor={props.id}>
        {props.label}
        <select ref={select} {...props} onChange={handleChange}>
          {props.children}
        </select>
      </label>
      {hovered ? <Icon icon="angle-up" /> : <Icon icon="angle-down" />}
    </div>
  );
};
