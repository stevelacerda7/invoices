import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../misc/header';
import { connect } from 'react-redux';

import { getAllClientsAction } from '../../actions/clients';

class Client extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shownClients: null,
      searchValue: "",
    }
  }

  componentWillMount() {
    this.props.getAllClientsAction();
    let { query: { clientId = null } = {} } = this.props.location;
    if (clientId) {
      this.setState({
        searchValue: clientId,
      })
    } else {
      this.setState({
        searchValue: ""
      })
    }
  }

  filter = (num) => {
    switch (num) {
      case 0:
        this.setState((prevState) => {
          return {
            shownClients: this.props.clients
          }
        });
        break;
      case 1:
        this.setState((prevState) => {
          return {
            shownClients: this.props.clients.filter(item => {
              return item.status.toLowerCase() === 'delinquent';
            })
          }
        });
        break;
      case 2:
        this.setState((prevState) => {
          return {
            shownClients: this.props.clients.filter(item => {
              return item.status.toLowerCase() === 'deleted';
            })
          }
        });
        break;
      default:
        this.setState((prevState) => {
          return {
            shownClients: this.props.clients,
          }
        });
    }
  }

  search = (evt) => {
    const value = evt.target.value.toLowerCase();
    this.setState({
      searchValue: value
    })
  }

  render = () => {
    let clients = this.state.shownClients !== null ? this.state.shownClients : this.props.clients;
    return (
      <div>
        <Header title="Clients"></Header>
        <div className="status small-pad button-group border-bottom no-justify">
          <button className="margin-5px" onClick={ () => this.filter(0) }>All</button>
          <button className="margin-5px" onClick={ () => this.filter(1) }>Delinquents</button>
          <button className="margin-5px" onClick={ () => this.filter(2) }>Deleted</button>
          <input
            className="margin-5px"
            type="text"
            onChange={ this.search }
            defaultValue={this.state.searchValue}
          />
          <button className="primary margin-5px"><Link to="/clients/create">New Client</Link></button>
        </div>
        <div className="invoice-list">
          <table>
            <tbody>
              {
                clients.map(item => {
                  if (this.state.searchValue === "" || this.state.searchValue === item.id) {
                    let total = item.invoices.reduce((acc, invoice) => {
                      return (+acc + Number(invoice.total)).toFixed(2);
                    }, 0);
                    let statuses = item.invoices.map(invoice => {
                      let statusObj = {
                        paid: null,
                        unpaid: null,
                        delinquent: null,
                      }
                      let invoiceStatus = invoice.status.toLowerCase();
                      if (invoiceStatus === "delinquent") {
                        statusObj.delinquent += 1;
                      } else if (invoiceStatus === "paid") {
                        statusObj.paid += 1;
                      } else {
                        statusObj.unpaid += 1;
                      }
                      return statusObj;
                    });
                    return (
                      <tr key={item.id}>
                        {/*<div className={"invoice-item small-pad border-bottom " + item.id.substring()} key={item.id}>*/}
                        <td>
                          <Link className="flex-me table-link-container" to={"/clients/edit/" + item.id}>
                            <button className="invoice-item-status primary">{item.creditCard ? "On File" : "No Card"}</button>
                          </Link>
                        </td>
                        <td>
                          <Link className="flex-me table-link-container" to={"/clients/edit/" + item.id}>
                            <div className="invoice-item-name-container">
                              <div className="invoice-item-name bold">{item.clientName}</div>
                              <div className="invoice-item-name-email small-font">{item.clientEmail}</div>
                              <div
                                className={ "invoice-item-name-status small-font" +
                                  (item.status === "deleted" ? " deleted" : "") +
                                  (item.status === "delinquent" ? " delinquent" : "")
                                }
                                >
                                {item.status}
                              </div>
                            </div>
                          </Link>
                        </td>
                        <td>
                          <Link className="flex-me table-link-container" to={"/clients/edit/" + item.id}>
                            <div className="invoice-item-id-container">
                              <div className="invoice-item-id bold primary-font-color">
                                {item.invoices.length + (item.invoices.length > 1 ? " invoices" : " invoice")}
                              </div>
                              <div className="invoice-item-total-sent small-font">
                                {
                                  statuses.map((status, i) => {
                                    return (
                                      <div key={i}>
                                        {status.paid ? <span>{status.paid + " paid"}</span> : ""}
                                        {status.unpaid ? <span>{status.unpaid + " unpaid"}</span> : ""}
                                        {status.delinquent ? <span>{status.delinquent + " delinquent"}</span> : ""}
                                      </div>
                                    )
                                  })
                                }
                              </div>
                            </div>
                          </Link>
                        </td>
                        <td>
                          <Link className="flex-me table-link-container" to={"/clients/edit/" + item.id}>
                            <div className="invoice-item-total-container align-right">
                              <div className="invoice-item-total bold">{item.defaultCurrency} {total}</div>
                              <div className="invoice-item-total-sent small-font">Total Invoiced</div>
                            </div>
                          </Link>
                        </td>
                        <td>
                          <div className="button-group align-center">
                            {/*}<button className="invoice-item-pay margin-5px">New Invoice</button>*/}
                            <Link to={{ pathname: "/invoices", query: { clientId: item.id } }}>
                              <button className="invoice-item-pay margin-5px">View Invoices</button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    )
                  } else {
                    return <div></div>
                  }
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  clients: state.clients,
  invoices: state.invoices,
});

const mapDispatchToProps = (dispatch) => ({
  getAllClientsAction: () => dispatch(getAllClientsAction())
});


export default connect(mapStateToProps, mapDispatchToProps)(Client);
