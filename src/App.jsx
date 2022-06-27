import {
  useContext,
  useEffect,
  useState,
  useRef,
  useReducer,
  useMemo,
  useCallback,
} from "react";
import "./App.css";
import { InfoContext } from "./main";
import { SomeChild } from "./SomeChild";
import { useLocalStorage } from "./useLocalStorage";

function App() {
  // useState
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };
  // useEffect
  useEffect(() => {
    console.log("Hello Hooks");
  }, [count]); // 第2引数が変更されるたびに呼ばれる, 空配列の場合は最初に1度だけ呼ばれる

  // useContext
  const info = useContext(InfoContext);

  //useRef
  const ref = useRef();
  const handleRef = () => {
    console.log(ref.current.value);
  };

  //useReducer
  const reducer = (state, action) => {
    switch (action.type) {
      case "increment":
        return state + 1;
      case "decrement":
        return state - 1;
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, 0);

  // useMemo
  const [count01, setCount01] = useState(0);
  const [count02, setCount02] = useState(0);
  const square = useMemo(() => {
    let i = 0;
    //重い処理
    while (i < 20000) {
      i++;
    }
    return count02 * count02;
  }, [count02]);

  // useCallBack
  const [counter, setCounter] = useState(0);
  const showCount = useCallback(() => {
    alert("重い処理を実行中");
  }, [counter]);

  // custom Hooks
  // ローカルストレージに値を保存する関数
  const [age, setAge] = useLocalStorage("age", 24);

  return (
    <div className="App">
      <h1>useState</h1>
      <h3>状態が変更したら再レンダリングする</h3>
      <h1>useEffect</h1>
      <h3>変数が変更したら呼ばれるコールバック関数</h3>
      <button onClick={handleClick}>plus</button>
      <p>{count}</p>
      <hr />
      <h1>useContext</h1>
      <h3>propsのバケツリレーを避け, 親コンポーネントから直接データを渡す</h3>
      <p>
        Name:{info.name}(id:{info.id})
      </p>
      <hr />
      <h1>useRef</h1>
      <h3>Ref属性を付けた値・属性を参照できる</h3>
      <input type="text" ref={ref} />
      <button onClick={handleRef}>useRef</button>
      <hr />
      <h1>useReducer</h1>
      <h3>現在の状態からActionされた状態に遷移させる(Redux的)</h3>
      <p>Count: {state}</p>
      <button onClick={() => dispatch({ type: "increment" })}>Plus</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Minus</button>
      <hr />
      <h1>useMemo</h1>
      <h3>値をメモリに保存してその値を使う</h3>
      <div>Count01: {count01}</div>
      <div>Count02: {count02}</div>
      <div>result: {square}</div>
      {/* Add01ボタンを押したときはmemo化した値を呼び出すので速い */}
      <button onClick={() => setCount01(count01 + 1)}>Add01</button>
      <button onClick={() => setCount02(count02 + 1)}>Add02_heavy</button>
      <hr />
      <h1>useCallBack</h1>
      <h3>関数のメモ化</h3>
      <SomeChild showCount={showCount}></SomeChild>
      <hr />
      <h1>CustomHooks</h1>
      <p>{age}</p>
      <button onClick={() => setAge(80)}>Set Age</button>
    </div>
  );
}

export default App;
