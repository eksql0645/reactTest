import logo from "./logo.svg";
import "./App.css";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

function Header() {
  return (
    <header>
      <h1>
        <a href="/">Web</a>
      </h1>
    </header>
  );
}

function Nav(props) {
  const list = props.data.map((e) => {
    return (
      <li key={e.id}>
        <a href={"/read/" + e.id}>{e.title}</a>
      </li>
    );
  });
  return (
    <nav>
      <ol>{list}</ol>
    </nav>
  );
}

function Aticle(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

function App() {
  const topics = [
    { id: 1, title: "html", body: "html is..." },
    { id: 2, title: "css", body: "css is..." },
    { id: 3, title: "js", body: "js is..." },
  ];
  return (
    <div>
      <Header></Header>
      <Nav data={topics}></Nav>
      <Aticle title="Welcome" body="Hello, WEB"></Aticle>
      <Aticle title="HTML" body="HTML is..."></Aticle>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button variant="outlined">Create</Button>
        <Button variant="outlined">Update</Button>
      </ButtonGroup>
      <Button variant="outlined">Delete</Button>
    </div>
  );
}

export default App;
