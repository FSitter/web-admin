import React, { Component } from 'react';
import { Button, Badge, Card, Label, Input, 
 CardBody,FormGroup, InputGroup, InputGroupAddon, InputGroupText, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import Api from '../../api/api_helper';
import moment from 'moment';
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
  ToastContainer,
} from 'react-toasts';
import Detail from '../User/babysitter/detail';

class Tables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      certs: [],
      users: [],
      sittersNotIn: [],
      sittersIn: [],
      headers: [],
      isActive: null,
      reset: true,
      open: null,
      key1: '',
      key2: '',
      keyCert: '',
      openName: '',
      openInfo: false,
      openInfoUser: null,
    };
  }

  componentDidMount(){
    Api.get('certs/all').then(res => {this.setState({certs: res});});
  }

  getUsers = async() => {
    await Api.get('users').then((res) => {
      const sitters = res;
      let tmpres = [];
      let temp = [];
      sitters.map(sister => {
        if (sister.roleId == 3)
          this.hasCert(sister, this.state.open) ? tmpres.push(sister) : temp.push(sister);
      })
      this.setState({sittersIn: tmpres, sittersNotIn: temp});
    });
  };

  hasCert = (user, id) => {
    let check = false;
    if (user.sitterCerts == []) return check;
    user.sitterCerts.map(cert =>{
      if (cert.certId == id) check = true;
    })
    return check;
  }

  createSitterCert = async(userId) => {
    let body = {};
    body.sitterId = userId;
    body.certId = this.state.open;
    await Api.post('sitterCert', body);
    await this.setState({sittersNotIn: []});
  }

  destroySitterCert = async(userId) => {
    let body = {};
    body.sitterId = userId;
    body.certId = this.state.open;
    await  Api.delete('sitterCert', body);
    await this.setState({sittersNotIn: []});
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
        <ToastsContainer
          store={ToastsStore}
          position={'top_right'}
          lightBackground
        />
          <Col lg="4">
            <h1>Current certificates in system</h1>
            <Card>
              <CardHeader>
                <Input
                  placeholder="Code name/Name of certificate"
                  onChange={(e) => this.setState({keyCert: e.target.value})}
                />
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                  <tr>
                    <th>Code name</th>
                    <th>Name</th>
                    <th>Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.certFilter(this.state.certs).length == 0 ? 
                  <tr style={{textAlign: "center", color:"gray"}}><td colSpan="100%">No certificate added</td></tr> 
                  : this.certFilter(this.state.certs).map(item => 
                    <React.Fragment key={item.id}>
                    <tr onClick={() => 
                      {
                        this.setState({open: item.id, openName: item.vname});
                        this.getUsers();
                      }}
                      style={ this.state.open == item.id ? { backgroundColor:"#c8ced3"}: null}
                    >
                    <td>{item.name}</td>
                    <td>{item.vname}</td>
                    <td><b style={{color: !item.active ? 'red' : 'green'}}>{item.active ? 'Active' : 'Deactive'}</b></td>
                  </tr>
                  
                  </React.Fragment>
                  )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>

          {this.state.open != null
              ? this.openList()
              : <Col lg='8'>
                  <div style={{display: 'flex',  justifyContent:'center',
                    alignItems:'center', height: '60vh'}}>
                      <h1 style={{color:'#b3b3b3'}}> Please select a certificate </h1>
                  </div>
                </Col>
          }
              
        </Row>
      </div>

    );
  }

  openList() {
    return (
      <React.Fragment>
      <Col lg="4">
        <h1>&nbsp;</h1>
        <Card>
          <CardHeader>{this.state.sittersNotIn.length} sitter
              {this.state.sittersNotIn.length == 1 ? ' doesn\'t have ' : 's don\'t have '} 
              '{this.state.openName}' certificate
          </CardHeader>
          <CardBody>
            <Input
              placeholder="Enter name/address"
              onChange={(e) => this.setState({key1: e.target.value})}
            />

            <Table responsive hover>
              <thead>
                <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                </tr>
              </thead>
              <tbody>
                {this.searchFilter(this.state.sittersNotIn, 1).length == 0 ? 
                  <tr style={{textAlign: "center", color:"gray"}}><td colSpan="100%">No sister added</td></tr> 
                  : this.searchFilter(this.state.sittersNotIn, 1).map(item => 
                  (<React.Fragment key={item.id}>
                  <tr>
                    <td colSpan='4'>
                      <b><a onClick={() => this.openUserInfo(item.id)} style={{cursor:'pointer'}}>
                        {item.nickname}
                      </a></b>
                    </td>

                    <td colSpan='4'>{item.phoneNumber}</td>

                    <td align='center'>
                      <Button block color="success" onClick={async() => {
                        await this.createSitterCert(item.id);
                        await this.getUsers();
                        }}>
                        <i className="fa fa-chevron-right"></i>
                      </Button>  
                    </td>
                  </tr>
                  </React.Fragment>
                  ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>

      <Col lg="4">
        <h1>&nbsp;</h1>
        <Card>
          <CardHeader>{this.state.sittersIn.length} sitter
              {this.state.sittersIn.length == 0 ? ' has' : 's have'} 
              &nbsp;'{this.state.openName}' certificate
          </CardHeader>
          <CardBody>
            <Input
              placeholder="Enter name/address"
              onChange={(e) => this.setState({key2: e.target.value})}
            />

            <Table responsive hover>
              <thead>
                <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                </tr>
              </thead>
              <tbody>
                {this.searchFilter(this.state.sittersIn, 2).length == 0 ? 
                  <tr style={{textAlign: "center", color:"gray"}}><td colSpan="100%">No sister added</td></tr> 
                  : this.searchFilter(this.state.sittersIn, 2).map(item => 
                  (<React.Fragment key={item.id}>
                  <tr>
                    <td align='center'>
                      <Button block color="danger" onClick={async() => {
                        await this.destroySitterCert(item.id);
                        await this.getUsers();
                      }}>
                        <i className="fa fa-chevron-left"></i>
                      </Button>  
                    </td>

                    <td colSpan='4'>
                      <b><a onClick={() => this.openUserInfo(item.id)} style={{cursor:'pointer'}}>
                        {item.nickname}
                      </a></b>
                    </td>

                    <td colSpan='4'>{item.phoneNumber}</td>
                  </tr>
                  </React.Fragment>
                  ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>

      {this.state.openInfo ? 
          <Detail isOpen={true} userId={this.state.openInfoUser} closeMethod={this.openUserInfo}/> 
          : null
      }
      </React.Fragment>
    )
  }

  searchFilter(list, type) {
    let result = [];
    const searchKey = type == 1 ? this.state.key1 : this.state.key2;
    if (list) {
      list.map((item) => {
        if (
          item.nickname
            .toUpperCase()
            .indexOf(searchKey.toUpperCase()) != -1 ||
          item.phoneNumber
            .toUpperCase()
            .indexOf(searchKey.toUpperCase()) != -1
        )
        result.push(item);
      });
    }
    return result;
  }

  certFilter(list) {
    let result = [];
    const searchKey = this.state.keyCert;
    if (list) {
      list.map((item) => {
        if (
          item.name
            .toUpperCase()
            .indexOf(searchKey.toUpperCase()) != -1 ||
          item.vname
            .toUpperCase()
            .indexOf(searchKey.toUpperCase()) != -1
        )
        result.push(item);
      });
    }
    return result;
  }

  openUserInfo = (userId) => {
    this.setState({ 
      openInfo: !this.state.openInfo,
      openInfoUser: userId
    });
  }
}

export default Tables;
