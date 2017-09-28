import React, { Component } from 'react';
import logo from './logo.svg';

import './App.css';
import ShowBudget from './ShowBudget.js';
import {Button,
        FormControl,
        FormGroup,
        InputGroup,
        Checkbox,
        Col,
        ControlLabel,
        Label,
        Form} from 'react-bootstrap';
        
import { mountMessage } from './sendMail.js';

class Budget extends Component {
   
    constructor(props){
        super(props);
        this.state = {
            error: '',
            email: '',
            business: '',
            card: '',
            carroussel: '',
            googlecampaign: '',
            tag: '',
            budgetResult: '',
        };
    }
    
    
    handleChange(e) {
        const target = e.target;
        const value = e.target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }
    
    handleClick(e){
        e.preventDefault();
        let {
            email,
            business,
            card,
            carroussel,
            googlecampaign,
            tag
        } = this.state;
        let min = (card*150)+(carroussel*525)+(googlecampaign*330)+(carroussel*525);
        let budgetResult;
            if(min <= 1800 ){
                budgetResult = min * 0.08;
            }else{
                if(min > 1800 && min <= 3600){
                    budgetResult = min * 0.07;
                }else{
                    budgetResult = min * 0.10;
                }
            }
        budgetResult = parseFloat(budgetResult).toFixed(2);
       this.setState({
           budgetResult: budgetResult,
       });
        console.log(budgetResult);
    }
    handleSubmit(e){
        e.preventDefault();
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const text= 'card: '+ this.state.card + 
        'carrossel: ' + this.state.carroussel + 
        'adwords: ' + this.state.googlecampaign + 
        'tag: ' + this.state.tag;
        const html = '<span>' + text + '</span>';
        const data = {
            to: 'debycardu@gmail.com',
            from: 'contato@agenciaforca.com',
            subject: 'Novo pedido',
            text: text,
        };
        const msg = mountMessage(data);
        sgMail.send(msg);
        
    }
    render() {
      const result = this.state.budgetResult;
        return (
            <Col lg={9} lgOffset={2}>
            <h1>Faça seu Orçamento</h1>
            <Form  onSubmit={this.handleSubmit.bind(this)}>
                <Col lg={5} sm={10}>
                    <FormGroup >
                        <Col lg={12} >
                            <h3>Card Facebook</h3>
                        </Col> 
                        <Col lg={6}>
                            <InputGroup>
                                <InputGroup.Addon >Quantidade</InputGroup.Addon>
                                <FormControl type="text" 
                                name="card"
                                value={this.state.card} onChange={this.handleChange.bind(this)}/>
                            </InputGroup>
                        </Col>
                        <Col lg={6}>
                            <Checkbox>Será Patrocinado</Checkbox>
                        </Col>
                    </FormGroup>
                </Col>
                <Col lg={5} sm={10}>
                    <FormGroup >
                        <Col lg={12} >
                            <h3>Carrossel Facebook</h3>
                        </Col> 
                        <Col lg={6}>
                            <InputGroup>
                                <InputGroup.Addon>Quantidade</InputGroup.Addon>
                                <FormControl type="number"
                                name="carroussel"
                                value={this.state.carroussel} 
                                onChange={this.handleChange.bind(this)}/>
                            </InputGroup>
                        </Col>
                        <Col lg={6}>
                            <Checkbox>Será Patrocinado</Checkbox>
                        </Col>
                    </FormGroup>
                </Col>
                <Col lg={5} sm={10}>
                    <FormGroup >
                        <Col lg={12} >
                            <h3>Campanha Google Adwords</h3>
                        </Col> 
                        <Col lg={6}>
                            <InputGroup>
                                <InputGroup.Addon>Quantidade</InputGroup.Addon>
                                <FormControl type="number" 
                                name="googlecampaign"
                                value={this.state.googlecampaign} 
                                onChange={this.handleChange.bind(this)}/>
                            </InputGroup>
                        </Col>
                        <Col lg={6}>
                            <Checkbox>Anúncio Texto</Checkbox>
                            <Checkbox>Anúncio Gráfico/Banner</Checkbox>
                            <Checkbox>Otimizar/Acompanhas campanha</Checkbox>
                        </Col>
                    </FormGroup>
                </Col>
                <Col lg={5} sm={10}>
                    <FormGroup >
                        <Col lg={12} >
                            <h3>Tagueamento/Código de Acompanhamentos/Pixel Site</h3>
                        </Col> 
                        <Col lg={6}>
                            <InputGroup>
                                <InputGroup.Addon>Quantidade</InputGroup.Addon>
                                <FormControl type="number" 
                                name="tag"
                                value={this.state.tag} 
                                onChange={this.handleChange.bind(this)}/>
                            </InputGroup>
                        </Col>
                        <Col lg={6}>
                            <Checkbox>Google Analytics</Checkbox>
                            <Checkbox>Google Tag Manager</Checkbox>
                            <Checkbox>Pixel Facebook</Checkbox>
                        </Col>
                    </FormGroup>
                </Col>
                 <Button onClick={this.handleClick.bind(this)} bsStyle="primary" bsSize="large" >Orçar</Button>
                 {result > 0 &&
                    <Col>
                        <ShowBudget value={result}  />
                        <Button type="submit">Finalizar Pedido</Button>
                    </Col>
                }
            </Form>
            
            
            
            </Col>
    );
  }
}

export default Budget;
