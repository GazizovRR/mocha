import MainPage from './mainPage'
import CurrentPage from './currentPage'
import CategoryPage from './categoryPage'
import NavBar from '../elements/NavBar'
import LeftMenu from '../elements/leftMenu'

const app = () => ({
    Main: () => ({...MainPage}),
    Home: () => ({...CurrentPage}),
    Category: () => ({...CategoryPage}),
    NavBar: () => ({...NavBar}),
    LeftMenu: () => ({...LeftMenu})
})

export default app