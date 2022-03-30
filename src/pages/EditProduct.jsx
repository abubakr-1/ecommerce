import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { getAuth } from "firebase/auth";
import { serverTimestamp } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import Spinner from "../components/layout/Spinner";
import { useAuthStatus } from "../hooks/useAuthStatus";

const EditProduct = ({}) => {
  const params = useParams();
  const navigate = useNavigate();

  const { currentUser } = useAuthStatus();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    type: "",
    inStock: "",
    images: {},
    description: "",
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const docRef = doc(db, "products", params.editProductId);
      const docSnap = await getDoc(docRef);

      setProduct({
        data: docSnap.data(),
        id: docSnap.id,
      });
      setLoading(false);
      if (product) {
        setFormData({
          name: product.data.name,
          price: product.data.price,
          type: product.data.type,
          inStock: product.data.inStock,
          images: {},
          description: product.data.description,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { name, price, type, inStock, images, description } = formData;

  const auth = getAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (images.length > 6) {
      setLoading(false);
      console.log("add max of 6 images");
    }

    //Store Images
    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;

        const storageRef = ref(storage, "images/" + fileName);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch(() => {
      setLoading(false);
      return;
    });

    const formDataCopy = {
      ...formData,
      imgUrls,
      updatedAt: serverTimestamp(),
    };
    delete formDataCopy.images;
    formDataCopy.sellerName = auth.currentUser.displayName;
    formDataCopy.userRef = auth.currentUser.uid;
    formDataCopy.sellerAddress = currentUser.address;

    const docRef = doc(db, "products", product.id);
    await updateDoc(docRef, formDataCopy);

    setLoading(false);
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  };

  const onMutate = (e) => {
    if (e.target.files) {
      setFormData((prevState) => ({ ...prevState, images: e.target.files }));
    }
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
      return;
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      <div>
        <form className="form-control mx-2 sm:mx-10" onSubmit={onSubmit}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Product Name</span>
            </label>
            <input
              type="text"
              placeholder="name"
              className="input w-96 input-md input-bordered"
              id="name"
              required
              onChange={onMutate}
              min="5"
              max="109"
              value={name}
            />
          </div>
          <div className="form-control w-96 ">
            <label className="label">
              <span className="label-text">Select a category</span>
            </label>
            <select
              onChange={onMutate}
              className="select select-bordered"
              id="type"
              value={type}
            >
              <option value="groceries">Groceries</option>
              <option value="gaming-tech">Gaming and Tech</option>
              <option value="electronics">Electronics</option>
            </select>
          </div>
          <div className="form-control w-96 mt-3">
            <label className="label">
              <span className="label-text">Product Price</span>
            </label>
            <input
              type="number"
              placeholder="price"
              className="input w-96 input-md input-bordered"
              id="price"
              onChange={onMutate}
              required
              max="75000000"
              value={price}
            />
          </div>
          <div className="form-control w-96 mt-3">
            <label className="label">
              <span className="label-text">Product Images</span>
            </label>
            <input
              className="formInputFile mt-1"
              type="file"
              id="images"
              onChange={onMutate}
              max="6"
              accept=".jpg,.png,.jpeg"
              multiple
              required
            />
          </div>
          <div className="form-control w-96 mt-6">
            <label className="label cursor-pointer">
              <span className="label-text font-semibold">Not In Stock</span>
              <input
                type="checkbox"
                className="toggle"
                id="inStock"
                checked={inStock}
                onChange={() => setFormData({ ...formData, inStock: !inStock })}
              />
              <span className="label-text font-semibold">In Stock</span>
            </label>
          </div>
          <textarea
            className="textarea textarea-bordered mt-3 w-96"
            placeholder="Product Description"
            onChange={onMutate}
            id="description"
            value={description}
          ></textarea>
          <button className="mt-6 btn  w-96">Update Product</button>
        </form>
      </div>
    </main>
  );
};
export default EditProduct;
