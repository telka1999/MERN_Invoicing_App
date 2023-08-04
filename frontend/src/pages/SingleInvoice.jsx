import { useParams } from "react-router-dom";

export const SingleInvoice = () => {
  const { id } = useParams();
  console.log(id);
  return <div>Single Invoice</div>;
};
