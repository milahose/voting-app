class ProductList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			products: []
		}
	}

	componentDidMount() {
		this.setState({
			products: Seed.products.sort((a, b) => b.votes - a.votes)
		});
	}

	handleProductUpVote = (id) => {
		this.setState({
			products: this.state.products.map(product => {
				if ( product.id === id ) {
					return Object.assign({}, product, {
						votes: product.votes + 1
					});
				} else {
					return product;
				}
			})
		});
	}

	render() {
		const sortedProducts = this.state.products;
		const products = sortedProducts.map(product => <Product key={product.id} {...product} onClick={this.handleProductUpVote} />);

		return (
			<div className='ui unstackable items'>
				{products}
			</div>
		);
	}
}

class Product extends React.Component {
	render() {
		return (
			<div className='item' id={this.props.id}>
				<div className='image'>
					<img src={this.props.productImageUrl} alt='' />
				</div>
				<div className='middle aligned content'>
					<div className='header'>
						<a onClick={() => this.props.onClick(this.props.id)}><i className='large caret up icon' /></a>
						{this.props.votes}
					</div>
					<div className='description'>
						<a>{this.props.title}</a>
						<p>{this.props.description}</p>
					</div>
					<div className='extra'>
						<span>Submitted by:</span>
						<img className='ui avatar image' src={this.props.submitterAvatarUrl} alt='' />
					</div>
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<ProductList />,
	document.getElementById('content')
);