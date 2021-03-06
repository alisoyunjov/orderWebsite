
import React, { Component } from 'react'
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" 
import api from '../components/api'
import dateFormat from 'dateformat';
import Tabs from './Tabs';

import styled from 'styled-components'
import { BorderBottom } from '@material-ui/icons';

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
    margin-top: 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

class UpdateOrder extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/orders/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

class DeleteOrder extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do tou want to delete the order ${this.props.id} permanently?`,
            )
        ) {
            api.deleteOrderById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Complete</Delete>
    }
}


class CompanyOrders extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: [],
            columns: [],
            isLoading: false,
        }
        
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllOrders().then(orders => {
            this.setState({
                orders: orders.data.data,
                isLoading: false,
            })
        })
    }
    getTrProps = (state, rowInfo, colInfo, instance) => {
          return {
            style: {
              background: '#e1eef2'
            }
          }
      }
    //   renderEditable = cellInfo => {
    //     const cellValue = this.state.orders.data.data[cellInfo.index][cellInfo.column.id];
    
    //     return (
    //       <input
    //         placeholder="type here"
    //         name="input"
    //         type="text"
    //         onChange={this.handleInputChange.bind(null, cellInfo)}
    //         value={cellValue}
    //       />
    //     );
    //   };
    render() {
        const { orders, isLoading } = this.state
        const onChangeFct = () => console.log("onChange usually handled by redux");
        const columns = [
            {
                Header: 'Price 1',
                accessor: 'price1',
                filterable: true,
                minWidth: 100,
                render: props => <input value={props.row.price1} onChange={onChangeFct} />
            },
            {
                Header: 'Price 2',
                accessor: 'price2',
                filterable: true,
                minWidth: 100,
                

            },
            {
                Header: 'Submission',
                accessor: 'submission',
                filterable: true,
                minWidth: 100,
                
            },
            {
                Header: 'Requested Date',
                accessor: 'requestDay',
                filterable: true,
                minWidth: 140,
                Cell : (props)=>{
                    var strArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    const year = props.value.substring(0,4)
                    const m = props.value.substring(5,7)
                    const mm = parseInt(m)
                    const month = strArray[mm-1]
                    const day = props.value.substring(8,10)
                    const d = month + ' ' + day +  ', ' + year  

                    return <span>{d}</span>
                }
            },
            {
                Header: 'Ordered By',
                accessor: 'orderMadeBy',
                filterable: true,
                minWidth: 150,
            },
            {
                Header: 'Vendor 1',
                accessor: 'vendor1',
                filterable: true,
                minWidth: 250,
                render: props => <input value={props.row.vendor1} onChange={onChangeFct} />
            },
            {
                Header: 'Catalog 1',
                accessor: 'catalog1',
                filterable: true,
                minWidth: 150,
            },
            {
                Header: 'Vendor 2',
                accessor: 'vendor2',
                filterable: true,
                minWidth: 250,
            },
            {
                Header: 'Status',
                accessor: 'status',
                filterable: true,
                minWidth: 150,
            },
            {
                Header: 'Item Description',
                accessor: 'description',
                filterable: true,
                minWidth: 140,
            },
            {
                Header: 'Notes',
                accessor: 'notes',
                filterable: true,
                minWidth: 250,
            },
            {
                Header: 'Needed By',
                accessor: 'date',
                filterable: true,
                minWidth: 140,
                Cell : (props)=>{
                    var strArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    const year = props.value.substring(0,4)
                    const m = props.value.substring(5,7)
                    const mm = parseInt(m)
                    const month = strArray[mm-1]
                    const day = props.value.substring(8,10)
                    const d = month + ' ' + day +  ', ' + year  

                    return <span>{d}</span>
                }
            },


            // {
            //     Header: '',
            //     accessor: '',
            //     Cell: function(props) {
            //         return (
            //             <span>
            //                 <DeleteOrder id={props.original._id} />
            //             </span>
            //         )
            //     },
            // },
            // {
            //     Header: '',
            //     accessor: '',
            //     Cell: function(props) {
            //         return (
            //             <span>
            //                 <UpdateOrder id={props.original._id} />
            //             </span>
            //         )
            //     },
            // },
        ]

        let showTable = true
        if (!orders.length) {
            showTable = false
        }

        return (
            <Wrapper>
            <h1 style = {{marginBottom: '30px'}}>Company Orders</h1>
                {showTable && (
                    <ReactTable
                        data={orders}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={25}
                        showPageSizeOptions={true}
                        minRows={0}
                        getTrProps={this.getTrProps}
                    />
                )}
            </Wrapper>
        )
    }
}

export default CompanyOrders