(function() {
	'use strict';

	const Quiz = React.createClass({
		getInitialState: function() {
			return this.props.data.selectGame();
		},
		propTypes: {
			data: React.PropTypes.array.isRequired
		},
		render: function () {
			return  <div>
						<div className="row">
							<div className="col-md-4">
								<img src={ this.state.author.imageUrl } className="authorimage col-md-3" />
							</div>
							<div className="col-md-7">
								{this.state.books.map(function (b) {
									return <Book key={b} title={b} />
								}, this)}
							</div>
							<div className="col-md-1">

							</div>
		 				</div>
					</div>;
		}
	});

	const Book = React.createClass({
		propTypes: {
			title: React.PropTypes.string.isRequired
		},
		render: function () {
			return <div className="answer"><h4>{ this.props.title }</h4></div>;
		}
	});

	const data = [
        {
            name: 'Mark Twain', 
            imageUrl: 'images/authors/marktwain.jpg',
            books: ['The Adventures of Huckleberry Finn']
        },
        {
            name: 'Joseph Conrad',
            imageUrl: 'images/authors/josephconrad.png',
            books: ['Heart of Darkness']
        },
        {
            name: 'J.K. Rowling',
            imageUrl: 'images/authors/jkrowling.jpg',
            imageSource: 'Wikimedia Commons',
            imageAttribution: 'Daniel Ogren',
            books: ['Harry Potter and the Sorcerers Stone']
        },
        {
            name: 'Stephen King',
            imageUrl: 'images/authors/stephenking.jpg',
            imageSource: 'Wikimedia Commons',
            imageAttribution: 'Pinguino',
            books: ['The Shining','IT']
        },
        {
            name: 'Charles Dickens',
            imageUrl: 'images/authors/charlesdickens.jpg',
            imageSource: 'Wikimedia Commons',
            books: ['David Copperfield', 'A Tale of Two Cities']
        },
        {
            name: 'William Shakespeare',
            imageUrl: 'images/authors/williamshakespeare.jpg',
            imageSource: 'Wikimedia Commons',
            books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
        }
    ];

    data.selectGame = function() {
    	var books = _.shuffle(this.reduce(function (p, c, i) {
    		return p.concat(c.books);
    	}, [])).slice(0, 4);

    	let answer = books[_.random(books.length-1)];

    	return {
    		books: books,
    		author: _.find(this, function(author) {
    			return author.books.some(function(title) {
    				return title === answer;
    			})
    		} )
    	}
    };

	ReactDOM.render(<Quiz data={ data }/>,
	 				document.getElementById('app'));
}());
