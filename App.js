import "./styles.css";
import { useState } from "react";

const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  return (
    <label className="label huge">
      <h3>{isDeposit ? "Deposit" : "Cash Back"}</h3>
      <input
        id="number"
        type="number"
        placeholder="Enter the Amount"
        onChange={onChange}
      />
      <input id="submit" type="submit" disabled={!isValid} />
    </label>
  );
};
export default function App() {
  const [deposit, setDeposit] = useState(0);
  const [totalState, setTotalState] = useState(0);
  const [isDeposit, setIsDeposit] = useState(true);
  const [atmMode, setAtmMode] = useState("");
  const [validTransaction, setValidTransaction] = useState(false);

  let status = `Acount balance $ ${totalState}`;

  const handleChange = (event) => {
    setDeposit(Number(event.target.value));

    if (Number(event.target.value) <= 0) {
      setValidTransaction(false);
      return;
    } else if (
      atmMode === "Cash Back" &&
      Number(event.target.value) > totalState
    ) {
      setValidTransaction(false);
      alert("Sorry mate, you don't have enough cash for that.");
    } else {
      setValidTransaction(true);
    }
  };

  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    if (newTotal >= 0) {
      setTotalState(newTotal);
    } else {
      alert("No balance");
    }

    event.preventDefault();
  };

  const handleModeSelect = (event) => {
    setAtmMode(event.target.value);
    if (event.target.value === "Deposit") {
      setIsDeposit(true);
    } else {
      setIsDeposit(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Refresh here to see your changes</p>
      <h2>
        Account Balance <span> $ {totalState}</span>
      </h2>
      <div className="atm-form">
        <label>Select an action below to continue</label>
        <br />
        <select
          onChange={(e) => handleModeSelect(e)}
          name="mode"
          id="mode-select"
        >
          <option id="no-selection" value=""></option>
          <option id="deposit-selection" value="Deposit">
            Deposit
          </option>
          <option id="cashback-selection" value="Cash Back">
            Cash Back
          </option>
        </select>
        {atmMode && (
          <ATMDeposit
            onChange={handleChange}
            isDeposit={isDeposit}
            isValid={validTransaction}
          />
        )}
      </div>
    </form>
  );
}
