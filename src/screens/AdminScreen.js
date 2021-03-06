import React, { Component } from "react";
import Navigation from "../components/Navigation";
import ButtonGroup from "../components/ButtonGroup";
import AntiqueService from "../service/AntiqueService";
import Pagination from "react-js-pagination";
class AdminScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isError: false,
      demo: false,
      totalPages: null,
      totalItemsCount: null,
      itemsCountPerPage: null,
      activePage: 1
    };
  }
  setError = value => {
    if (value) {
      AntiqueService.getAllAntique(1, "DESC").then(response => {
        console.log("updated");
        this.setState({ list: response.data.content });
      });
    } else {
      this.setState({ isError: value });
    }
  };

  async componentDidMount() {
    await AntiqueService.getAllAntique(1, "DESC").then(response => {
      this.setState({
        list: response.data.content,
        totalPages: response.data.totalPages,
        totalItemsCount: response.data.totalElements,
        itemsCountPerPage: response.data.size
      });
    });
  }

  handlePageChange = pageNumber => {
    this.setState({ activePage: pageNumber });
    AntiqueService.getAllAntique(pageNumber, "DESC").then(response => {
      this.setState({ list: response.data.content });
    });
  };

  render() {
    return (
      <>
        <Navigation />
        {this.state.isError && (
          <div className="alert alert-danger">
            An error occured while deleting ! Try Again.
          </div>
        )}
        <div className="container mt-5">
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th scope="col">id</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.list &&
                this.state.list !== [] &&
                this.state.list.map((item, index) => {
                  return (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td className="tr-desc">{item.description}</td>
                      <td>{item.price}</td>
                      <td>
                        <ButtonGroup id={item.id} callback={this.setError} />
                      </td>
                    </tr>
                  );
                })}
              {this.state.list === [] && (
                <tr>
                  <td>There is no any antique</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="row">
            <div className="col-md-6 offset-md-3 d-flex justify-content-center  align-items-center">
              <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={this.state.itemsCountPerPage}
                totalItemsCount={this.state.totalItemsCount}
                pageRangeDisplayed={3}
                itemClass="page-item"
                linkClass="page-link"
                onChange={this.handlePageChange}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AdminScreen;
