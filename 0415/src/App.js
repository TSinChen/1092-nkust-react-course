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
		return <h1>現在時間：{this.state.date.toLocaleTimeString()}</h1>;
	}
}

export default App;
