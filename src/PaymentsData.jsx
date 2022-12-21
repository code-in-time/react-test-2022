import React, { useEffect, useState } from "react";
import { apiGetPayments } from "./utils/apis";
import PaymentTable from "./PaymentTable";

function PaymentsData() {

  // This will be for the payments data. The initial state is an empty object
  const [paymentsData, setPaymentsData] = useState({});
  const [pendingApprovalOnly, setPendingApprovalOnly] = useState(false);

  const changePendingApprovalOnly = () => {
    setPendingApprovalOnly(!pendingApprovalOnly);
  };

  const loadPaymentData = async (queryParam) => {
    const data = await apiGetPayments(queryParam);
    // Set the data
    setPaymentsData(data);
  }

  const renderLoadNextButton = (data) => {
    // TODO is this a spelling mistake metaDatal
    // Check if there is more data to render
    if (data.data && data.data.metaDatal.hasMoreElements) {

      // Get the next page index
      const nextPageIndex = data.data.metaDatal.nextPageIndex

      return (<button type="button" onClick={() => loadPaymentData(`?pageIndex=${nextPageIndex}`)}>LOAD NEXT PAGE KEY: ({nextPageIndex})</button>)
    } else {
      return;
    }
  }

  const resetData = () => {
    setPaymentsData({});
    setPendingApprovalOnly(false);
  }

  const renderLoadButton = (data) => {
    // Check if there is more data to render
    if (!data.data) {

      return (
        <button type="button" onClick={() => loadPaymentData()}>LOAD FRESH DATA</button>)
    } else {
      return (<button type="button" onClick={() => resetData()}>CLEAR</button>)
    }

  }

  return <div>
    <div className="card">
      <div className="card-body">
        {renderLoadButton(paymentsData)}
        {renderLoadNextButton(paymentsData)}
        <div>
          <label>
            <input
              checked={pendingApprovalOnly}
              onChange={changePendingApprovalOnly}
              type="checkbox" />
            Show pending approval only
          </label>
        </div>
      </div>
    </div>
    <div className="card">
      <div className="card-body">
        <PaymentTable data={paymentsData} pendingApprovalOnly={pendingApprovalOnly} />
      </div>
    </div>
  </div>
};

export default PaymentsData;
