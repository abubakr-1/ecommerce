const Spinner = () => {
  return (
    <div className="absolute top-0 left-0  flex flex-col justify-center h-screen w-screen">
      <div className="m-auto h-20 w-20 rounded-full border-y-4 border-y-secondary spinner"></div>
    </div>
  );
};

export default Spinner;
