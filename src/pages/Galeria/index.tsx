import React, { useEffect, useState } from 'react';
import { LayoutDashboard } from '../../components/LayoutDashboard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';

interface IEvento {
    id: number;
    nome: string;
    descricao: string;
}

const Galeria: React.FC = () => {
    const navigate = useNavigate();
    const [eventos, setEventos] = useState<Array<IEvento>>([]);

    useEffect(() => {
        axios.get('http://localhost:3001/eventos')
            .then((resposta) => {
                setEventos(resposta.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleDelete = (id: number) => {
        axios.delete(`http://localhost:3001/eventos/${id}`)
            .then(() => {
                setEventos(eventos.filter(evento => evento.id !== id));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <LayoutDashboard>
            <div className="d-flex justify-content-between mt-3">
                <h1>Galeria de Eventos</h1>
                <Button variant="success" onClick={() => navigate('/galeria/criar')}>
                    Adicionar Evento
                </Button>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {eventos.map((evento, index) => (
                        <tr key={evento.id}>
                            <td>{index + 1}</td>
                            <td>{evento.nome}</td>
                            <td>{evento.descricao}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    onClick={() => navigate(`/galeria/editar/${evento.id}`)}
                                >
                                    Editar
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(evento.id)}
                                    className="ml-2"
                                >
                                    Delete
                                </Button>
                                <Button
                                    variant="info"
                                    onClick={() => navigate(`/galeria/${evento.id}/fotos`)}
                                    className="ml-2"
                                >
                                    Ver Fotos
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </LayoutDashboard>
    );
};

export default Galeria;
