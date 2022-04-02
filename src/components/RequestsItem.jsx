const RequestsItem = ({ request, id }) => {
  return (
    <main className="card w-full mt-8 card-compact glass card-bordered">
      <div className="card-body">
        <h1 key={request.id} className="card-title font-bold">
          {request.data.name} -
        </h1>
        <p className="font-semibold">
          You will earn{" "}
          <span className="badge badge-outline font-semibold mt-1">
            ${request.data.price}
          </span>{" "}
          when your product will be shipped
        </p>
      </div>
    </main>
  );
};
export default RequestsItem;
