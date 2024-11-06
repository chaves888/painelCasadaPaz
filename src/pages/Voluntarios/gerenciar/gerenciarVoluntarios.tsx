import React, { useEffect, useRef, useState, useCallback } from 'react';
import { LayoutDashboard } from '../../../components/LayoutDashboard';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Container } from 'react-bootstrap';

interface IForm {
    voluntario: string;
}

const GerenciarVoluntarios: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<IForm>();
    const refForm = useRef<HTMLFormElement>(null);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        if (id) {
            setIsEdit(true);
            axios.get(`http://localhost:8000/api/voluntarios/${id}`)
                .then((res) => {
                    setValue("voluntario", res.data.data.voluntario);
                })
                .catch((err) => console.log(err));
        }
    }, [id, setValue]);

    const submitForm: SubmitHandler<IForm> = useCallback(
        async (data) => {
            const payload = {
                voluntario: data.voluntario,
            };
    
            try {
                if (isEdit) {
                    await axios.put(`http://localhost:8000/api/voluntarios/${id}`, payload, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                } else {
                    await axios.post('http://localhost:8000/api/voluntarios', payload, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                }
                navigate('/voluntarios');
            } catch (error: any) {
                if (error.response) {
                    console.error('Axios error:', error.response.data);
                } else {
                    console.error('Axios error:', error.message);
                }
            }
        }, [isEdit, id, navigate]
    );
    
    return (
        <LayoutDashboard>
            <h1>{isEdit ? 'Editar Cargo' : 'Adicionar Cargo'}</h1>
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
                        <label htmlFor="voluntario" className="form-label">Nome do Cargo</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nome do Cargo"
                            id="voluntario"
                            required
                            {...register('voluntario', { required: 'Nome do Cargo é obrigatório' })}
                        />
                        <div className="invalid-feedback">
                            {errors.voluntario && errors.voluntario.message}
                        </div>
                    </div>

                    <div className="col-md-12">
                        <button type="submit" className="btn btn-success">
                            {isEdit ? 'Salvar Alterações' : 'Adicionar'}
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary ml-2"
                            onClick={() => navigate('/voluntarios')}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </Container>
        </LayoutDashboard>
    );
};

export default GerenciarVoluntarios;
