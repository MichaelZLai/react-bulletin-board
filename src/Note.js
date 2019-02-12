import React, {Component} from 'react'
import {FaPencilAlt} from 'react-icons/fa'
import {FaTrash} from 'react-icons/fa'
import {GiCompactDisc} from 'react-icons/gi'

class Note extends Component{
  constructor(props){
    super(props)
    this.state = {
      editing: false
    }
    this.edit = this.edit.bind(this)
    this.remove = this.remove.bind(this)
    this.save = this.save.bind(this)
    this.renderForm = this.renderForm.bind(this)
    this.renderDisplay = this.renderDisplay.bind(this)
    this.randomBetween = this.randomBetween.bind(this)
  }

  componentWillMount(){
    var colors = ["#B1CDEA","#EBF6F2","#F9B8A2", "#F8CED7", "#E8DFE4", "#F9AC55", "yellow", "#74CAC4" ]
    var bgColor = colors[Math.floor(Math.random() * colors.length)]
    console.log(bgColor)
    this.style = {
      right: this.randomBetween(0, window.innerWidth - 150, 'px'),
      top: this.randomBetween(0, window.innerHeight - 150, 'px'),
      backgroundColor: bgColor,
      transform: `rotate(${this.randomBetween(-25, 25, 'deg')})`
    }
  }

  randomBetween(x, y, pixels){
    return x + Math.ceil(Math.random() * (y-x)) + pixels
  }

  componentDidUpdate(){
    var textArea
    if (this.state.editing){
      textArea = this._newText
      textArea.focus()
      textArea.select()
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    return(
      this.props.children !== nextProps.children || this.state !== nextState
    )
  }

  edit(){
    this.setState({
      editing:true
    })
  }

  remove(){
    this.props.onRemove(this.props.index)
  }

  save(e){
    e.preventDefault()
    this.props.onChange(this._newText.value, this.props.index)
    this.setState({
      editing: false
    })
  }

  renderForm(){
    return(
      <div className="note" style={this.style}>
        <form onSubmit={this.save}>
          <textarea ref={input => this._newText = input}
                    defaultValue={this.props.children}/>
          <button id="save"><GiCompactDisc /></button>
        </form>
      </div>
    )
  }

  renderDisplay(){
    return(
      <div className="note" style={this.style}>
        <p>{this.props.children}</p>
        <span>
          <button onClick={this.edit} id="edit"><FaPencilAlt /></button>
          <button onClick={this.remove} id="remove"><FaTrash /></button>
        </span>
      </div>
    )
  }

  render(){
    return this.state.editing ? this.renderForm() : this.renderDisplay()
  }
}

export default Note
