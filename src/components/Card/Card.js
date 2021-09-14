function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <li className="place">
      <img
        className="place__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <button className="trash" aria-label="удалить" type="button"></button>
      <div className="place__info">
        <h2 className="place__name">{props.card.name}</h2>
        <div>
          <button className="like" aria-label="нравится" type="button"></button>
          <div className="likesCounter">
            {props.card.likes.length === 0 ? null : props.card.likes.length}
          </div>
        </div>
      </div>
    </li>
  );
}

export default Card;
