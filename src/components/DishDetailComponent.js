import React, { Component } from 'react';
import { Button, Card, CardImg, CardText, CardBody, CardTitle, Modal, ModalHeader, ModalBody, Label, Col, Row} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class DishDetail extends Component {
  constructor(props) {
      super(props);

      this.state = {
          isModalOpen: false, 
          customerName: '',
          rating: '',
          comment: '',
          touched: {
            customerName: false,
          }
      };
      this.toggleModal = this.toggleModal.bind(this)
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleBlur = this.handleBlur.bind(this);

  }

  toggleModal() {
      this.setState({
          isModalOpen: !this.state.isModalOpen
      });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  validate(name) {
    const errors = {
        name: ''
    };

    if (this.state.touched.name && name.length < 2)
        errors.customerName = 'First Name should be >= 2 characters';
    else if (this.state.touched.name && name.length > 15)
        errors.customerName = 'First Name should be <= 15 characters';

    return errors;
  }

  handleBlur = (field) => (evt) => {
    this.setState({
        touched: { ...this.state.touched, [field]: true }
    });
  }

  render()
  {
    if(this.props.dish != null)
    {
      return (
        <div>
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-5 m-1">
                {this.renderDish()}
                {/* <RenderDish dish={this.props.dish}></RenderDish> */}
              </div>
              <div className="col-12 col-md-5 m-1">
                <div className="row">
                  {this.renderComments()}
                  {/* <RenderComments comments={this.props.comments}></RenderComments> */}
                </div>
                <div className="row">
                  <Button outline onClick={this.toggleModal}><span className="fa fa-pen fa-lg"></span> Submit Comment</Button>
                </div>
              </div>
            </div>
          </div>
  
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Leave Comment</ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={this.handleSubmit}>
                <Row className="form-group">
                  <Label htmlFor="rating" md={2}>Rading</Label>
                  <Col md={10}>
                    <Control.select  model=".rating" id="rating" name="rating"
                      className="form-control">
                        <option value={"1"}>1</option>
                        <option value={"2"}>2</option>
                        <option value={"3"}>3</option>
                        <option value={"4"}>4</option>
                        <option value={"5"}>5</option>
                    </Control.select>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="customerName" md={2}>Name</Label>
                  <Col md={10}>
                    <Control.text model=".customerName" id="customerName" name="customerName"
                        placeholder="Customer Name"
                        className="form-control"
                        validators={{
                            required, minLength: minLength(2), maxLength: maxLength(10)
                        }}
                          />
                    <Errors
                        className="text-danger"
                        model=".customerName"
                        show="touched"
                        messages={{
                            required: 'Required',
                            minLength: 'Must be greater than 2 characters',
                            maxLength: 'Must be 10 characters or less'
                        }}
                      />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="comment" md={2}>Comment</Label>
                  <Col md={10}>
                    <Control.textarea model=".comment" id="comment" name="comment"
                        rows="12"
                        className="form-control" />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={{size:10, offset: 2}}>
                      <Button type="submit" color="primary">
                      Send Feedback
                      </Button>
                  </Col>
                </Row>
              </LocalForm>
            </ModalBody>
          </Modal>
        </div>
      );
    }
    else
    {
      return (<div></div>);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  renderDish() {
    if (this.props.dish != null)
      return(
        <Card>
          <CardImg top src={this.props.dish.image} alt={this.props.dish.name} />
          <CardBody>
            <CardTitle>{this.props.dish.name}</CardTitle>
            <CardText>{this.props.dish.description}</CardText>
          </CardBody>
        </Card>
      );
    else
      return(
          <div></div>
      );
  }

  renderComments() {
    //return (<div>test</div>)
    if(this.props.comments == null)
    {
      return (<div></div>)
    }
    let comments = this.props.comments;
    console.log("test : " + comments)
    
    const listItems = comments.map(
    (comment) => {
      return (
          <ul type="disc">
              <li>
                  <p>{comment.comment}</p>
                  <p>{comment.author}</p>
                  <p>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
              </li>
          </ul>
      )
    }); 
    return (
      <div class="container"><h4>Comments </h4>
      {listItems}
      </div>
    )
  }
}

export default DishDetail;