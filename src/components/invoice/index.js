import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../misc/header';

import { getAllInvoicesAction } from '../../actions/invoices';
import { getAllClientsAction } from '../../actions/clients';

class Invoice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: null,
      searchValue: "",
    }
  }

  componentWillMount = () => {
    this.props.getAllInvoicesAction();
    this.props.getAllClientsAction();
    // get the clientId when being passed from clients view, so that
    // I can show the specific clients invoices
    let { query: { clientId = null } = {} } = this.props.location;
    if (clientId) {
      this.setState({
        searchValue: clientId
      });
    }
  }

  filter = (num) => {
    switch (num) {
      case 0:
        this.setState((prevState) => {
          return {
            status: null
          }
        });
        break;
      case 1:
        this.setState((prevState) => {
          return {
            status: 'draft'
          }
        });
        break;
      case 2:
        this.setState((prevState) => {
          return {
            status: 'sent'
          }
        });
        break;
      case 3:
        this.setState((prevState) => {
          return {
            status: 'paid'
          }
        });
        break;
      case 4:
        this.setState((prevState) => {
          return {
            status: 'refunded'
          }
        });
        break;
      case 5:
        this.setState((prevState) => {
          return {
            status: 'deleted'
          }
        });
        break;
      default:
        this.setState((prevState) => {
          return {
            status: null,
          }
        });
    }
  }

  search = (evt) => {
    const value = evt.target.value;
    this.setState(prevState => {
      return {
        searchValue: value.toLowerCase(),
      }
    })
  }

  render() {
    return (
      <div>
        <Header title="Invoices"></Header>
        <div className="status small-pad button-group border-bottom no-justify">
          <button className="margin-5px" onClick={ () => this.filter(0) }>All</button>
          <button className="margin-5px" onClick={ () => this.filter(1) }>Drafts</button>
          <button className="margin-5px" onClick={ () => this.filter(2) }>Sent</button>
          <button className="margin-5px" onClick={ () => this.filter(3) }>Paid</button>
          <button className="margin-5px" onClick={ () => this.filter(4) }>Refunded</button>
          <button className="margin-5px" onClick={ () => this.filter(5) }>Deleted</button>
          <input className="margin-5px" type="text" onChange={ this.search } value={this.state.searchValue} />
          <button className="primary margin-5px"><Link to="/invoices/create">New Invoice</Link></button>
        </div>
        <div className="invoice-list">
          {
            this.props.invoices.map(item => {
              if (this.state.status === item.status.toLowerCase() || this.state.status === null) {
                if ((!!this.state.searchValue === "" ||
                  ~item.id.toLowerCase().indexOf(this.state.searchValue) ||
                  ~item.status.toLowerCase().indexOf(this.state.searchValue) ||
                  ~item.clientName.toLowerCase().indexOf(this.state.searchValue) ||
                  ~item.clientId.toLowerCase().indexOf(this.state.searchValue)
                )) {
                  return (
                    <div className="invoice-item small-pad border-bottom" key={item.id}>
                      <Link to={"/invoices/edit/" + item.id}>
                        <button
                          className={"invoice-item-status " + item.status.toLowerCase()}
                        >
                          {item.status}
                        </button>
                        <div className="invoice-item-id-container">
                          <div className="invoice-item-id bold primary-font-color">Invoice #{item.id}</div>
                          <div className="invoice-item-id-date small-font">{item.createdOn}</div>
                        </div>
                        <div className="invoice-item-name-container">
                          <div className="invoice-item-name bold">{item.clientName}</div>
                          <div className="invoice-item-name-email small-font">{item.clientEmail}</div>
                        </div>
                        <div className="invoice-item-total-container align-right">
                          <div className="invoice-item-total bold">{item.currencyType} {item.total}</div>
                          <div className="invoice-item-total-sent small-font">{item.sendDate}</div>
                        </div>
                      </Link>
                      <div className="button-group">
                        <button className="invoice-item-pay margin-5px">Pay</button>
                        <button className="invoice-item-pay margin-5px">Send</button>
                        <Link to={{ pathname: "/clients", query: { clientId: item.clientId } }}>
                          <button className="invoice-item-pay margin-5px">Client</button>
                        </Link>
                      </div>
                    </div>
                  )
                } else {
                  return <div></div>
                }
              } else {
                return(
                  <div key={item.id}></div>
                )
              }
            })
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  invoices: state.invoices,
  clients: state.clients,
});

const mapDispatchToProps = (dispatch) => ({
  getAllInvoicesAction: () => dispatch(getAllInvoicesAction()),
  getAllClientsAction: () => dispatch(getAllClientsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
