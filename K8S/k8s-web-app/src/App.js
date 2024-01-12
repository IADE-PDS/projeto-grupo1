import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/home/home';
import Login from './pages/login/login';
import Registro from './pages/registro/registro';
import Products from './pages/products/products';
import LocationPage from './pages/locations/locations';
import Carrinho from './pages/carrinho/carrinho';
import ProductDetails from './pages/productDetails/productdetails';
import CheckoutSucess from './pages/stripe/checkoutSucess';
import ShopContextProvider from './context/shop-context';
import About from './pages/About us/about';
import Member from './pages/personal/member-area';



function App() {
  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          <Routes>
            <Route path='/'element={<Home></Home>}></Route>
            <Route path='/Registro' element={<Registro></Registro>}></Route>
            <Route path='/Login' element={<Login></Login>}></Route>
            <Route path='/About' element={<About></About>}></Route>
            <Route path='/Products' element={<Products></Products>}></Route>
            <Route path='/LocationStore' element={<LocationPage></LocationPage>}></Route>
            <Route path='/Carrinho' element={<Carrinho></Carrinho>}></Route>
            <Route path='/Produto/:productId' element={<ProductDetails></ProductDetails>}></Route>
            <Route path='/checkout-sucess' element={<CheckoutSucess></CheckoutSucess>}></Route>
            <Route path='/member' element={<Member></Member>}></Route>
          </Routes>
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;
