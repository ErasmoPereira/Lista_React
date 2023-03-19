
import React, {Component} from "react";
import "./main.css";
import Form from './Form';
import Tarefas from './Tarefas';

export default class Main extends Component{
  state = {
    novaTarefa: '',
    tarefas: [],
    index: -1,
  }

  //Para salvar as atualizações na base de dados
  componentDidMount(){
    const tarefas = JSON.parse(localStorage.getItem('tarefas'));

    if(! tarefas) return;

    this.setState({tarefas})
  }

  componentDidUpdate(prevProps, prevState){
    const { tarefas } = this.state;

    if(tarefas === prevState.tarefas) return;

    localStorage.setItem('tarefas', JSON.stringify(tarefas))
  }



  handleSubmit = (e)=>{
    e.preventDefault(); //O evento não é enviado
    const { tarefas, index } = this.state;
    let { novaTarefa } = this.state;
    novaTarefa = novaTarefa.trim(); //O trim eleimina os espaços desnecessários

    if (tarefas.indexOf(novaTarefa) !== -1) return;

    const novasTarefas = [...tarefas];

    if (index === -1){
      this.setState({
        tarefas: [...novasTarefas,  novaTarefa],
        novaTarefa: '',
      })
    }else{ //Parte para editar a tarefa
      novasTarefas[index] = novaTarefa

      this.setState({
        tarefas:[...novasTarefas],
        index: -1,
        novaTarefa: '',
      })
    }


  }

  handleChange = (e) => {
    this.setState({
      novaTarefa: e.target.value, //para adicionar uma nova tarefa
    })
  }

  handleEdit = (e, index) => {
    const { tarefas }= this.state;
    this.setState({
      index: index,
      novaTarefa: tarefas[index],
    })
  }

  handleDelete = (e, index) => {
    const { tarefas } = this.state;
    const novasTarefas = [...tarefas];
    novasTarefas.splice(index, 1) // O splice remove elementos de um array

    this.setState({
      tarefas:[...novasTarefas],

    })
  }

  render() {
    const { novaTarefa, tarefas } = this.state;

    return (
      <div className="main">
        <h1>Lista de Tarefas</h1>

          <Form
          handleSubmit = {this.handleSubmit}
          handleChange = {this.handleChange}
          novaTarefa = {novaTarefa}/>

        <Tarefas
        tarefas={tarefas}
        handleEdit={this.handleEdit}
        handleDelete={this.handleDelete}/>

      </div>
    )
  }
}

