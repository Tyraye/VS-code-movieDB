import { render } from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Button from "react-bootstrap/Button";
import axios from "axios";

class DatabasePackages extends React.Component {
  render() {
    return null;
  }
}

class Buttons extends React.Component {
  render() {
    return (
      <>
        <Button variant="primary">Primary</Button>{" "}
        <Button variant="secondary">Secondary</Button>{" "}
        <Button variant="success">Success</Button>{" "}
        <Button variant="warning">Warning</Button>{" "}
        <Button variant="danger">Danger</Button>{" "}
        <Button variant="info">Info</Button>{" "}
        <Button variant="light">Light</Button>{" "}
        <Button variant="dark">Dark</Button>{" "}
        <Button variant="link">Link</Button>
      </>
    );
  }
}

class SearchBar extends React.Component {
  render() {
    const filterText = this.props.filterText;
    return (
      <form>
        <input
          type="text"
          placeholder="Search by Film name....."
          value={filterText}
          onChange={(e) => this.props.onFilterTextChange(e.target.value)}
        />
      </form>
    );
  }
}

class LanguageRow extends React.Component {
  render() {
    const languageData = this.props.languageInfo;

    return (
      <tr>
        <td>{languageData.language_id}</td>
        <td>{languageData.name}</td>
      </tr>
    );
  }
}

class FilmRow extends React.Component {
  render() {
    const filmData = this.props.filmInfo;

    return (
      <tr>
        <td>{filmData.film_id}</td>
        <td>{filmData.title}</td>
        <td>{filmData.description}</td>
        <td>{filmData.release_year}</td>
        <td>{filmData.length}</td>
        <td>{filmData.rating}</td>
        <td>{filmData.language_id}</td>
      </tr>
    );
  }
}

class AddLanguage extends React.Component {
  render() {
    return null;
  }
}

class LanguageTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { languageDataFromServer: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/Home/AllLanguages")
      .then((response) =>
        this.setState({ languageDataFromServer: response.data })
      );
  }

  render() {
    //const filterText = this.props.filterText.toLowerCase();
    const language = this.state.languageDataFromServer;
    const rows = [];
    //let lastCategory = null;

    this.state.languageDataFromServer.forEach((lang) => {
      // if (lang.name.toLowerCase().indexOf(filterText) === -1) {
      //   return;
      // }

      rows.push(<LanguageRow languageInfo={lang} key={lang.language_id} />);
    });

    return (
      <table class="left">
        <thead>
          <tr>
            <th>Language ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}
////////////// FILMS /////////////
class FilmTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { filmDataFromServer: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/Home/AllFilms")
      .then((response) => this.setState({ filmDataFromServer: response.data }));
  }

  render() {
    const filterText = this.props.filterText.toLowerCase();
    const movie = this.state.filmDataFromServer;
    const rows = [];
    //let lastCategory = null;

    this.state.filmDataFromServer.forEach((movie) => {
      if (movie.title.toLowerCase().indexOf(filterText) === -1) {
        return;
      }

      rows.push(<FilmRow filmInfo={movie} key={movie.film_id} />);

      // lastCategory = film.actor.last_name;

      // if (film.film_id !== lastCategory) {
      //   rows.push(
      //     <FilmCategoryRow film_id={film.film_id} key={film.film_id} />
      //   );
      // }
    });

    return (
      <table class="center">
        <thead>
          <tr>
            <th>Film ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Release Year</th>
            <th>Length</th>
            <th>Rating</th>
            <th>Language ID</th>
            {/* <th>Lead actor ID</th>
            <th>First Name</th>
            <th>Last Name</th> */}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class FilterableFilmTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(FT) {
    this.setState({
      filterText: FT,
    });
  }

  render() {
    return (
      <div>
        <img
          class="logo"
          src={
            "https://www.100daysofrealfood.com/wp-content/uploads/2011/06/popcorn1-1163x1536.jpg"
          }
        />
        <br />
        Welcome to the Movie database
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextChange={this.handleFilterTextChange}
        />
        <Buttons />
        <LanguageTable language={this.props.language} />
        <FilmTable
          films={this.props.films}
          filterText={this.state.filterText}
        />
      </div>
    );
  }
}

ReactDOM.render(<FilterableFilmTable />, document.getElementById("root"));
