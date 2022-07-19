const root = ReactDOM.createRoot(
    document.getElementById('root')
);


//  --------1
function start1() {
    // const element = <h1>Working</h1>; // JSX
    const element = (
        <h3>
            At work
        </h3>
    );
    root.render(element);
}


//  --------2
function _tick() {
    const element = (
        <div>
            <h3>At work</h3>
            <p>It is {new Date().toLocaleTimeString()}.</p>
        </div>
    );

    root.render(element);
}

function start2() {
    setInterval(_tick, 1000);
}


//  --------3
// If you meant to render a React component,
// start its name with an uppercase letter.
function FunctionComponent(props) {
    return <p>function component. props.value={props.value}</p>;
}

class ClassComponent extends React.Component {
    render() {
        return <p>class component. this.props.value={this.props.value}</p>;
    }
}

function start3() {
    root.render(
        <div>
            <FunctionComponent value='1'/>
            <ClassComponent value='2'/>
        </div>
    );
}


//  --------4
// All React components must act like pure functions with respect to their props.
// State allows React components to change their output over time in response
// to user actions, network responses, and anything else, without violating this rule.
class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({date: new Date()});
    }

    handleClick = () => {
        console.log('click');
    };

    handleClickN = (n) => {
        console.log('click ' + n);
    };

    render() {
        return (
            <div>
                <h3>At work</h3>
                <p>It is {this.state.date.toLocaleTimeString()}.</p>
                <br/>
                <button onClick={this.handleClick}>click</button>
                <br/>
                <button onClick={this.handleClickN.bind(this, "n")}>click n</button>
            </div>
        );
    }
}

function start4() {
    root.render(
        <div>
            <Clock/>
        </div>
    );
}


//  --------5
function UserGreeting(props) {
    return <h3>Welcome back!</h3>;
}

function GuestGreeting(props) {
    return <h3>Please sign up.</h3>
}

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting/>;
    }
    return <GuestGreeting/>;
}

function LoginButton(props) {
    return (
        <button onClick={props.onClick}>Login</button>
    );
}

function LogoutButton(props) {
    return (
        <button onClick={props.onClick}>Logout</button>
    );
}

class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isLoggedIn: false};
    }

    handleLoginClick = () => {
        this.setState({isLoggedIn: true});
    }

    handleLogoutClick = () => {
        this.setState({isLoggedIn: false});
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let button;
        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick}/>
        } else {
            button = <LoginButton onClick={this.handleLoginClick}/>
        }
        return (
            <div>
                <Greeting isLoggedIn={isLoggedIn}/>
                {button}
            </div>
        );
    }
}


function start5() {
    root.render(
        <LoginControl/>
    );
}

//  --------6
function Mailbox(props) {
    const unreadMessages = props.unreadMessages;
    return (
        <div>
            <h3>Hello!</h3>
            {
                unreadMessages.length > 0 &&
                <h4>You have {unreadMessages.length} unread messages</h4>
            }
        </div>
    );
}

function start6() {
    const unreadMessages = ['React', 'Re: React', 'Re:Re: React'];
    // const unreadMessages = [];
    root.render(
        <Mailbox unreadMessages={unreadMessages}/>
    );
}

//  --------7
function WarningBanner(props) {
    if (!props.warn) {
        return null;
    }

    return (
        <div className="warning">
            Warning!
        </div>
    );
}


class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showWarning: true};
    }

    handleToggleClick = () => {
        this.setState(state => ({
            showWarning: !state.showWarning
        }));
    }

    render() {
        return (
            <div>
                <WarningBanner warn={this.state.showWarning}/>
                <button onClick={this.handleToggleClick}>
                    {this.state.showWarning ? 'Hide' : 'Show'}
                </button>
            </div>
        );
    }
}

function start7() {
    root.render(
        <Page/>
    );
}


//  --------8
function ListItem(props) {
    return <li>{props.value}</li>;
}

function start8() {
    const numbers = [1, 2, 3, 4, 5, 6];
    const listItems = numbers.map((number) =>
        <ListItem value={number} key={number.toString()}/>);
    root.render(<div>
        {listItems}
    </div>);
}


//  --------9
class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            select: '',
            isGoing: true,
            numberOfGuests: 2,
        };
    }

    handleChange = (event) => {
        this.setState({name: event.target.value});
        // pay attention: async
        // setTimeout(() => {
        //     console.log(this.state.name);
        // }, 2000);
    }

    handleSelectChange = (event) => {
        this.setState({select: event.target.value});
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState(
            {[name]: value}
        );
    }
    handleSubmit = (event) => {
        alert('Name: ' + this.state.name +
            '\nFavorite taste: ' + this.state.select +
            '\nIs going: ' + this.state.isGoing +
            '\nNumber of guests: ' + this.state.numberOfGuests
        );
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <div>
                            <input type="text"
                                   value={this.state.name}
                                   onChange={this.handleChange}/>
                        </div>
                    </label>
                    <br/>

                    <label>
                        Select favorite taste:
                        <div>
                            <select
                                value={this.state.select}
                                onChange={this.handleSelectChange}>

                                <option value=""></option>
                                <option value="coconut">Coconut</option>
                                <option value="grapefruit">Grapefruit</option>
                                <option value="lime">Lime</option>
                                <option value="mango">Mango</option>
                            </select>
                        </div>
                    </label>
                    <br/>

                    <label>
                        Is going:
                        <input type="checkbox" name="isGoing" checked={this.state.isGoing}
                               onChange={this.handleInputChange}/>
                    </label>
                    <br/>

                    <label>
                        Number of guests:
                        <input type="number" name="numberOfGuests" checked={this.state.numberOfGuests}
                               onChange={this.handleInputChange}/>
                    </label>
                    <br/>

                    <input type="submit" value='submit'/>
                </form>
            </div>
        );
    }
}

function start9() {
    root.render(
        <NameForm/>
    );
}


//  --------10
const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit',
};

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>The water would boil.</p>
    }
    return <p>The water would not boil.</p>
}


class TemperatureInput extends React.Component {
    handleChange = (e) => {
        this.props.onTemperatureChange(e.target.value);
    }

    render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input
                    value={temperature}
                    onChange={this.handleChange}/>
            </fieldset>
        );
    }
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {temperature: '', scale: ''};
    }

    handleCelsiusChange = (temperature) => {
        this.setState({scale: 'c', temperature});
    }

    handleFahrenheitChange = (temperature) => {
        this.setState({scale: 'f', temperature});
    }


    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

        return (
            <div>
                <TemperatureInput
                    scale="c"
                    temperature={celsius}
                    onTemperatureChange={this.handleCelsiusChange}
                />
                <TemperatureInput
                    scale="f"
                    temperature={fahrenheit}
                    onTemperatureChange={this.handleFahrenheitChange}
                />
                <BoilingVerdict celsius={parseFloat(celsius)}/>
            </div>
        );
    }
}

function start10() {
    root.render(<Calculator/>);
}

//  --------11
function FancyBorder(props) {
    return (
        <div className={'FancyBorder FancyBorder-' + props.color}>
            {props.children}
        </div>
    );
}

function WelcomeDialog() {
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">
                Welcome
            </h1>
            <p className="Dialog-message">
                Thank you for visiting our spacecraft!
            </p>
        </FancyBorder>
    );
}

function Dialog(props) {
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">
                {props.title}
            </h1>
            <p className="Dialog-message">
                {props.message}
            </p>
        </FancyBorder>
    );
}

function Dialog2(props) {
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">
                {props.title}
            </h1>
            <p className="Dialog-message">
                {props.message}
            </p>
            {props.children}
        </FancyBorder>
    );
}

function WelcomeDialog2() {
    return (
        <Dialog
            title="Welcome"
            message="Thank you for visiting our spacecraft!"/>
    );
}

class SignUpDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {login: ''};
    }

    handleChange = (e) => {
        this.setState({login: e.target.value});
    }

    handleSignUp = () => {
        alert(`Welcome aboard, ${this.state.login}!`);
    }

    render() {
        return (
            <Dialog2 title="Mars Exploration Program"
                     message="How should we refer to you?">
                <input value={this.state.login}
                       onChange={this.handleChange}/>
                <button onClick={this.handleSignUp}>
                    Sign Up
                </button>
            </Dialog2>
        );
    }
}

function start11() {
    root.render(
        <div>
            <WelcomeDialog/>
            <hr/>
            <WelcomeDialog2/>
            <hr/>
            <SignUpDialog/>
        </div>
    );
}


//  --------12
const allProducts = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

function ProductRow(props) {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.price}</td>
        </tr>
    );
}

function ProductCategoryRow(props) {
    return (
        <tr>
            <th>{props.category}</th>
        </tr>
    );
}

class ProductTable extends React.Component {
    render() {
        const rows = [];
        const productMap = this.props.productMap;
        productMap.forEach((products, category) => {
            rows.push(
                <ProductCategoryRow key={category}
                                    category={category}/>
            );
            for (let i = 0; i < products.length; i++) {
                let product = products[i]
                rows.push(
                    <ProductRow key={product.name}
                                name={product.name}
                                price={product.price}/>
                );
            }
        })
        return (
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
        );
    }
}

class SearchBar extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <input type="text"
                           onChange={this.props.onSearchChange}
                    />
                </div>
                <div>
                    <input type="checkbox"
                           onChange={this.props.onSelectChange}
                    />
                    <small>Only show products in stock</small>
                </div>
            </div>
        );
    }
}

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inStockOnly: false,
            text: '',
        };
    }

    handleSearch = (e) => {
        this.setState({text: e.target.value});
    }

    handleSelect = () => {
        this.setState({
            inStockOnly: !this.state.inStockOnly,
        });
    }

    render() {
        let products = filterProducts(this.state.text, this.state.inStockOnly);
        let productMap = getProductMap(products)
        return (
            <div>
                <SearchBar
                    onSearchChange={this.handleSearch}
                    onSelectChange={this.handleSelect}
                />

                <ProductTable productMap={productMap}/>
            </div>
        );
    }
}

function filterProducts(text, inStockOnly) {
    let products = allProducts;
    if (inStockOnly) {
        products = products.filter(
            (product) => (product.stocked === inStockOnly)
        );
    }
    if (text.trim().length !== 0) {
        products = products.filter(
            (product) => (product.name.indexOf(text) !== -1)
        );
    }
    return products
}

function getProductMap(products) {
    let productMap = new Map();
    for (let i = 0; i < products.length; i++) {
        let product = products[i];
        let category = product.category;
        //
        let ps = [];
        if (productMap.has(category)) {
            ps = productMap.get(category);
        }
        ps.splice(-1, 0, product);
        productMap.set(category, ps);
    }
    return productMap;
}

function start12() {
    root.render(
        <FilterableProductTable/>
    );
}

// start
start12();