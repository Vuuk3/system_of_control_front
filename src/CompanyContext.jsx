import { createContext, useContext, useState } from "react";
import { getCompanyRequest, updateCompanyRequest } from "./api/company";

const CompanyContext = createContext(null);

const useCompany = () => useContext(CompanyContext);

function CompanyProvider({ children }) {
  const [companyData, setCompanyData] = useState(null);

  const getCompany = async () => {
    const response = await getCompanyRequest();
    setCompanyData(response.data);
    return response.data;
  };

  const updateCompany = async (data) => {
    const response = await updateCompanyRequest(data);
    setCompanyData(response.data);
    return response.data;
  };

  return (
    <CompanyContext.Provider value={{ companyData, getCompany, updateCompany }}>
      {children}
    </CompanyContext.Provider>
  );
}

export { useCompany, CompanyProvider };
