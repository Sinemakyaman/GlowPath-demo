import React, { useState } from "react";
import Welcome from "./components/Welcome";
import FormPage from "./components/FormPage";
import Dashboard from "./components/Dashboard";
import ThankYou from "./components/ThankYou";

function App() {
  const [step, setStep] = useState(0);
  const [incidentData, setIncidentData] = useState(null);

  const handleFormSubmit = (data) => {
    setIncidentData(data);
    setStep(2);
  };

  const handleThankYouClose = () => {
    setStep(0);
    setIncidentData(null);
  };

  return (
    <>
      {step === 0 && <Welcome nextStep={() => setStep(1)} />}
      {step === 1 && <FormPage onSubmit={handleFormSubmit} />}
      {step === 2 && (
        <>
          <Dashboard incidentData={incidentData} />
          <ThankYou onClose={handleThankYouClose} />
        </>
      )}
    </>
  );
}

export default App;