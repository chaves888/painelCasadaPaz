import { useEffect, useState } from "react";
import { LayoutDashboard } from "../../components/LayoutDashboard";
import { IToken } from "../../interfaces/token";
import { validaPermissao, verificaTokenExpirado } from "../../services/token";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface IUsuarios {
    id: number
    nome: string
    email: string
    permissoes: string
}

const deleteUsuario = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
        axios.delete(`http://localhost:8000/api/usuarios/${id}`)
            .then(() => {
                alert("Usuário excluído com sucesso!");
                fetchUsuarios(); // Atualiza a lista de usuários
            })
            .catch(error => {
                console.error("Erro ao excluir usuário:", error);
                alert("Ocorreu um erro ao tentar excluir o usuário.");
            });
    }
};

export default function Usuarios() {

    const navigate = useNavigate()

    const [usuarios, setUsuarios] = useState<Array<IUsuarios>>([])

    useEffect(() => {
        let lsToken = localStorage.getItem('americanos.token')

        let token: IToken | null = null

        if (typeof lsToken === 'string') {
            token = JSON.parse(lsToken)
        }

        if (!token || verificaTokenExpirado(token.accessToken)
         ) {
            navigate('/')
        }


        //trazer os usuarios do backend
        axios.get('http://localhost:8000/api/usuarios')
            .then((resposta) => {
                setUsuarios(resposta.data.data)
            })
            .catch((err) => {
                console.log(err)
            })


    }, [])

    return (
        <>
            <LayoutDashboard>

                <div
                    className="d-flex justify-content-between mt-3"
                >
                    <h1>Usuários</h1>
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => {
                            navigate('/usuarios/criar')
                        }}
                    >Adicionar</button>

                </div>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Email</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            usuarios.map((usuario, index) => {
                                return (
                                    <tr key={usuario.id}>
                                        <th>
                                            {usuario.id}
                                        </th>
                                        <td>{usuario.nome}</td>
                                        <td>{usuario.email}</td>
                                        <td>
                                            <button
                                                className="btn btn-warning"
                                                type="button"
                                                style={{
                                                    marginRight: 5
                                                }}
                                                onClick={() => {
                                                    navigate(`/usuarios/${usuario.id}`)
                                                }}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                type="button"
                                                onClick={() => {
                                                    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
                                                        axios.delete(`http://localhost:8000/api/usuarios/${usuario.id}`)
                                                            .then(() => {
                                                                alert("Usuário excluído com sucesso!");
                                                                navigate('/usuarios'); 
                                                            })
                                                            .catch((erro) => {
                                                                console.error(erro);
                                                                alert("Ocorreu um erro ao tentar excluir o usuário.");
                                                            });
                                                    }
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>

                </table>

            </LayoutDashboard>
        </>
    )
}