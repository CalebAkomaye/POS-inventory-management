const ProductModal = (): JSX.Element => {
  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      {/* <button
        className="btn mx-4 my-4"
        onClick={() => {
          const modal = document.getElementById('my_modal_3') as HTMLDialogElement
          modal.showModal()
        }}
      >
        open modal
      </button> */}
      <dialog id="add_product" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <h3 className="font-bold text-lg text-center">Add New Product</h3>

            <div className="mt-5 flex flex-col justify-center items-center">
              <div className="flex flex-col pb-2 w-full max-w-xs">
                <label className="font-semibold pb-1" htmlFor="name">
                  Product name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter Product Name"
                  className="input input-bordered "
                />
              </div>
              <div className="flex  items-center pb-2 max-w-xs gap-x-2">
                <div>
                  <label className="font-semibold pb-1" htmlFor="sp">
                    Price
                  </label>
                  <input
                    type="number"
                    id="sp"
                    placeholder="Price"
                    className="input input-bordered"
                  />
                </div>
                <div>
                  <label className="font-semibold pb-1" htmlFor="qty">
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="qty"
                    placeholder="0"
                    className="input input-bordered w-11/12"
                  />
                </div>
              </div>
              <div className="flex flex-col pb-2  w-full max-w-xs">
                <label className="font-semibold pb-1" htmlFor="transaction">
                  Transaction Type
                </label>
                <select id="transaction" className="select select-bordered">
                  <option disabled selected>
                    Pick one
                  </option>
                  <option>New Stock</option>
                  <option>Return</option>
                </select>
              </div>
              <button className="my-4 btn btn-accent w-full max-w-xs">Save Product</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  )
}

export default ProductModal
