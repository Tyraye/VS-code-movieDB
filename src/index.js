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
    return <div>SearchBar placeholder</div>;
  }
}

class FilmCategoryRow extends React.Component {
  render() {
    const film_id = this.props.film_id;

    return (
      <tr>
        <td>{film_id}</td>
        {/* <td>{title}</td>
        <td>{description}</td>
        <td>{release_year}</td>
        <td>{length}</td>
        <td>{rating}</td>
        <td>{language_id}</td>
        <td>{actor}</td> */}
      </tr>
    );
  }
}

class Package extends React.Component() {
  render() {
    return (
      <tr>
        <td>
          <td>{film_id}</td>
          <td>{title}</td>
          <td>{description}</td>
          <td>{release_year}</td>
          <td>{length}</td>
          <td>{rating}</td>
          <td>{language_id}</td>
          <td>{actor}</td>
        </td>
      </tr>
    );
  }
}

class FilmRow extends React.Component {
  componentDidMount() {
    fetch("http://52.207.221.141:8080/Home/AllFilms")
      .then((response) => response.json())
      .then((jsonData) => {
        const packages = jsonData.result;
        this.setState({
          top10results: [],
        });
      });
  }
  componentDidUpdate() {
    console.log(this.state.top10results);
  }

  render() {
    const film = this.props.film;
    console.log(this.props.film[0]);
    return (
      <tr>
        <td>{film.film_id}</td>
        <td>{film.title}</td>
        <td>{film.description}</td>
        <td>{film.release_year}</td>
        <td>{film.length}</td>
        <td>{film.rating}</td>
        <td>{film.language_id}</td>
        <td>{film.actor[0].actor_id}</td>
        <td>{film.actor[1].first_name}</td>
        <td>{film.actor[2].last_name}</td>
      </tr>
    );
  }
}

class FilmTable extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const rows = [];
    let lastCategory = null;

    this.props.films.forEach((film) => {
      if (film.title.indexOf(filterText) === -1) {
        return;
      }

      rows.push(<FilmRow film={film} key={film.film_id} />);
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
            <th>Lead actor ID</th>
            <th>First Name</th>
            <th>Last Name</th>
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
        hello
        <SearchBar />
        <FilmTable
          films={this.props.films}
          filterText={this.state.filterText}
        />
        <Buttons />
      </div>
    );
  }
}

const FILMS = [
  {
    film_id: 102,
    title: "BUBBLE GROSSE",
    description:
      "A Awe-Inspiring Panorama of a Crocodile And a Moose who must Confront a Girl in A Baloon",
    release_year: 2006,
    length: 60,
    rating: "R",
    language_id: 1,
    actor: [
      {
        actor_id: 158,
        first_name: "VIVIEN",
        last_name: "BASINGER",
      },
      {
        actor_id: 188,
        first_name: "ROCK",
        last_name: "DUKAKIS",
      },
      {
        actor_id: 170,
        first_name: "MENA",
        last_name: "HOPPER",
      },
    ],
  },
  {
    film_id: 107,
    title: "BUNCH MINDS",
    description:
      "A Emotional Story of a Feminist And a Feminist who must Escape a Pastry Chef in A MySQL Convention",
    release_year: 2006,
    length: 63,
    rating: "G",
    language_id: 1,
    actor: [
      {
        actor_id: 98,
        first_name: "CHRIS",
        last_name: "BRIDGES",
      },
      {
        actor_id: 139,
        first_name: "EWAN",
        last_name: "GOODING",
      },
      {
        actor_id: 167,
        first_name: "LAURENCE",
        last_name: "BULLOCK",
      },
      {
        actor_id: 142,
        first_name: "JADA",
        last_name: "RYDER",
      },
      {
        actor_id: 28,
        first_name: "WOODY",
        last_name: "HOFFMAN",
      },
      {
        actor_id: 40,
        first_name: "JOHNNY",
        last_name: "CAGE",
      },
      {
        actor_id: 130,
        first_name: "GRETA",
        last_name: "KEITEL",
      },
      {
        actor_id: 12,
        first_name: "KARL",
        last_name: "BERRY",
      },
    ],
  },
  {
    film_id: 345,
    title: "GABLES METROPOLIS",
    description:
      "A Fateful Display of a Cat And a Pioneer who must Challenge a Pastry Chef in A Baloon Factory",
    release_year: 2006,
    length: 161,
    rating: "PG",
    language_id: 1,
    actor: [
      {
        actor_id: 64,
        first_name: "RAY",
        last_name: "JOHANSSON",
      },
      {
        actor_id: 172,
        first_name: "GROUCHO",
        last_name: "WILLIAMS",
      },
      {
        actor_id: 106,
        first_name: "GROUCHO",
        last_name: "DUNST",
      },
      {
        actor_id: 128,
        first_name: "CATE",
        last_name: "MCQUEEN",
      },
      {
        actor_id: 16,
        first_name: "FRED",
        last_name: "COSTNER",
      },
      {
        actor_id: 132,
        first_name: "ADAM",
        last_name: "HOPPER",
      },
      {
        actor_id: 48,
        first_name: "FRANCES",
        last_name: "DAY-LEWIS",
      },
      {
        actor_id: 26,
        first_name: "RIP",
        last_name: "CRAWFORD",
      },
    ],
  },
];

ReactDOM.render(
  <FilterableFilmTable films={packages} />,
  document.getElementById("root")
);
