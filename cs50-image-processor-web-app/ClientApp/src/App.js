import {BrowserRouter, Route, Routes} from "react-router-dom";
// PAGES
import Index from "./pages/Index";
import ConvertTo from "./pages/convert-to";
import Type from "./pages/type";
// COMPONENTS
import Layout from "./components/layout";
// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Layout>
                    {/*handle routes*/}
                    <Routes>
                        <Route path="/" element={<Index/>}/>
                        <Route path="/convert-to" element={<ConvertTo/>}>
                            <Route path="/convert-to/:slug" element={<Type/>}/>
                        </Route>
                    </Routes>
                </Layout>
            </BrowserRouter>
        </div>
    )
}

export default App;
