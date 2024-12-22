import {BrowserRouter , Routes ,Route} from "react-router-dom"
import Home from "./pages/Home"
import AlbumDetails from "./pages/AlbumDetails"
import { Album } from "@mui/icons-material"
export default function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />}  />
        <Route path="album" element={<AlbumDetails />}  />
    </Routes>
    </BrowserRouter>
  )
}