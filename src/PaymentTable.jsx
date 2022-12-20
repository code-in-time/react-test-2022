import React, { useEffect, useState } from "react";
import { apiGetPayments } from "./utils/apis";

function PaymentTable({ data, pendingApprovalOnly }) {

  const renderAccountTable = (val) => {
    if (!val) {
      return <div>no account data</div>
    }
    return (<table>
      <tbody>
        <tr>
          <td>accountName</td>
          <td>{val.accountName}</td>
        </tr>
        <tr>
          <td>accountNumber</td>
          <td>{val.accountNumber}</td>
        </tr>
        <tr>
          <td>sortCode</td>
          <td>{val.sortCode}</td>
        </tr>
      </tbody>
    </table>)
  }

  const renderInfoTable = (val) => {
    if (!val) {
      return <div>no general data</div>
    }

    return (<table>
      <tbody>
        <tr>
          <td>paymentAmount</td>
          <td>{val.paymentAmount}</td>
        </tr>
        <tr>
          <td>paymentCurrency</td>
          <td>{val.paymentCurrency}</td>
        </tr>
        <tr>
          <td>paymentDate</td>
          <td>{val.paymentDate}</td>
        </tr>
        <tr>
          <td>paymentStatus</td>
          <td>{val.paymentStatus}</td>
        </tr>
        <tr>
          <td>paymentType</td>
          <td>{val.paymentType}</td>
        </tr>
      </tbody>
    </table>)
  }

  if (data.data && data.data.results) {

    const resultData = data.data.results
    return <div>
      <table className="table">
        <thead>
          <tr>
            <th>From Account</th>
            <th>To Account</th>
            <th>Info</th>
          </tr>
        </thead>
        <tbody>
          {resultData.map((rowData, index) => {
            // Check if only pending approval must be shown
            if( pendingApprovalOnly && rowData.paymentStatus !== 'P') {
              return
            } else {
            return (
                <tr key={index}>
                  <td>{renderAccountTable(rowData.fromAccount)}</td>
                  {/* // TODO toAccaunt - spelling mistake in property*/}
                  <td>{renderAccountTable(rowData.toAccaunt)}</td>
                  <td>{renderInfoTable(rowData)}</td>
                </tr>

            )
            }
          }
          )
          }
        </tbody>
      </table>
    </div >
  } else {
    return <div>NO DATA - please load data</div>
  }
};

export default PaymentTable;