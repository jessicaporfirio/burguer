'use client';

import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { v4 } from "uuid";
import { useState } from "react";

export default function Page({ params }) {
    const route = useRouter();
    const avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || [];
    const dados = avaliacoes.find(item => item.id === params.id);
    const avaliacao = dados || { nome: '', comentario: '', nota: 0 }; // Inicializando nota e comentário

    const [nota, setNota] = useState(avaliacao.nota);

    function salvar(dados) {
        if (avaliacao.id) {
            Object.assign(avaliacao, dados);
        } else {
            dados.id = v4();
            avaliacoes.push(dados); // Corrigido para adicionar a nova avaliação
        }

        localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes));
        return route.push('/avaliacoes');
    }

    return (
        <>
            <header id="cabecalho" className="text-center my-3">
                <Link href="/home" passHref>
                    <img src="/imagens/rbg.png" alt="Logo The Burguer" width={350} height={350} />
                </Link>
            </header>

            <div className="form-container">
                <h1>{avaliacao.id ? 'Editar Avaliação' : 'Adicionar Avaliação'}</h1>
                <Formik
                    initialValues={avaliacao}
                    onSubmit={values => {
                        values.nota = nota; // Adiciona a nota escolhida
                        salvar(values);
                    }}
                >
                    {({
                        values,
                        handleChange,
                        handleSubmit,
                    }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="nome">
                                <Form.Label>Nome:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nome"
                                    value={values.nome}
                                    onChange={handleChange('nome')}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="nota">
                                <Form.Label>Nota:</Form.Label>
                                <div className="estrelas">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            className={`star ${nota >= star ? 'filled' : ''}`}
                                            onClick={() => setNota(star)}
                                            role="button"
                                            tabIndex={0}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="comentario">
                                <Form.Label>Comentário:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="comentario"
                                    value={values.comentario}
                                    onChange={handleChange('comentario')}
                                    required
                                />
                            </Form.Group>

                            <div className="text-center">
                                <Button type="submit" variant="success" className="w-100" style={{color:'black'}}>
                                    <FaCheck /> Salvar
                                </Button>
                            </div>
                            <Link
                                href="/avaliacoes"
                                className="btn btn-danger w-100 mt-2"
                            >
                                <MdOutlineArrowBack /> Voltar
                            </Link>
                        </Form>
                    )}
                </Formik>
            </div>

            <style jsx>{`
                .estrelas {
                    display: flex;
                    justify-content: center;
                    margin: 0.5rem 0;
                }

                .star {
                    font-size: 2rem;
                    color: gray;
                    cursor: pointer;
                    transition: color 0.2s;
                }

                .star.filled {
                    color: gold;
                }

                .star:hover {
                    color: orange;
                }
            `}</style>
        </>
    );
}
