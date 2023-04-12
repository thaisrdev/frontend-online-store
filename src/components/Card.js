import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Card extends Component {
  render() {
    const { title, price, thumbnail } = this.props;
    return (
      <div>
        {
          title.length > 0 ? (
            <div>
              <p>{title}</p>
              <img src={ thumbnail } alt={ title } data-testid="product" />
              <p>
                R$:
                {price}
              </p>
            </div>) : null
        }
      </div>
    );
  }
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
};
