import React,{Component} from 'react';
import {
    Container, 
    Row, 
    Col, 
    Button, 
    Modal,
    ModalBody,
    Form,
    FormGroup,
    Input
} from 'reactstrap';
import {connect} from 'react-redux';
import {addItem} from '../actions/itemActions';
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class Header extends Component {
    //have state array fields set to empty
    state = {
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        picture:'',
        modalIsOpen:false
    };
    toggle=()=>{
        this.setState({
            modalIsOpen: !this.state.modalIsOpen
        })
    }
    
    //onChange function will take target input and save target value to state fields
    onChange = (e) => this.setState({
        [e.target.name]:e.target.value
    })
    //this will upload all profile pictures selected
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
     //onSave function will call addContact function from app.js and pass state values to addContact action
    //then it will setState to initial empty values
    onSubmit =(e)=>{
        e.preventDefault();
        //********************/
        //this.props.addContact(this.state);
        const newItem = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            phone: this.state.phone,
            email: this.state.email,
            picture:this.state.picture
        }
        //add item via additem action
        this.props.addItem(newItem);
        this.setState({
            firstname: '',
            lastname: '',
            phone: '',
            email: '',
            picture:''
        });
        //close modal
        this.toggle();
    }
    
    
    render(){
    return (
    <div>
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={11} style={{fontSize:"4vw", fontWeight:"bold"}}>My Contact</Col>
                <Col xs={1}>
                    <Button style={{float:"right", backgroundColor:"transparent", color:"black", border:"none", fontSize:"3vw"}} 
                            onClick={this.toggle}>
                        +
                    </Button>
                </Col>
            </Row>
            <hr style={{borderBottom:'1px solid #979797'}}/>
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
                    <Col><button type="button" id="Popclistbtn" onClick={this.toggle}>close</button></Col>
                    <Col><button id="Popclistbtn" style={{float:'right'}}>Save</button></Col>
                </Row>
                <br/>
                <br/>
                
                <Row>
                    <Col xl={4} lg={4} md={5} xs={6}>
                        <label htmlFor="profileinput" id="profilepic">
                            <input id="profileinput" 
                                type="file" 
                                accept="image/*"
                                name = "image"
                                style={{display:'none'}} 
                                onChange={this.uploadfile}/>
                            Add Photo
                        </label>
                    </Col>
                    
                    <Col xl={8} lg={8} md={7} xs={6}>
                        <Row style={{borderBottom: '1px solid #979797', height:'50%'}}>
                            <Input style={{border:'transparent', outline:'none'}} 
                            required="required" type="text" 
                            name='firstname' placeholder='First Name' 
                            value={this.state.firstname} 
                            onChange={this.onChange}/>
                        </Row>
                        <Row style={{borderBottom: '1px solid #979797', height:'50%'}}>
                            <Input style={{border:'transparent', outline:'none'}} 
                            required="required" type="text" 
                            name='lastname' placeholder='Last Name'
                            value={this.state.lastname}
                            onChange={this.onChange}/>
                        </Row>
                    </Col>
                </Row>
                <br/><br/>
                <Row style={{borderBottom: '1px solid #979797'}}>
                    phone:
                    <Input style={{border:'transparent', outline:'none'}} 
                    required="required" type="text" 
                    name='phone' pattern="[0-9]{10}"
                    placeholder='+1 917 000 0000'
                    value={this.state.phone}
                    onChange={this.onChange}/>
                </Row>
                <br/>
                <Row style={{borderBottom: '1px solid #979797'}}>
                    e-mail:
                    <Input style={{border:'transparent', outline:'none'}} 
                    required="required" type="email" 
                    name='email' placeholder='example@gmail.com'
                    value={this.state.email}
                    onChange={this.onChange}/>  
                </Row>
                <br/>
            </FormGroup>
            </Form>
            </Container>
            </ModalBody>
        </Modal>
    </div>
    );
}

}
//redux
const mapStateToProps =state=>({
    item:state.item
})

export default connect(mapStateToProps, {addItem})(Header);