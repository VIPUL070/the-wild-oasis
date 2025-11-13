import { useCabins } from "./useCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";

function CabinTable() {
  const { cabins, isLoading, error } = useCabins();

  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading cabins: {error.message}</div>;

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      {cabins.map((cabin) => {
        return <CabinRow cabin={cabin} key={cabin.id} />;
      })}
    </Table>
  );
}

export default CabinTable;
