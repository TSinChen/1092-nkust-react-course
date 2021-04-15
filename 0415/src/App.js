import React from "react";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date: new Date(),
		};
	}

	componentDidMount() {
		this.timerID = setInterval(
			() =>
				this.setState({
					date: new Date(),
				}),
			1000
		);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	render() {
		return <div>{this.state.date.toLocaleTimeString()}</div>;
	}
}

export default App;
