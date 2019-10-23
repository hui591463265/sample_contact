import React, {Component} from 'react';
import {
    Container, 
    Row,
    Col,
    ListGroup,
    ListGroupItem,
    Button,
    Modal,
    ModalBody,
    Form,
    FormGroup,
    Input} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {connect} from 'react-redux';
import {getItems, deleteItem, updateItem} from '../actions/itemActions';
import PropTypes from 'prop-types';
import axios from 'axios';


class Contactlist extends Component{
    state={
        id:'',
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        picture:'',
        modalIsOpen:false
    }

    toggle=(item)=>{
        this.setState({
            id:item._id,
            firstname: item.firstname,
            lastname: item.lastname,
            email: item.email,
            phone: item.phone,
            picture: item.picture,
            modalIsOpen:!this.state.modalIsOpen
        })
    }
    //onChange function will take target input and save target value to state fields
    onChange = (e) => this.setState({
        [e.target.name]:e.target.value
    })
    //get image and use axios to post to img-upload route endpoint
    uploadfile = e =>{
        const img = e.target.files[0];
        const data = new FormData();
        data.append('image', img);
        //console.log(img);
        axios.post('/api/img-upload', data, {
            'accept':'application/json',
            'Accept-Language': 'en-US, en; q=0.8',
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`
        }).then((res)=>{
            if(200 ===res.status){
                this.setState({
                    picture:res.data.imageURL
                });
            }
        }).catch((err)=>{
            console.log(err)
        });

    }
    //onSave function will call addContact function from app.js and pass state values to addContact function
    //then it will setState to initial empty values
    onSubmit =(e)=>{
        e.preventDefault();
        const updateitem = {
            id: this.state.id,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            phone: this.state.phone,
            picture: this.state.picture,
        }
        //add item via additem action
        this.props.updateItem(updateitem);
        
        //close modal
        this.setState({modalIsOpen:!this.state.modalIsOpen});
        
    }
//get all items
componentDidMount(){
    this.props.getItems();
}
//call deleteItem function
onDeleteClick = (id) =>{
    this.props.deleteItem(id);
}
//get all listed profiles' pictures
getProfilepic=(item)=>{
    const initial = String(item.firstname).charAt(0)+String(item.lastname).charAt(0);
    if(item.picture===""){
        return <div id="profilepic">{initial}</div>
    }
    //if picture is stored in MongoDB database, retrieve picture.
    else {
        return <img id="profilepic2" alt="sup" src={item.picture}/>
    }
}
//get current clicked profilepicture
getProfilepic1=()=>{
    const initial = String(this.state.firstname).charAt(0)+String(this.state.lastname).charAt(0);
    if(this.state.picture===''){
        return <div id="profilepic">{initial}</div>
    }
    else{
        return <img id="profilepic2" alt="sup" src={this.state.picture}/>
    }
}
render(){
    const {items} = this.props.item;
    return(
        <Container style={{marginTop:'3rem'}}>
            <ListGroup>
                <TransitionGroup className='contact-list'>
                    {items.map((item)=>(
 
                        <CSSTransition key={item._id} timeout={500}>
                            <ListGroupItem>
                                <Container>
                                    <Row>
                                        <Col lg={2} md={3} sm={4}>
                                            {this.getProfilepic(item)}
                                        </Col>
                                        <Col lg={8} md={7} sm={5}>
                                            <Row style={{fontFamily: 'fantasy',fontSize:'2rem'}}>{item.firstname+' '+item.lastname}</Row>
                                            <Row style={{fontFamily: 'fantasy',fontSize:'2rem'}}>{item.email}</Row>
                                        </Col>
                                        <Col lg={2} md={2} sm={3} style={{padding:'1.5rem 0'}}>
                                            <Button 
                                                style={{float:'right', fontSize:'1.8rem', color:'red'}}
                                                color="none" 
                                                size='sm' 
                                                onClick={this.onDeleteClick.bind(this, item._id)}>
                                                    &times;
                                            </Button>
                                            <Button 
                                                style={{float:'right',fontSize:'1.5rem'}}
                                                color='none'
                                                size='sm' 
                                                onClick={this.toggle.bind(this, item)}>
                                                    &#9997;
                                            </Button>
                                        </Col>
                                    </Row>
                                </Container>
                                <Modal
                                    isOpen={this.state.modalIsOpen}
                                    toggle={this.toggle}
                                >
                                <ModalBody>
                                <Container id="container">
                                    <Form onSubmit={this.onSubmit}>
                                    <FormGroup>
                                        <Row>
                                            <Col><button type='button' id="Popclistbtn" onClick={this.toggle}>close</button></Col>
                                            <Col><button id="Popclistbtn" style={{float:'right'}}/*onClick={this.closeModal}*/>Save</button></Col>
                                        </Row>
                                        <br/>
                                        <br/>
                                        
                                        <Row>
                                            <Col xl={4} lg={4} md={5} xs={6}>
                                                <div>
                                                    <label htmlFor="profileinput">
                                                    <input id="profileinput" 
                                                        type="file" 
                                                        accept="image/*"
                                                        name = "image"
                                                        style={{display:'none'}} 
                                                        onChange={this.uploadfile}/>
                                                    {this.getProfilepic1()}
                                                    </label>
                                                </div>
                                            </Col>
                                            
                                            <Col xl={8} lg={8} md={7} xs={6}>
                                                <Row style={{borderBottom: '1px solid #979797', height:'50%'}}>
                                                    <Input style={{border:'transparent', outline:'none'}} 
                                                    type="text" name='firstname' 
                                                    required="required" placeholder='First Name' 
                                                    value={this.state.firstname} 
                                                    onChange={this.onChange}/>
                                                </Row>
                                                <Row style={{borderBottom: '1px solid #979797', height:'50%'}}>
                                                    <Input style={{border:'transparent', outline:'none'}} 
                                                    type="text" name='lastname' 
                                                    required="required" placeholder='Last Name'
                                                    value={this.state.lastname}
                                                    onChange={this.onChange}/>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <br/><br/>
                                        <Row style={{borderBottom: '1px solid #979797'}}>
                                            phone:
                                            <Input style={{border:'transparent', outline:'none'}} 
                                            type="text" name='phone' pattern="[0-9]{10}"
                                            required="required" placeholder='+1 917 000 0000'
                                            value={this.state.phone} 
                                            onChange={this.onChange}/>
                                        </Row>
                                        <br/>
                                        <Row style={{borderBottom: '1px solid #979797'}}>
                                            e-mail:
                                            <Input style={{border:'transparent', outline:'none'}} 
                                            type="email" name='email' 
                                            required="required" placeholder='example@gmail.com'
                                            value={this.state.email}
                                            onChange={this.onChange}/>  
                                        </Row>
                                        <br/>
                                    </FormGroup>
                                    </Form>
                                </Container>
                                </ModalBody>
                                </Modal>
                            </ListGroupItem>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </ListGroup>
        </Container>
        
    );
}
}
Contactlist.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) =>({
    item: state.item
})

export default connect(
    mapStateToProps, 
    {getItems, deleteItem, updateItem}
)(Contactlist);