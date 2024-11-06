import React, { useEffect, useState } from 'react';
import { LayoutDashboard } from '../../components/LayoutDashboard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';

interface IVoluntario {
    id: number;
    voluntario: string;
}

const Voluntarios: React.FC = () => {
    const navigate = useNavigate();
    const [voluntarios, setVoluntarios] = useState<Array<IVoluntario>>([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/voluntarios')
            .then((resposta) => {
                setVoluntarios(resposta.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleDelete = (id: number) => {
        axios.delete(`http://localhost:8000/api/voluntarios/${id}`)
            .then(() => {
                setVoluntarios(voluntarios.filter(voluntario => voluntario.id !== id));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <LayoutDashboard>
            <div className="d-flex justify-content-between mt-3">
                <h1>Voluntários</h1>
                <Button variant="success" onClick={() => navigate('/voluntarios/criar')}>
                    Adicionar
                </Button>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Cargo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {voluntarios.map((voluntario, index) => (
                        <tr key={voluntario.id}>
                            <td>{index + 1}</td>
                            <td>{voluntario.voluntario}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    onClick={() => navigate(`/voluntarios/editar/${voluntario.id}`)}
                                >
                                    Editar
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(voluntario.id)}
                                    className="ml-2"
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </LayoutDashboard>
    );
};

export default Voluntarios;
