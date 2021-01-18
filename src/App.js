import React, {useState, useEffect} from 'react'
import './App.css';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import * as ReactBootstrap from 'react-bootstrap';
import {DropdownButton, Dropdown} from 'react-bootstrap';


const App = () => {

  const [banks, setBanks] = useState([]);
  const [city, setCity] = useState("");
  const [searchValue, setSearchValue] = useState("");




  const columns = [ 
    {dataField : "ifsc", text : 'ifsc'},
    {dataField : "bank_id", text : 'bank_id'},
    {dataField : "branch", text : 'branch'},
    {dataField : "address", text : 'address'},
    {dataField : "city", text : 'city'},
    {dataField : "district", text : 'district'},
    {dataField : "state", text : 'state'}
  ];


  
  const getBankData = async () => {
    try{
      const data = await axios.get(`https://node-hosted-api.herokuapp.com/api/branches?q=${city}&limit=100&offset=0`);
      setBanks(data.data);
      var fetchedBankDetails = data.data;
    }catch (e){ 
      console.log(e);
    }
  };

  useEffect(() => {
    getBankData();
  }, [city])

  const handleDropdownClick = (evt) => {
    setCity(evt);
  };

  const updateInternalResult = (pattern) => {
    setBanks((banks.filter((bank) => {
      for (const key in bank){
        const val = bank[key];
        if (val.indexOf(pattern) != -1){
          return true;
        }
      }
      return false;
    })));
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    updateInternalResult(e.target.value);
  };


  return (
    <ReactBootstrap.Container >
      
      <ReactBootstrap.Row style={{padding:"100px"}}>
        <ReactBootstrap.Col>
          <ReactBootstrap.Row>
            <h1>Bank Branches</h1>
          </ReactBootstrap.Row>
          <ReactBootstrap.Row>
            <DropdownButton id="dropdown-basic-button" title="Cities" onSelect={handleDropdownClick}>
              <Dropdown.Item eventKey="Banglore">Banglore</Dropdown.Item>
              <Dropdown.Item eventKey="RATLAM">RATLAM</Dropdown.Item>
              <Dropdown.Item eventKey="NAGPUR">NAGPUR</Dropdown.Item>
              <Dropdown.Item eventKey="VARANASI">VARANASI</Dropdown.Item>
              <Dropdown.Item eventKey="BHARUCH">BHARUCH</Dropdown.Item>
            </DropdownButton>
          </ReactBootstrap.Row>
        </ReactBootstrap.Col>

        <ReactBootstrap.Col>
          <ReactBootstrap.Row>
            <h2>Enter text for pattern matching</h2>
          </ReactBootstrap.Row>
          <ReactBootstrap.Row>
            <input value={searchValue} onChange={handleChange}></input>
          </ReactBootstrap.Row>
        </ReactBootstrap.Col>
      </ReactBootstrap.Row>

      <ReactBootstrap.Row>
        <BootstrapTable 
          keyField="Name"
          data={banks}
          columns={columns}
          pagination={paginationFactory()}
        />
      </ReactBootstrap.Row>
    </ReactBootstrap.Container>
   );
};

export default App;
