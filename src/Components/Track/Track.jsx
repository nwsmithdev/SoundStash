import styles from "./Track.module.css";

function Track(props) {
  return (
    <>
      <h3>{props.title}</h3>
      <p>
        {props.artist} | {props.album}
      </p>
      <button aria-label="Add song to playlist">+</button>
    </>
  );
}

export default Track;
