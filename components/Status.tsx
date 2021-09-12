function Status() {
  return (
    <div className="flex space-x-1 items-center max-w-md ">
      <StockStatus />
    </div>
  );
}

interface StatusProps {
  item: string;
}

const StatusItem: React.FC<StatusProps> = ({ item }) => {
  return (
    <img className="object-contain" src={`/${item}.svg`} alt="status icon" />
  );
};

const StockStatus = () => {
  let stockHealth = [...Array(8)];
  let extraHealth = [...Array(20)];
  return (
    <div className="flex space-y-1  flex-wrap">
      <div></div>
      {stockHealth.map((e, i) => (
        <StatusItem item={"heart"} key={i} />
      ))}
      {extraHealth.map((e, i) => (
        <StatusItem item={"extra_heart"} key={i} />
      ))}
    </div>
  );
};

export default Status;
