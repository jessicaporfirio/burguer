'use client';
import { useState } from 'react'; // Importe useState
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FaFacebook } from 'react-icons/fa';
import { FiInstagram } from 'react-icons/fi';
import { AiOutlineWhatsApp } from 'react-icons/ai';
import { IoLogoTwitter } from 'react-icons/io';
import { v4 as uuidv4 } from 'uuid'; // Importe v4 para gerar IDs



export default function Cardapio() {
  const [successMessage, setSuccessMessage] = useState(''); // Estado para a mensagem de sucesso
  const [formData, setFormData] = useState({
    email: '',
    nome: '',
    telefone: '',
    endereco: '',
    complemento: '',
    numero: '',
    senha: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const salvar = (dados) => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []; // Obtém os usuários do localStorage
    dados.id = uuidv4(); // Gera um ID único
    usuarios.push(dados); // Adiciona os dados ao array
    localStorage.setItem('usuarios', JSON.stringify(usuarios)); // Salva no localStorage
    setSuccessMessage('Usuário cadastrado com sucesso!'); // Atualiza a mensagem de sucesso
};
  const handleSubmit = (e) => {
    e.preventDefault(); // Impede o envio padrão do formulário
    salvar(formData); // Chama a função salvar
  };

  return (
    <>
      {/* Cabeçalho */}
      <header id="cabecalho" className="text-center my-3">
        <Link href="/home" passHref>
          <img
            src="/imagens/rbg.png"
            alt="Logo The Burguer"
            width={350}
            height={350}
          />
        </Link>
      </header>

      {/* Menu */}
      <div className="menu-container">
        <Link href="/cardapio" className="menu-item">
          <img
            src="/imagens/hamburguer (1).png"
            alt="Burgers Icon"
            className="menu-icon"
          />
          <span className="menu-text">BURGERS</span>
        </Link>
        <Link href="/bebidas" className="menu-item">
          <img
            src="/imagens/cerveja.png"
            alt="Bebidas Icon"
            className="menu-icon"
          />
          <span className="menu-text">BEBIDAS</span>
        </Link>
        <Link href="/sobremesas" className="menu-item">
          <img
            src="/imagens/sobremesa.png"
            alt="Sobremesas Icon"
            className="menu-icon"
          />
          <span className="menu-text">SOBREMESAS</span>
        </Link>
        <Link href="/porcoes" className="menu-item">
          <img
            src="/imagens/batatas-fritas.png"
            alt="Porções Icon"
            className="menu-icon"
          />
          <span className="menu-text">PORÇÕES</span>
        </Link>
      </div>

      {/* Formulário de Cadastro */}
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="form-card">
              <Card.Body>
                <h2 className="form-title">Cadastro</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>E-mail:</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Digite seu e-mail"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formNome">
                    <Form.Label>Nome:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Digite seu nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formTelefone">
                    <Form.Label>Telefone:</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Digite seu telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formEndereco">
                    <Form.Label>Endereço:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Digite seu endereço"
                      name="endereco"
                      value={formData.endereco}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Row>
                    <Col md={8}>
                      <Form.Group className="mb-3" controlId="formComplemento">
                        <Form.Label>Complemento:</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Complemento"
                          name="complemento"
                          value={formData.complemento}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3" controlId="formNumero">
                        <Form.Label>N°:</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Número"
                          name="numero"
                          value={formData.numero}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3" controlId="formSenha">
                    <Form.Label>Senha:</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Digite sua senha"
                      name="senha"
                      value={formData.senha}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Button variant="dark" type="submit" className="form-button">
                    Cadastrar
                  </Button>
                </Form>

                {/* Mensagem de Sucesso */}
                {successMessage && (
                  <div className="mt-3 text-success">
                    {successMessage}
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Rodapé */}
      <div className="container my-5">
        <footer className="text-center text-lg-start" style={{ backgroundColor: '#000' }}>
          <div className="container d-flex justify-content-center py-5">
            <Button className="btn btn-primary btn-lg btn-floating mx-2" style={{ backgroundColor: '#E5A220' }}>
              <FaFacebook />
            </Button>
            <Button className="btn btn-primary btn-lg btn-floating mx-2" style={{ backgroundColor: '#E5A220' }}>
              <FiInstagram />
            </Button>
            <Button className="btn btn-primary btn-lg btn-floating mx-2" style={{ backgroundColor: '#E5A220' }}>
              <AiOutlineWhatsApp />
            </Button>
            <Button className="btn btn-primary btn-lg btn-floating mx-2" style={{ backgroundColor: '#E5A220' }}>
              <IoLogoTwitter />
            </Button>
          </div>

          {/* Copyright */}
          <div className="text-center text-white p-3" style={{ backgroundColor: '#000' }}>
            © 2020 Copyright:
            <a className="text-white" href="https://mdbootstrap.com/">MDBootstrap.com</a>
          </div>
        </footer>
      </div>
    </>
  );
}
