import { useEffect } from "react";
import { LayoutDashboard } from "../../components/LayoutDashboard";
import { IToken } from "../../interfaces/token";
import { verificaTokenExpirado } from "../../services/token";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Dashboard() {
    const navigate = useNavigate();

    useEffect(() => {
        let lsToken = localStorage.getItem('americanos.token');

        let token: IToken | null = null;

        if (typeof lsToken === 'string') {
            token = JSON.parse(lsToken);
        }

        if (!token || verificaTokenExpirado(token.accessToken)) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <LayoutDashboard>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-center mb-4">Painel de Controle - Casa da Paz</h1>
                        <p className="text-center">Bem-vindo ao painel de controle do site Casa da Paz. Aqui você pode atualizar e gerenciar todo o conteúdo do site, garantindo que as informações estejam sempre atualizadas e relevantes para os visitantes. Aqui você pode realizar:</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Atualização de necessidades de voluntáriados</h5>
                                <p className="card-text">Gerencie as vagas que necessitam de voluntários no momento.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Gerenciamento de usuários e permissões</h5>
                                <p className="card-text">Controle os usuários e suas permissões de acesso ao site.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutDashboard>
    );
}
