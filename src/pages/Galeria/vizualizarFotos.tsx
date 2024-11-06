import React, { useEffect, useState } from 'react';
import { LayoutDashboard } from '../../components/LayoutDashboard';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Carousel, Container, Button } from 'react-bootstrap';

interface IFoto {
    id: number;
    url: string;
}

const VisualizarFotos: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [fotos, setFotos] = useState<Array<IFoto>>([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/eventos/${id}/fotos`)
            .then((resposta) => {
                setFotos(resposta.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    return (
        <LayoutDashboard>
            <Container>
                <div className="d-flex justify-content-between mt-3">
                    <h1>Fotos do Evento</h1>
                    <Button variant="success" onClick={() => navigate(`/galeria/${id}/fotos/adicionar`)}>
                        Adicionar Fotos
                    </Button>
                </div>
                {fotos.length > 0 ? (
                    <Carousel>
                        {fotos.map((foto) => (
                            <Carousel.Item key={foto.id}>
                                <img
                                    className="d-block w-100"
                                    src={foto.url}
                                    alt={`Foto ${foto.id}`}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                ) : (
                    <p>Nenhuma foto disponível para este evento.</p>
                )}
            </Container>
        </LayoutDashboard>
    );
};

export default VisualizarFotos;
