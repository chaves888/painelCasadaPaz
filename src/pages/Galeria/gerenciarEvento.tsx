import React, { useEffect, useRef, useState, useCallback } from 'react';
import { LayoutDashboard } from '../../components/LayoutDashboard';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Container } from 'react-bootstrap';

interface IForm {
    nome: string;
    descricao: string;
}

const GerenciarEvento = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<IForm>();
    const refForm = useRef<any>();
    const navigate = useNavigate();
    const { id } = useParams();
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        if (id) {
            setIsEdit(true);
            axios.get(`http://localhost:3001/eventos/${id}`)
                .then((res) => {
                    setValue("nome", res.data.nome);
                    setValue("descricao", res.data.descricao);
                })
                .catch((err) => console.log(err));
        }
    }, [id, setValue]);
    

    const submitForm: SubmitHandler<IForm> = useCallback(
        async (data) => {
            try {
                if (isEdit) {
                    await axios.put(`http://localhost:3001/eventos/${id}`, data);
                } else {
                    await axios.post('http://localhost:3001/eventos', data);
                }
                navigate('/galeria');
            } catch (error) {
                console.error('Axios error:', error.response ? error.response.data : error.message);
            }
        }, [isEdit, id, navigate]
    );

    return (
        <LayoutDashboard>
            <h1>{isEdit ? 'Editar Evento' : 'Adicionar Evento'}</h1>
            <Container>
                <form
                    className="row g-3 needs-validation mb-3"
                    noValidate
                    style={{ alignItems: 'center' }}
                    onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        refForm.current.classList.add('was-validated');
                        handleSubmit(submitForm)(event);
                    }}
                    ref={refForm}
                >
                    <div className="col-md-12">
                        <label htmlFor="nome" className="form-label">Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nome do Evento"
                            id="nome"
                            required
                            {...register('nome', { required: 'Nome é obrigatório' })}
                        />
                        <div className="invalid-feedback">
                            {errors.nome && errors.nome.message}
                        </div>
                    </div>

                    <div className="col-md-12">
                        <label htmlFor="descricao" className="form-label">Descrição</label>
                        <textarea
                            className="form-control"
                            placeholder="Descrição do Evento"
                            id="descricao"
                            required
                            {...register('descricao', { required: 'Descrição é obrigatória' })}
                        />
                        <div className="invalid-feedback">
                            {errors.descricao && errors.descricao.message}
                        </div>
                    </div>

                    <div className="col-md-12">
                        <button type="submit" className="btn btn-success">
                            {isEdit ? 'Salvar Alterações' : 'Adicionar'}
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary ml-2"
                            onClick={() => navigate('/galeria')}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </Container>
        </LayoutDashboard>
    );
};

export default GerenciarEvento;
