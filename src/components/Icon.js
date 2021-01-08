import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Icon(props) {
  return (
    <span className="icon">
      <FontAwesomeIcon {...props} />
    </span>
  );
}
