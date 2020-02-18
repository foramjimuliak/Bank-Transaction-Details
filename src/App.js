import React, { Component } from 'react';
import styled from 'styled-components';
import {AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import './App.css';

import settings from './settings'

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
      {
        headerName: "Transaction Date",
        field: "transactionDate",
        sortable: true,
        comparator: settings.dateComparator
      },
      {
        headerName: "Transaction Amount",
        field: "transactionAmount",
        sortable: true,
        sortingOrder: ["desc"],
      },
      {
        headerName: "Current Balance",
        field: "currentBalance"
      },
      {
        headerName: "Transaction Type",
        field: "transactionType",
        sortable: true,
        filter: true
      },
      {
        headerName: "Reference",
        field: "reference"
      }],
      paginationPageSize: 10
    }
  }

  async getTransactionDetails(){
    fetch(settings.baseUrl + 'data.json')
      .then((res) => res.json())
      .then((data) => {
        this.setState({rowData: data});
      })
  }
  
  componentDidMount() {
    this.getTransactionDetails();
  }

  render() {
    return (
      <MainContainer>
        <div
          className="ag-theme-balham"
          style={{
          height: '350px',
          width: '1000px' }}>
          <h1>Recent Bank Transactions</h1>
          <AgGridReact
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
            pagination={true}
            paginationPageSize={this.state.paginationPageSize}>
          </AgGridReact>
        </div>
      </MainContainer>
    );
  }
}

export default App;