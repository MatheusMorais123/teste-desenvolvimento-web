import React, { Component } from 'react'
import logoImg from '../../assets/logo.png';
import Pokemon from '../../assets/pokemon.svg';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { FiPower, FiTrash2, FiHeart, FiShield } from 'react-icons/fi';
//import  BallBeat  from 'react-pure-loaders';
import './style.css'
class Profile extends Component {
    state = {
        profile: [],
        image: null,
        name: '',
        force: '',
        attack: '',
        description: '',
        loading: true
    }
    async componentDidMount() {
        const response = await api.get('posts');
        this.setState({ profile: response.data });
    }
    handleChangePokemon = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleSubmit = async e => {
        e.preventDefault();
        const response = await api.get('/search?name=' + this.state.search)
        this.setState({
            profile: response.data,
            search: ''
        })
    }
    handleDelete = id => {
        api.delete(`/posts/${id}`)
    }
    handleLike = id => {
        api.post(`/posts/${id}/like`)
    }
    handleSubmit = async e => {
        e.preventDefault();
        const response = await api.get('/search?name=' + this.state.search)
        this.setState({
            profile: response.data,
            search: ''
        })
    }
    handleInpuntChange = e => {
        this.setState({ search: e.target.value })
    }
    render() {
        const { profile } = this.state;
        return (
            <div className="profile-container">
                <header>
                    <img src={logoImg} alt="Pokemón" />
                    <Link className="button" to="/">Cadastrar novo pokémon</Link>
                </header>
                <h1>Pokémons cadastrados</h1>
                <div class="input-search">
                    <form id="search" onSubmit={this.handleSubmit}>
                        <input
                            text="text"
                            placeholder="Nome do Pokémon"
                            onChange={this.handleInpuntChange}
                            value={this.state.search}
                            style={{ width: 350, marginBottom: 30 }}
                        />
                        <button className="button-search" type="submit">buscar</button>
                    </form>
                </div>
                <ul>
                    {profile.map(posts => (
                        <li key={posts._id} >
                            <img src={`http://localhost:3333/files/${posts.image}`} alt="Pokemon" />
                            <strong>Nome:   <p> {posts.name}</p> </strong>
                            <strong><FiShield size={18} color="e02041" /> Força:  <p>{posts.force}</p> </strong>
                            <strong><FiShield size={18} color="e02041" /> Ataque: <p>{posts.attack}</p> </strong>
                            <strong>Descrição: <p>{posts.description}</p></strong>
                            <div className="footer">
                                <button type="button" onClick={() => this.handleDelete(posts._id)}>
                                    <FiTrash2 size={20} color="a8a8b3" />
                                </button>
                                <button type="button" onClick={() => this.handleLike(posts._id)}>
                                    <FiHeart size={20} color="a8a8b3" />
                                    <p> {posts.likes} Curtidas</p>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
export default Profile;
