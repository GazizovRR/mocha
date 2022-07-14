import NavBar from './NavBar'
import LeftMenu from './leftMenu'

const app = () => ({
    NavBar: () => ({...NavBar}),
    LeftMenu: () => ({...LeftMenu}),
})

export default app