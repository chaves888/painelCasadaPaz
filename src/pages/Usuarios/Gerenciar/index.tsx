import { useCallback, useEffect, useRef, useState } from "react"
import { IToken } from "../../../interfaces/token"
import { validaPermissao, verificaTokenExpirado } from "../../../services/token"
import { useNavigate, useParams } from "react-router-dom"
import { LayoutDashboard } from "../../../components/LayoutDashboard"
import { SubmitHandler, useForm } from "react-hook-form"
import axios from "axios"

interface IForm {
    nome: string
    email: string
    password?: string
    permissoes: string
}


export default function GerenciarUsuarios() {

   

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch
    } = useForm<IForm>()

    const refForm = useRef<any>()

    const navigate = useNavigate()

    const { id } = useParams();

    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => { //o primeiro a ser executado quando tiver ele na pagina
        let lsToken = localStorage.getItem('americanos.token')

        let token: IToken | null = null

        if (typeof lsToken === 'string') {
            token = JSON.parse(lsToken)
        }

        if (!token || verificaTokenExpirado(token.accessToken)) {
            navigate('/')
        }


        const idUser = Number(id)
        if(!isNaN(idUser)) {
            setIsEdit(true)

            axios.get('http://localhost:8000/api/usuarios/'+ idUser)
            .then((res) => {

                setValue("nome", res.data.data[0].nome)
                setValue("email", res.data.data[0].email)
                setValue("permissoes", res.data.data[0].permissoes)
            })
        }

    }, [id])

    const [emailPlaceholder, setEmailPlaceholder] = useState("Ex: usuario@example.com");
    const [nomePlaceholder, setNomePlaceholder] = useState("Ex: usuario@example.com");

    useEffect(() => {
        if (isEdit) {
            axios.get(`http://localhost:8000/api/usuarios/${id}`)
                .then((res) => {
                    setValue("email", res.data.data.email);
                    setValue("nome", res.data.data.nome);
                    setEmailPlaceholder(res.data.data.email);
                    setNomePlaceholder(res.data.data.nome);
                });
        }
    }, [id, isEdit, setValue]);

    

    const submitForm: SubmitHandler<IForm> = useCallback(
        (data) => {

            if(isEdit) {
                //Editando usuário

                console.log(data)
                console.log(id)

                if (data.password?.trim() === '') {
                    delete data.password
                }

                axios.put('http://localhost:8000/api/usuarios/' + id

                    ,data
                    
                )
                    .then((res) => {
                        navigate('/usuarios')
                    })
                    .catch((err) => {
                        console.log(err)
                    })

            } else {
                axios.post('http://localhost:8000/api/usuarios/',
                    data
                )
                    .then((res) => {
                        navigate('/usuarios')
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
            

        }, [isEdit])

    return (
            

        <>
            <LayoutDashboard>
                <h1>{isEdit ? 'Editar Usuario' : 'Adicionar Ususario' }</h1>

                <form
                    className="row g-3 needs-validation mb-3"
                    noValidate
                    style={{
                        alignItems: 'center'
                    }}
                    onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();

                        refForm.current.classList.add('was-validated')

                        handleSubmit(submitForm)(event)

                    }}
                    ref={refForm}
                >
                    <div
                        className="col-md-12"
                    >
                        <label
                            htmlFor="nome"
                            className="form-label"
                        >
                            Nome
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder={nomePlaceholder}
                            id="nome"
                            required
                            {...register('nome',
                                { required: 'Nome é obrigatorio' }
                            )}
                        />
                        <div className="invalid-feedback">
                            {errors.nome && errors.nome.message}
                        </div>
                    </div>

                    <div
                        className="col-md-12"
                    >
                        <label
                            htmlFor="email"
                            className="form-label"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder={emailPlaceholder}
                            id="email"
                            required
                            {...register('email',
                                { required: 'Email é obrigatorio' }
                            )}
                        />
                        <div className="invalid-feedback">
                            {errors.email && errors.email.message}
                        </div>
                    </div>

                    <div
                        className="col-md-12"
                    >
                        <label
                            htmlFor="password"
                            className="form-label"
                        >
                            Senha
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="alterar senha"
                            id="password"
                            // required={!isEdit}
                            // {...register('password',
                            //     { required: isEdit ? undefined : 'Senha é obrigatorio' }
                            // )}
                            required
                            {...register('password',
                                {required: 'Senha é obrigatório'}
                            )}
                        />
                        <div className="invalid-feedback">
                            {errors.password && errors.password.message}
                        </div>
                    </div>

                    <div
                        className="col-md-12"
                    >
                        <button
                            type="submit"
                            className="btn btn-success"
                        >
                            Salvar
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary ml-2"
                            onClick={() => navigate('/usuarios')}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </LayoutDashboard>
        </>
    )
}