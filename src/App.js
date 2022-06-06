import logo from "./logo.svg";
import "./App.css";

// 사용자 정의 태그 만들기
// jsx라는 문법이다. js를 확장한 문법. 사용자 정의 태그를 만들 때 사용
// js를 일부 수정해서 컴포넌트를 만들기 편하게 만든 문법
// create-react-app을 사용하면 jsx문법을 사용한 것.
function Header() {
  return (
    <header>
      <h1>
        <a href="/">Web</a>
      </h1>
    </header>
  );
}

function Nav() {
  return (
    <nav>
      <ol>
        <li>
          <a href="/read/1">html</a>
        </li>
        <li>
          <a href="/read/2">css</a>
        </li>
      </ol>
    </nav>
  );
}

function Aticle() {
  return (
    <article>
      <h2>Welcome</h2>
      Hello, WEB!
    </article>
  );
}

function App() {
  return (
    <div>
      <Header></Header>
      <Nav></Nav>
      <Aticle></Aticle>
    </div>
  );
}

export default App;
