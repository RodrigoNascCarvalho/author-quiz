(function() {
	'use strict';

	const booksList = ['The Lord of the Rings', 'Star Wars Legacy'];

	const Quiz = React.createClass({
		propTypes: {
			books: React.PropTypes.array.isRequired
		},
		render: function () {
			return <div>{this.props.books.map(function (book) {
				return <Book title={book}/>;
			})}</div>;
		}
	});

	const Book = React.createClass({
		propTypes: {
			title: React.PropTypes.string.isRequired
		},
		render: function () {
			return <div><h4>{ this.props.title }</h4></div>;
		}
	});

	ReactDOM.render(<Quiz books={ booksList }/>,
	 				document.getElementById('app'));
}());
