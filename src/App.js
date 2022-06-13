import { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import styled from "styled-components";

function Header(props) {
  return (
    <header className={props.className}>
      <h1>
        <a
          href="/"
          onClick={(evt) => {
            evt.preventDefault();
            props.onSelect();
          }}
        >
          Web
        </a>
      </h1>
    </header>
  );
}

// 이미 만들어진 Header컴포넌트에 style 적용하기
const HeaderStyled = styled(Header)`
  border-bottom: 1px solid gray;
`;

function Nav(props) {
  const list = props.data.map((e) => {
    return (
      <li key={e.id}>
        <a
          href={"/read/" + e.id}
          onClick={(evt) => {
            evt.preventDefault();
            props.onSelect(e.id);
          }}
        >
          {e.title}
        </a>
      </li>
    );
  });
  return (
    <nav>
      <ol>{list}</ol>
    </nav>
  );
}

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          const title = evt.target.title.value;
          const body = evt.target.body.value;
          props.onCreate(title, body); // onCreate에 title과 body를 넘겨서 호출한다.
        }}
      >
        <p>
          <input type="text" name="title" placeholder="title"></input>
        </p>
        <p>
          <textarea name="body" placeholder="body"></textarea>
        </p>
        <p>
          <input type="submit" value="Create"></input>
        </p>
      </form>
    </article>
  );
}

function App() {
  // topics를 useState로 만들기
  const [topics, setTopics] = useState([
    { id: 1, title: "html", body: "html is..." },
    { id: 2, title: "css", body: "css is..." },
    { id: 3, title: "js", body: "js is..." },
  ]);

  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  // id값을 별도로 설정
  const [nextId, setNextId] = useState(4); // 마지막 id의 다음 번호로 설정

  let content = null;

  if (mode === "WELCOME") {
    content = <Article title="Welcome" body="Hello, WEB"></Article>;
  } else if (mode === "READ") {
    const topic = topics.filter((e) => e.id === id)[0];
    console.log("topic", topic);
    content = <Article title={topic.title} body={topic.body}></Article>;
  } else if (mode === "CREATE") {
    content = (
      <Create
        onCreate={(title, body) => {
          const newTopic = { id: nextId, title, body }; // nextId=4
          const newTopics = [...topics];
          newTopics.push(newTopic);
          setTopics(newTopics);
          setId(nextId);
          setMode("READ");
          setNextId(nextId + 1); // id값을 올려줘야 다음 di값이 +1되어 중복되지 않는다. nextId=5
        }}
      ></Create>
    );
  }
  return (
    <div>
      <HeaderStyled
        onSelect={() => {
          setMode("WELCOME");
        }}
      ></HeaderStyled>
      <Nav
        data={topics}
        onSelect={(id) => {
          setMode("READ");
          setId(id);
        }}
      ></Nav>
      {content}
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button
          variant="outlined"
          onClick={() => {
            setMode("CREATE");
          }}
        >
          Create
        </Button>
        <Button variant="outlined">Update</Button>
      </ButtonGroup>
      <Button
        variant="outlined"
        onClick={() => {
          const newTopics = topics.filter((e) => {
            return e.id !== id;
          });
          // mode가 read이기 때문에 삭제된 topic을 읽으려고 해서 에러가 난다. -> mode를 WELCOME으로 바꿔주기
          setMode("WELCOME"); // 비동기적으로(순차x) 일어나기 때문에 이 두개의 순서가 바뀌어도 상관없다.
          setTopics(newTopics);
        }}
      >
        Delete
      </Button>
    </div>
  );
}

export default App;
