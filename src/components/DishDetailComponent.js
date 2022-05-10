import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';


    function RenderDish({dish}) {
      if (dish != null)
        return(
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
      else
        return(
            <div></div>
        );
    }

    function RenderComments({comments}) {
      //return (<div>test</div>)
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

    const DishDetail = (props) => {
      if(props.dish != null)
      {
        return (
          <div className="container">
              <div className="row">
                <div className="col-12 col-md-5 m-1">
                  <RenderDish dish={props.dish}></RenderDish>
                </div>
                <div className="col-12 col-md-5 m-1">
                  <RenderComments comments={props.dish.comments}></RenderComments>
                </div>
              </div>
          </div>
        );
      }
    }

export default DishDetail;