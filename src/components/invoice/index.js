import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../misc/header';


class Invoice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shownInvoices: [],
    }
  }

  componentWillMount = () => {
    if (this.state.shownInvoices.length === 0) {
      this.setState({
        shownInvoices: this.props.invoices
      })
    }
  }

  filter = (num) => {
    switch (num) {
      case 0:
        this.setState((prevState) => {
          return {
            shownInvoices: this.props.invoices
          }
        });
        break;
      case 1:
        this.setState((prevState) => {
          return {
            shownInvoices: this.props.invoices.filter(item => {
              return item.status === 'Draft';
            })
          }
        });
        break;
      case 2:
        this.setState((prevState) => {
          return {
            shownInvoices: this.props.invoices.filter(item => {
              return item.status === 'Sent';
            })
          }
        });
        break;
      case 3:
        this.setState((prevState) => {
          return {
            shownInvoices: this.props.invoices.filter(item => {
              return item.status === 'Paid';
            })
          }
        });
        break;
      case 4:
        this.setState((prevState) => {
          return {
            shownInvoices: this.props.invoices.filter(item => {
              return item.status === 'Refunded';
            })
          }
        });
        break;
      case 5:
        this.setState((prevState) => {
          return {
            shownInvoices: this.props.invoices.filter(item => {
              return item.status === 'Deleted';
            })
          }
        });
        break;
      default:
        this.setState((prevState) => {
          return {
            shownInvoices: this.props.invoices,
          }
        });
    }
  }

  search = (evt) => {
    const value = evt.target.value;

    this.setState(prevState => {
      return {
        shownInvoices: this.props.invoices(item => {
          return item.id.substring(value) ||
          item.status.substring(value) ||
          item.clientName.substring(value)
        })
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
          <input className="margin-5px" type="text" onChange={ this.search } />
          <button className="primary margin-5px"><Link to="/invoices/create">New Invoice</Link></button>
        </div>
        <div className="invoice-list">
          {
            this.state.shownInvoices.map(item => {
              return (
                <div className="invoice-item small-pad border-bottom" key={item.id}>
                  <Link to={"/invoices/edit/" + item.id}>
                    <button className="invoice-item-status primary">{item.status}</button>
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
                    <button className="invoice-item-pay margin-5px">Client</button>
                    <button className="invoice-item-pay margin-5px">View</button>
                  </div>
                </div>
              )
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
})

export default connect(mapStateToProps)(Invoice);
