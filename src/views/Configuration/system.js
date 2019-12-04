import React, { Component } from 'react';
import {
  Card,
  CardBody,
  Col,
  Row,
  Table,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
  Jumbotron,
} from 'reactstrap';
import Api from '../../api/api_helper';
import moment from 'moment';
import { formater } from '../../utils/MoneyFormater';

class Configuration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '',
      remindBeforeDuration_0: 0,
      remindBeforeDuration_1: 0,
      checkinTimeout: 0,
      checkoutTimeout: 0,
      timezone: 'Asia/Bangkok',
      maxTravelDistance: 0,
      circleWeight: 0,
      ratingWeight: 0,
      distanceWeight: 0,
      minimumFeedback: 0,
      refundPercentage: 90,
      officeHourStart: '8:00',
      officeHourEnd: '17:00',
      UNDER_6_MONTHS: 0,
      BASE: 0,
      UNDER_18_MONTHS: 0,
      UNDER_6_YEARS: 0,
    };
  }

  componentWillMount() {
    Api.get('configuration/').then((res) =>
      this.setState({
        remindBeforeDuration_0: res.remindBeforeDuration_0,
        remindBeforeDuration_1: res.remindBeforeDuration_1,
        checkinTimeout: res.checkinTimeout,
        checkoutTimeout: res.checkoutTimeout,
        timezone: res.timezone,
        maxTravelDistance: res.maxTravelDistance,
        circleWeight: res.circleWeight,
        ratingWeight: res.ratingWeight,
        distanceWeight: res.distanceWeight,
        minimumFeedback: res.minimumFeedback,
        refundPercentage: res.refundPercentage,
        officeHourStart: res.officeHourStart,
        officeHourEnd: res.officeHourEnd,
      }),
    );
    Api.get('pricings').then(res => {
      console.log(res[0])
      this.setState({
        BASE: res[0].baseAmount, 
        UNDER_6_YEARS: res[1].baseAmount,
        UNDER_18_MONTHS: res[2].baseAmount,
        UNDER_6_MONTHS: res[3].baseAmount,
      })
    })
    // console.log(res));
  }

  handleSearchInput = (event) => {
    // console.log(event.target.value);
    this.state[event.target.id] = event.target.value;
    this.forceUpdate();
    // this.setState({event.target.id: event.target.value});
  };

  submit = () => {
    let body = {
      remindBeforeDuration_0: this.state.remindBeforeDuration_0,
      remindBeforeDuration_1: this.state.remindBeforeDuration_1,
      checkinTimeout: this.state.checkinTimeout,
      checkoutTimeout: this.state.checkoutTimeout,
      timezone: this.state.timezone,
      maxTravelDistance: this.state.maxTravelDistance,
      circleWeight: this.state.circleWeight,
      ratingWeight: this.state.ratingWeight,
      distanceWeight: this.state.distanceWeight,
      minimumFeedback: this.state.minimumFeedback,
      refundPercentage: this.state.refundPercentage,
      officeHourStart: this.state.officeHourStart,
      officeHourEnd: this.state.officeHourEnd
    };
    // console.log(body);
    Api.put('configuration/1', body);
    let tmp = [this.state.BASE, this.state.UNDER_6_YEARS, this.state.UNDER_18_MONTHS, this.state.UNDER_6_MONTHS];
    for (let i = 1; i < 5; i++){
      let pricingsBody = { baseAmount: tmp[i-1] }
      Api.put('pricings/' + i.toString(), pricingsBody);
    }
  };

  render() {
    return (
      <Card style={{ alignItems: 'left' }}>
        <CardBody>
          <Jumbotron>
            <h1>System Setting</h1>
            <hr className="my-2" />
            <FormGroup style={{ marginTop: 30 }}>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>remindBeforeDuration_0</InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="input ..."
                  id="remindBeforeDuration_0"
                  value={this.state.remindBeforeDuration_0}
                  onChange={this.handleSearchInput}
                />
              </InputGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>remindBeforeDuration_1</InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="input ..."
                  id="remindBeforeDuration_1"
                  value={this.state.remindBeforeDuration_1}
                  onChange={this.handleSearchInput}
                />
              </InputGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>checkinTimeout</InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="input ..."
                  id="checkinTimeout"
                  value={this.state.checkinTimeout}
                  onChange={this.handleSearchInput}
                />
              </InputGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>checkoutTimeout</InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="input ..."
                  id="checkoutTimeout"
                  value={this.state.checkoutTimeout}
                  onChange={this.handleSearchInput}
                />
              </InputGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>timezone</InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="input ..."
                  id="timezone"
                  value={this.state.timezone}
                  onChange={this.handleSearchInput}
                />
              </InputGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>maxTravelDistance</InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="input ..."
                  id="maxTravelDistance"
                  value={this.state.maxTravelDistance}
                  onChange={this.handleSearchInput}
                />
              </InputGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>circleWeight</InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="input ..."
                  id="circleWeight"
                  value={this.state.circleWeight}
                  onChange={this.handleSearchInput}
                />
              </InputGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>ratingWeight</InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="input ..."
                  id="ratingWeight"
                  value={this.state.ratingWeight}
                  onChange={this.handleSearchInput}
                />
              </InputGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>distanceWeight</InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="input ..."
                  id="distanceWeight"
                  value={this.state.distanceWeight}
                  onChange={this.handleSearchInput}
                />
              </InputGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>minimumFeedback</InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="input ..."
                  id="minimumFeedback"
                  value={this.state.minimumFeedback}
                  onChange={this.handleSearchInput}
                />
              </InputGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>refundPercentage</InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="input ..."
                  id="refundPercentage"
                  value={this.state.refundPercentage}
                  onChange={this.handleSearchInput}
                />
              </InputGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>officeHourStart</InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="input ..."
                  id="officeHourStart"
                  value={this.state.officeHourStart}
                  onChange={this.handleSearchInput}
                />
              </InputGroup>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>officeHourEnd</InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="input ..."
                  id="officeHourEnd"
                  value={this.state.officeHourEnd}
                  onChange={this.handleSearchInput}
                />
              </InputGroup>

              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>BASE</InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="input ..."
                  id="BASE"
                  value={this.state.BASE}
                  onChange={this.handleSearchInput}
                />
              </InputGroup>

              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>UNDER_6_YEARS</InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="input ..."
                  id="UNDER_6_YEARS"
                  value={this.state.UNDER_6_YEARS}
                  onChange={this.handleSearchInput}
                />
              </InputGroup>

              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>UNDER_18_MONTHS</InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="input ..."
                  id="UNDER_18_MONTHS"
                  value={this.state.UNDER_18_MONTHS}
                  onChange={this.handleSearchInput}
                />
              </InputGroup>

              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>UNDER_6_MONTHS</InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="input ..."
                  id="UNDER_6_MONTHS"
                  value={this.state.UNDER_6_MONTHS}
                  onChange={this.handleSearchInput}
                />
              </InputGroup>

              <InputGroupAddon addonType="append">
                <Button
                  type="submit"
                  size="md"
                  color="primary"
                  onClick={() => {
                    if (window.confirm('Are you sure?')) {
                      this.submit();
                    }
                  }}
                >
                  Save
                </Button>
              </InputGroupAddon>
            </FormGroup>
          </Jumbotron>
        </CardBody>
      </Card>
    );
  }
}

export default Configuration;
