import React, { Component } from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css'
import api from '../../services/api';
import logoImg from '../../assets/logo.png';
class Register extends Component {
    state = {
        profile: [],
        image: null,
        name: '',
        force: '',
        attack: '',
        description: '',
        loading: true,
    }
    handleAddPokemon = async e => {
        e.preventDefault();
        const data = new FormData();
        data.append('image', this.state.image);
        data.append('name', this.state.name);
        data.append('force', this.state.force);
        data.append('attack', this.state.attack);
        data.append('description', this.state.description);
        await api.post('posts', data);
        this.props.history.push('/profile');
    }
    handleChangePokemon = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleImageChange = e => {
        this.setState({ image: e.target.files[0] })
    }

    render() {

        return (
            <div className="register-container">
                <div className="content">
                    <section>
                        <img src={logoImg} width="250" height="100" alt="Pokémon" />
                        <h1>Cadastro</h1>
                        <p>Faça o cadastro, entre na plataforma e ajude a organizar os pokémons</p>
                    </section>
                    <form onSubmit={this.handleAddPokemon} >
                        <input
                            name="name"
                            placeholder="Nome do Pekemón"
                            onChange={this.handleChangePokemon}
                            value={this.state.name}
                        />
                        <div className="input-group">
                            <input
                                name="attack"
                                placeholder="Ataque"
                                onChange={this.handleChangePokemon}
                                value={this.state.attack}
                            />
                            <input
                                name="force"
                                placeholder="Força"
                                onChange={this.handleChangePokemon}
                                value={this.state.force}
                            />
                        </div>
                        <textarea
                            name="description"
                            type="text"
                            placeholder="Descrição"
                            onChange={this.handleChangePokemon}
                            value={this.state.description}
                        />
                        <input type="file" onChange={this.handleImageChange} />
                        <p>Formato imagem jpg</p>
                        <button className="button" type="submit">Cadastrar</button>
                    </form>
                </div>
            </div>
        )
    }
}
export default Register