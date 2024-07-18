import React, { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { CompatClient, Stomp } from "@stomp/stompjs";
// import SockJS from "sockjs-client";
import SockJS from "sockjs-client/dist/sockjs"

function App() {
  const [count, setCount] = useState(0)

  // Ref를 사용해 불필요한 렌더링이 되지 않도록 합니다.
  const client = useRef<CompatClient>({});

  // 소켓 연결
  const connect = () => {

    client.current = Stomp.over(() => {
      // 백엔드에서 정의된 SockJS의 endpoint로 연결합니다.
      const socket = new SockJS('http://localhost:8888/websocket');
      return socket;
    });
    client.current.connect(
      {},
      () => {
        // callback 함수로 sub을 해줍니다.
        client.current.subscribe(
          '/cafe/sub/09f311ff-00dd-41f4-aad7-4346c4126257/order-alert',
          (message) => {

            console.log(message.body);
          },
          {
            //header
          }
        );
      }
    );
  };

  const sendTest = () => {
    client.current.send(
      "/cafe/pub/09f311ff-00dd-41f4-aad7-4346c4126257/order-alert",
      {}, // 헤더가 없어도 {}를 넣어줘야 합니다.
      JSON.stringify({
        message: "hi",
      })
    );
  };

  useEffect(() => {
    connect()
  }, []);

  return (
    <React.StrictMode>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <button onClick={sendTest}>메세지 보내기</button>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </React.StrictMode>
  )
}

export default App
