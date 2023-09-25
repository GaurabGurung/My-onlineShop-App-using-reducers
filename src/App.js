import { Routes, Route } from 'react-router-dom'
import Navigation from './routes/navigation/navigation.component';
import Home from './routes/Home/home.components'
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/Shop/shop.component';
import CheckOut from './routes/check-out/check-out.component';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={ <Navigation/> }>
        <Route index element={ <Home/> }/>
        <Route path='/Shop/*' element={ <Shop/>}/>
        <Route path='/auth' element={ <Authentication/>}/>
        <Route path='/checkout' element= {<CheckOut/>}/>
      </Route>
    </Routes>
  )
}

export default App;
