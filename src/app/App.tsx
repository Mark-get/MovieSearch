import {Header} from "@/common/components/Header/Header.tsx";
import {Routing} from "@/common/routing/Routing.tsx";
import {useAppSelector} from "@/common/hooks";
import {selectThemeMode} from "@/app/app-slice.ts";
import "./App.css"

function App() {
    const themeMode = useAppSelector(selectThemeMode)
  return (
    <div className={themeMode}>
        <Header/>
        <Routing />
    </div>
  )
}

export default App
