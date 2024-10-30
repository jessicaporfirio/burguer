'use client'

import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md";
import { mask, unmask } from "remask";
import { v4 } from "uuid";

export default function Page({ params }) {
    const route = useRouter();

    const funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || [];
    const dados = funcionarios.find(item => item.id == params.id);
    const funcionario = dados || { nome: '', cargo: '', dataAdmissao: '', pisoSalarial: '' };

    function salvar(dados) {
        if (funcionario.id) {
            Object.assign(funcionario, dados);
        } else {
            dados.id = v4();
            funcionarios.push(dados);
        }

        localStorage.setItem('funcionarios', JSON.stringify(funcionarios));
        return route.push('/cadastroFuncionarios');
    }

    return (
        <Pagina titulo="Funcionário">
            <Formik
                initialValues={funcionario}
                onSubmit={values => salvar(values)}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                }) => (
                    <Form>
                        <Form.Group className="mb-3" controlId="nome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                name="nome"
                                value={values.nome}
                                onChange={handleChange('nome')}
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="cargo">
                            <Form.Label>Cargo</Form.Label>
                            <Form.Select
                                name="cargo"
                                value={values.cargo}
                                onChange={handleChange('cargo')}
                            >
                                <option value=''>Selecione um cargo</option>
                                <option value='cozinheiro'>Cozinheiro</option>
                                <option value='garçom'>Garçom</option>
                                <option value='garçonete'>Garçonete</option>
                                <option value='cumin'>Cumin</option>
                                <option value='caixa'>Caixa</option>
                                <option value='serviços gerais'>Serviços Gerais</option>
                                <option value='entregador'>Entregador</option>
                                {/* Adicione mais cargos conforme necessário */}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="dataAdmissao">
                            <Form.Label>Data de Admissão</Form.Label>
                            <Form.Control
                                type="date"
                                name="dataAdmissao"
                                value={values.dataAdmissao}
                                onChange={handleChange('dataAdmissao')}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="pisoSalarial">
                            <Form.Label>Piso Salarial</Form.Label>
                            <Form.Control
                                type="text"
                                name="pisoSalarial"
                                value={values.pisoSalarial}
                                onChange={(value) => {
                                    setFieldValue('pisoSalarial', mask(value.target.value, 'R$ 9999,99'))
                                }}
                            />
                        </Form.Group>

                        <div className="text-center">
                            <Button onClick={handleSubmit} variant="success">
                                <FaCheck /> Salvar
                            </Button>
                            <Link href="/cadastroFuncionarios" className="btn btn-danger ms-2">
                                <MdOutlineArrowBack /> Voltar
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </Pagina>
    )
}
