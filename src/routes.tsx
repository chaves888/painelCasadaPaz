import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Usuarios from './pages/Usuarios'
import GerenciarUsuarios from './pages/Usuarios/Gerenciar'
import Galeria from './pages/Galeria'
import Voluntarios from './pages/Voluntarios'
import GerenciarVoluntarios from './pages/Voluntarios/gerenciar/gerenciarVoluntarios'
import GerenciarEvento from './pages/Galeria/gerenciarEvento'
import VisualizarFotos from './pages/Galeria/vizualizarFotos'
import AdicionarFotos from './pages/Galeria/adicionarFotos'

export const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/' // caminho 
                    element={<Login />} // elemento a ser renderizado
                />

                <Route
                    path='/dashboard'
                    element={<Dashboard />}
                />

                <Route
                    path='/usuarios'
                    element={<Usuarios />}
                />

                <Route
                    path='/usuarios/:id'
                    element={<GerenciarUsuarios />}
                />

                <Route
                    path='/voluntarios'
                    element={<Voluntarios />}
                />

                <Route
                    path='/voluntarios/criar'
                    element={<GerenciarVoluntarios />}
                />

                <Route
                    path='/voluntarios/editar/:id'
                    element={<GerenciarVoluntarios />}
                />

                <Route
                    path='/galeria'
                    element={<Galeria />}
                />

                <Route
                    path='/galeria/criar'
                    element={<GerenciarEvento />}
                />

                <Route 
                    path='/galeria/editar/:id' 
                    element={<GerenciarEvento />} 
                />

                <Route 
                    path='/galeria/:id/fotos' 
                    element={<VisualizarFotos />} 
                />

                <Route 
                    path='/galeria/:id/fotos/adicionar' 
                    element={<AdicionarFotos />} 
                />

            </Routes>
        </BrowserRouter>
    )
}
