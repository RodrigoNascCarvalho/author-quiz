(function() {
	'use strict';

	const Quiz = React.createClass({
		getInitialState: function() {
			return _.extend({
				bgClass: 'neutral',
				showContinue: false,
			}, this.props.data.selectGame(this.props.configuredAnswer));
		},
		propTypes: {
			data: React.PropTypes.array.isRequired
		},
		handleBookSelected: function (title) {
			let isCorrect = this.state.checkAnswer(title);
			this.setState({
				bgClass: isCorrect ? 'pass' : 'fail',
				showContinue: isCorrect
			});
		},
		handleAddGame: function() {
			routie('add');
		},
		handleContinue: function () {
			this.setState(this.getInitialState()); 
		},
		render: function () {
			return  <div>
						<div className="row">
							<div className="col-md-2">
								<img src={ this.state.author.imageUrl } className="authorimage col-md-3" />
							</div>
							<div className="col-md-7">
								{this.state.books.map(function (b) {
									return <Book onBookSelected={this.handleBookSelected} key={b} title={b} />
								}, this)}
							</div>
							<div className={"col-md-1 " + this.state.bgClass}></div>
		 				</div>
						{this.state.showContinue ? (
							<div className="row">
								<div className="col-md-12">
									<input onClick={this.handleContinue} type="button" className="btn btn-default" value="Continue" />
								</div>
							</div>) : <span/>}		
						<div className="row">
							<div className="col-md-12">
								<input onClick={this.handleAddGame} id="addGameButton" type="button" value="Add Game" className="btn"/>
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
			return <div className="answer" onClick={this.handleClick}>
						<h4>
							{ this.props.title }
						</h4>
					</div>;
		},
		handleClick: function() {
			this.props.onBookSelected(this.props.title);
		}
	});

	let AddGameForm = React.createClass({
		propTypes: {
			onGameFormSubmitted: React.PropTypes.func.isRequired
		},
		handleSubmit: function() {
			this.props.onGameFormSubmitted(getRefs(this));
			return false;
		},
		render: function() {
			return <div className="row">
						<div className="col-md-offset-2 col-md-6">
							<h1>Add Game</h1>
							<form role="form" onSubmit={this.handleSubmit}>
								<div className="form-group">
									<input ref="imageUrl" type="text" className="form-control" placeholder="Image Url"/>
 								</div>
								<div className="form-group">
									<input ref="answer1" type="text" className="form-control" placeholder="Answer 1"/>
 								</div>
								<div className="form-group">
									<input ref="answer2" type="text" className="form-control" placeholder="Answer 2"/>
 								</div>
 								<div className="form-group">
									<input ref="answer3" type="text" className="form-control" placeholder="Answer 3"/>
 								</div>
								<div className="form-group">
									<input ref="answer4" type="text" className="form-control" placeholder="Answer 4"/>
 								</div>
 								<div className="form-group">
 									<input ref="correctAnswer" type="text" className="form-control" placeholder="Correct Answer"/>
 								</div>
 								<button type="submit" className="btn">Submit</button>
							</form>
						</div>
					</div>;	
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

    let selectGame = function(configuredAnswer) {
    	var books = _.shuffle(this.reduce(function (p, c, i) {
    		return p.concat(c.books);
    	}, [])).slice(0, 4);

    	let answer = configuredAnswer ? configuredAnswer : books[_.random(books.length-1)];

    	return {
    		books: books,
    		author: _.find(this, function(author) {
    			return author.books.some(function(title) {
    				return title === answer;
    			})
    		}),
    		checkAnswer: function(title) {
    			return this.author.books.some(function (t) {
		    		return t === title;
		    	});
    		}
    	}
    };

    data.selectGame = selectGame;

    function handleAddGameFormSubmitted(data) {
    	var quizData = [{
	    		imageUrl: data.imageUrl,
	    		books: [data.answer1]
    		},
    		{
	    		imageUrl: data.imageUrl,
	    		books: [data.answer2]
    		},
    		{
	    		imageUrl: data.imageUrl,
	    		books: [data.answer3]
    		},
    		{
	    		imageUrl: data.imageUrl,
	    		books: [data.answer4]
    		}];

    	quizData.selectGame = selectGame;

    	ReactDOM.render(<Quiz data={quizData} configuredAnswer={data.correctAnswer}/>,
    				document.getElementById('app'));
    }

    function getRefs(component) {
    	let result = {};
    	Object.keys(component.refs).forEach(function(refName) {
    		result[refName] = ReactDOM.findDOMNode(component.refs[refName]).value;
    	});
    	return result;
    }

    routie({
    	'': function() {
			ReactDOM.render(<Quiz data={ data }/>,
			 				document.getElementById('app'));    		
    	},
    	'add': function() {
    		ReactDOM.render(<AddGameForm onGameFormSubmitted={handleAddGameFormSubmitted}/>, 
    						document.getElementById('app'));
    	}
    });

}());
