import React from 'react';
import {connect} from 'react-redux';

class Details extends React.Component{

    render(){
        console.log('Deatails.js line 7 .Print STORE', this.props.store)
        const details = this.props.store.selectedItem
        return(
            <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">{details.name}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className='CardImageTop' className="card mb-3">
                      <div className="row no-gutters">
                        <div className="col-md-5">
                          <img src={details.image} className="card-img" alt="..."/>
                          <p className='btn btn-danger'><b>$ {details.price} </b></p>
                        </div>
                        <div className="col-md-7">
                          <div className="card-body">
                            <h5 className="card-title">Ingredients:</h5>
                            <p className="card-text">    {details.description} </p>
                            <p className="card-text"><small className="text-muted">Time to Cook:  {details.timeToCook + ' min'}</small></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
            )
    }
}  

const mapStateToProps=(store)=>({store})

export default connect(mapStateToProps,null)(Details)