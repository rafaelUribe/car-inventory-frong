import { createBrowserRouter } from "react-router-dom";
// import Home from "./pages/Home";
import Error404 from "./pages/NotFound";
import BrandForm from './components/BrandForm';
import CarModelForm from './components/CarModelForm';
import CarVersionForm from './components/CarVersionForm';

import { 
    HOME, 
    ADD_BRAND,
    ADD_CAR_MODEL,
    ADD_CAR_VERSION
 } from "./constants";
import App from "./App";
// import SearchBar from "./components/SearchBAr";



export const router = createBrowserRouter([{
  path: HOME,
  element: <App />,
  errorElement: <Error404 />
},
{
    path: ADD_BRAND,
    element: <BrandForm />
},
{
    path: ADD_CAR_MODEL,
    element:<CarModelForm />
},
{
    path: ADD_CAR_VERSION,
    element: <CarVersionForm />
},
]);
