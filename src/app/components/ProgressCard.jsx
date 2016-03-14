import React, { PropTypes } from 'react';

const ProgressCard = ({ card }) => (
  <section className="card theme-green">
    <div className="card__map">
      <div className="card__map__inner" />
    </div>
    <section className="card__part card__part-1">
      <div className="card__part__inner">
        <header className="card__header">
          <div className="card__header__close-btn" />
          <span className="card__header__id"># { card.id }</span>
          <span className="card__header__price">${ card.price }</span>
        </header>
        <div className="card__stats" style={{ backgroundImage: `url(${card.bgImgUrl})` }}>
          <div className="card__stats__item card__stats__item--req">
            <p className="card__stats__type">Requests</p>
            <span className="card__stats__value">{ card.requests }</span>
          </div>
          <div className="card__stats__item card__stats__item--pledge">
            <p className="card__stats__type">Pledge</p>
            <span className="card__stats__value">${ card.pledge }</span>
          </div>
          <div className="card__stats__item card__stats__item--weight">
            <p className="card__stats__type">Weight</p>
            <span className="card__stats__value">{ card.weight } oz</span>
          </div>
        </div>
      </div>
    </section>
    <section className="card__part card__part-2">
      <div className="card__part__side m--back">
        <div className="card__part__inner card__face">
          <div className="card__face__colored-side" />
          <h3 className="card__face__price">${ card.price }</h3>
          <div className="card__face__divider" />
          <div className="card__face__path" />
          <div className="card__face__from-to">
            <p>{ card.fromStreet }, { card.fromCity }</p>
            <p>{ card.toStreet }, { card.toCity }</p>
          </div>
          <div className="card__face__deliv-date">
            { card.delivDateNoun }
            <p>{ card.delivTime }</p>
          </div>
          <div className="card__face__stats card__face__stats--req">
            Requests
            <p>{ card.requests }</p>
          </div>
          <div className="card__face__stats card__face__stats--pledge">
            Pledge
            <p>${ card.pledge }</p>
          </div>
          <div className="card__face__stats card__face__stats--weight">
            Weight
            <p className="card__face__stats__weight">
              <span>{ card.weight < 60 ? 'Light' : 'Heavy' }</span>
            </p>
          </div>
        </div>
      </div>
      <div className="card__part__side m--front">
        <div className="card__sender">
          <h4 className="card__sender__heading">Sender</h4>
          <div className="card__sender__img-cont">
            <div className="card__sender__img-cont__inner">
              <img src={ card.senderImg } className="card__sender__img" />
            </div>
          </div>
          <div className="card__sender__name-and-rating">
            <p className="card__sender__name">{ card.sender }</p>
            <p className="card__sender__rating card__sender__rating-2">
              <span className="card__sender__rating__star">★</span>
              <span className="card__sender__rating__star">★</span>
              <span className="card__sender__rating__star">★</span>
              <span className="card__sender__rating__star">★</span>
              <span className="card__sender__rating__star">★</span>
              <span className="card__sender__rating__count">({ card.ratingCount })
                 { card.rating }</span>
            </p>
            <p className="card__sender__address">
              { card.fromStreet }, { card.fromCity }
            </p>
          </div>
          <div className="card__receiver">
            <div className="card__receiver__inner">
              <div className="card__sender__img-cont">
                <div className="card__sender__img-cont__inner">
                  <img src={ card.senderImg } className="card__sender__img" />
                </div>
              </div>
              <div className="card__sender__name-and-rating">
                <p className="card__sender__name">{ card.sender }</p>
                <p className="card__sender__address">
                  { card.toStreet }, { card.toCity }
                </p>
              </div>
            </div>
          </div>
          <div className="card__path-big" />
        </div>
        <div className="card__from-to">
          <div className="card__from-to__inner">
            <div className="card__text card__text--left">
              <p className="card__text__heading">From</p>
              <p className="card__text__middle">{ card.fromStreet }</p>
              <p className="card__text__bottom">{ card.fromCity }</p>
            </div>
            <div className="card__text card__text--right">
              <p className="card__text__heading">To</p>
              <p className="card__text__middle">{ card.toStreet }</p>
              <p className="card__text__bottom">{ card.toCity }</p>
            </div>
          </div>
        </div>
        <section className="card__part card__part-3">
          <div className="card__part__side m--back" />
          <div className="card__part__side m--front">
            <div className="card__timings">
              <div className="card__timings__inner">
                <div className="card__text card__text--left">
                  <p className="card__text__heading">Delivery Date</p>
                  <p className="card__text__middle">{ card.delivTime }</p>
                  <p className="card__text__bottom">{ card.delivTime }</p>
                </div>
                <div className="card__text card__text--right">
                  <p className="card__text__heading">Request Deadline</p>
                  <p className="card__text__middle">{ card.deadline }</p>
                </div>
              </div>
            </div>
            <div className="card__timer">60 min 00 sec</div>
            <section className="card__part card__part-4">
              <div className="card__part__side m--back" />
              <div className="card__part__side m--front">
                <button type="button" className="card__request-btn">
                  <span className="card__request-btn__text-1">Request</span>
                  <span className="card__request-btn__text-2">Start</span>
                </button>
                <p className="card__counter">{ card.requests } people have sent a request</p>
              </div>
            </section>
          </div>
        </section>
      </div>
    </section>
  </section>
);

ProgressCard.propTypes = {
  card: PropTypes.number.isRequired,
};

export default ProgressCard;
