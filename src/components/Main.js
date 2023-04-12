import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductByCategories } from '../services/api';
import Search from './Search';
import { addItem } from '../services/apiCart';
import Card from './Card';

export default class Main extends Component {
  state = {
    categories: [],
    productList: [],
    categoryId: '',
  };

  componentDidMount() {
    getCategories().then((response) => this.setState({ categories: response }));
  }

  getCategoriesProducts = async (event) => { // requisicao 1
    const { target } = event;
    const { id } = target;
    // this.setState({ categoryId: id });
    getProductByCategories(id)
      .then(({ results }) => {
        this.setState({ productList: results });
      });
  };

  addToCart = (parametro) => {
    const { productList } = this.state;
    const produto = productList.find((element) => element.id === parametro);
    produto.quantity = 1;
    addItem(produto);

    // this.setState((prevState) => {
    //   localStorage
    //     .setItem('cart', JSON.stringify([...prevState.addItem, produto]));
    //   return ({
    //     addItem: [...prevState.addItem, produto],
    //   });
    // });
  };

  getProductList = (productList) => {
    this.setState({ productList });
  };

  render() {
    const { categoryId, categories, productList } = this.state;
    return (
      <div id="categoryDiv">
        {' '}
        { categories.map((element, index) => (
          <label
            htmlFor="category"
            id={ index }
            key={ index }
          >
            {' '}
            {element.name}
            <input
              key={ element.id }
              data-testid="category"
              type="radio"
              name="category"
              id={ element.id }
              onChange={ this.getCategoriesProducts }
            />
          </label>))}

        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>

        <Link to="/cart" data-testid="shopping-cart-button">
          <button type="button">Carrinho</button>
        </Link>
        {/* <div className="categoryDiv">
          {productList.length >= 1 && this.getCategoriesProducts() }
        </div> */}
        <Search categorid={ categoryId } getProductList={ this.getProductList } />
        <div className="cardProduct">
          { (productList.length === 0) ? (<p>Nenhum produto foi encontrado</p>)
            : (productList.map((item) => (
              <div key={ item.id }>
                <Link
                  to={ `/product/${item.id}` }
                  data-testid="product-detail-link"
                >
                  <Card
                    title={ item.title }
                    price={ item.price }
                    thumbnail={ item.thumbnail }
                    productList={ productList }
                  />
                </Link>
                <button
                  type="button"
                  data-testid="product-add-to-cart"
                  onClick={ () => this.addToCart(item.id) }
                >
                  Adicionar ao Carrinho
                </button>
              </div>

            )))}
          ;
        </div>
      </div>
    );
  }
}
