# 환경
- React
- Typescript
- Vite

# 참고사항
sockjs-client를 그냥 사용할 수 없어 .d.ts 파일에 추가 설정이 필요.
```ts
// vite-env.d.ts
 declare module 'sockjs-client/dist/sockjs' {
  export default (await import('sockjs-client')).default
}

// socket 사용 file, 현 프로젝트에선 App.tsx
// 기존 import
import SockJS from "sockjs-client";

// 변경된 import
import SockJS from "sockjs-client/dist/sockjs"
```


2. 
