import { render } from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Button from "react-bootstrap/Button";
import axios from "axios";

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

class ActorRow extends React.Component {
  render() {
    const actorData = this.props.actorInfo;

    return (
      <tr>
        <td>{actorData.actor_id}</td>
        <td>{actorData.first_name}</td>
        <td>{actorData.last_name}</td>
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

////// POST INTO LANGUAGES ////////
class AddLanguage extends React.Component {
  state = {
    name: "",
  };

  onNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/Home/AddLanguages?name=" + this.state.name)

      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <form className="addLangForm" onSubmit={this.handleSubmit}>
          <br></br>
          <input
            placeholder="Language Name"
            value={this.state.name}
            onChange={this.onNameChange}
            required
          />
          <br></br>
          <button type="submit">Add Language</button>
        </form>
        <br></br>
      </div>
    );
  }
}

////// Delete a Language ////////
class DeleteLanguage extends React.Component {
  state = {
    language_id: "",
  };

  handleChange = (event) => {
    this.setState({ language_id: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    axios
      .delete(
        `http://localhost:8080/Home/DeleteLanguage/${this.state.language_id}`
      )
      .then((response) => {
        console.log(response);
        console.log(response.data);
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Language ID:
            <input
              type="text"
              name="Language ID"
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Delete Language</button>
        </form>
      </div>
    );
  }
}

/////// PUT request /////////
class UpdateAnActor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actor_id: "",
      first_name: "",
      last_name: "",
      updatedAt: null,
    };
  }

  onActorIDChange = (e) => {
    this.setState({
      actor_id: e.target.value,
    });
  };
  onFirstNameChange = (e) => {
    this.setState({
      first_name: e.target.value,
    });
  };
  onLastNameChange = (e) => {
    this.setState({
      last_name: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(
        "http://localhost:8080/Home/UpdateActor/" +
          this.state.actor_id +
          "/?first_name=" +
          this.state.first_name +
          "&last_name=" +
          this.state.last_name
      )
      // Error handling
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Actor ID"
            value={this.state.actor_id}
            onChange={this.onActorIDChange}
            required
          />
          <input
            placeholder="First Name"
            value={this.state.first_name}
            onChange={this.onFirstNameChange}
            required
          />
          <input
            placeholder="Last Name"
            value={this.state.last_name}
            onChange={this.onLastNameChange}
            required
          />

          <br></br>

          <button type="submit">Update Actors</button>
        </form>
      </div>
    );
  }
}

///// Language table //////
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
    const language = this.state.languageDataFromServer;
    const rows = [];

    this.state.languageDataFromServer.forEach((lang) => {
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
////// Actor Table ///////
class ActorTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { actorDataFromServer: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/Home/AllActors")
      .then((response) =>
        this.setState({ actorDataFromServer: response.data })
      );
  }
  render() {
    const language = this.state.actorDataFromServer;
    const rows = [];

    this.state.actorDataFromServer.forEach((actor) => {
      rows.push(<ActorRow actorInfo={actor} key={actor.actor_id} />);
    });
    return (
      <table class="left">
        <thead>
          <tr>
            <th>Actor ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}
////////////// FILMS TABLE DON'T TOUCH UNTIL AWS SERVER CHANGE /////////////
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

    this.state.filmDataFromServer.forEach((movie) => {
      if (movie.title.toLowerCase().indexOf(filterText) === -1) {
        return;
      }

      rows.push(<FilmRow filmInfo={movie} key={movie.film_id} />);
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
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class FilterableTables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
    };
    this.handleAddLanguageText = this.handleAddLanguageText.bind(this);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleAddLanguageText(AL) {
    this.setState({
      addLanguageText: AL,
    });
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
        Welcome to the Movie database!
        <br />
        Add a Language into the database below and we will add it to Movies.
        <br />
        <AddLanguage />
        <DeleteLanguage />
        <LanguageTable language={this.props.language} />
        <br></br>
        <UpdateAnActor />
        <br></br>
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextChange={this.handleFilterTextChange}
        />
        <FilmTable
          films={this.props.films}
          filterText={this.state.filterText}
        />
        <br></br>
        <ActorTable />
      </div>
    );
  }
}

ReactDOM.render(<FilterableTables />, document.getElementById("root"));
