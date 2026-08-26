import {Header} from "@/common/components/Header/Header.tsx";
import {Routing} from "@/common/routing/Routing.tsx";
import {useAppSelector} from "@/common/hooks";
import {selectThemeMode} from "@/app/app-slice.ts";
import "./App.css"
import {Footer} from "@/common/components/Footer/Footer.tsx";

function App() {
    const themeMode = useAppSelector(selectThemeMode)
  return (
    <div className={themeMode}>
        <Header/>
        <Routing />
        <Footer/>
    </div>
  )
}

export default App
