import React, { useEffect, useRef, useState, useCallback } from 'react';
import { LayoutDashboard } from '../../components/LayoutDashboard';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Container } from 'react-bootstrap';

interface IForm {
    fotos: FileList;
}

const AdicionarFotos: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IForm>();
    const refForm = useRef<HTMLFormElement>(null);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const submitForm: SubmitHandler<IForm> = useCallback(
        async (data) => {
            const formData = new FormData();
            Array.from(data.fotos).forEach((file) => {
                formData.append('fotos', file);
            });

            try {
                await axios.post(`http://localhost:3001/eventos/${id}/fotos`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                navigate(`/galeria/${id}/fotos`);
            } catch (error: any) {
                if (error.response) {
                    console.error('Axios error:', error.response.data);
                } else {
                    console.error('Axios error:', error.message);
                }
            }
        }, [id, navigate]
    );

    return (
        <LayoutDashboard>
            <h1>Adicionar Fotos ao Evento</h1>
            <Container>
                <form
                    className="row g-3 needs-validation mb-3"
                    noValidate
                    style={{ alignItems: 'center' }}
                    onSubmit={(event) => {
                        event.preventDefault();
                        if (refForm.current) {
                            refForm.current.classList.add('was-validated');
                        }
                        handleSubmit(submitForm)(event);
                    }}
                    ref={refForm}
                >
                    <div className="col-md-12">
                        <label htmlFor="fotos" className="form-label">Fotos</label>
                        <input
                            type="file"
                            className="form-control"
                            id="fotos"
                            multiple
                            required
                            {...register('fotos', { required: 'Selecione pelo menos uma foto' })}
                        />
                        <div className="invalid-feedback">
                            {errors.fotos && errors.fotos.message}
                        </div>
                    </div>

                    <div className="col-md-12">
                        <button type="submit" className="btn btn-success">Adicionar</button>
                        <button
                            type="button"
                            className="btn btn-secondary ml-2"
                            onClick={() => navigate(`/galeria/${id}/fotos`)}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </Container>
        </LayoutDashboard>
    );
};

export default AdicionarFotos;
