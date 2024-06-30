import { useEffect, useRef } from "react";
import "./App.css";
import WebApp from "@twa-dev/sdk";
import { useUserData } from "./store";
import { BottomNavigation } from "./widgets/BottomNavigation";
import TgAppRoutes from "./routes/tgAppRoutes/ui/TgAppRoutes";
import bgMain from "./assets/bg.mp4";
import useClicker from "./store/useClicker";

const sendData = (count: number, energy: number) => {
  WebApp.CloudStorage.setItem("count", String(count));
  WebApp.CloudStorage.setItem("energy", String(energy));
}

function App() {
  const userDataInit = useUserData((state) => state.init);
  const clickerInit = useClicker(state => state.init);
  const clickerIsLoading = useClicker(state => state.isLoading);
  const {count, energy} = useClicker(state => state);

  const videoRef2 = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    window.addEventListener('beforeunload', () => sendData(count, energy));

    return () => {
      window.removeEventListener('beforeunload', () => sendData(count, energy));
    };
  }, [count, energy]);

  useEffect(() => {
    clickerInit();
    userDataInit(WebApp.initDataUnsafe.user ?? ({} as any));
  }, []);

  if (clickerIsLoading) {
    return (
    <div>
      Loading...
    </div>
    );
  }

  return (
    <>
      <div className="filter"/>
      {/* <video
        ref={videoRef1}
        className='video'
        playsInline
        muted
        onEnded={handleEnded}
      >
      <source src={bgInit} type="video/mp4" />
      Your browser does not support the video tag.
    </video> */}
    <video
        ref={videoRef2}
        className='video'
        playsInline
        muted 
        autoPlay
        // style={{ display: 'none' }}
        loop
      >
      <source src={bgMain} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
      {/* <video className='video' playsInline autoPlay loop muted>
        <source src={bg} type='video/mp4' />
      </video> */}
      {/* <Header /> */}
      <TgAppRoutes />
      <BottomNavigation />
      {/* <div id="viewport"></div>
      <div id="viewport-params-size"></div>
      <div id="viewport-params-expand"></div> */}
    </>
  );
}

export default App;
