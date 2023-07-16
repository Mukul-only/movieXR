import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { formDataAction } from "../store/formData-slice";
const Checkbox = (props) => {
  const { id, name, val } = props;
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const preVal = useSelector((state) => state.formData.formData[id]);
  const { retriveDataFlag } = useSelector((state) => state.formData);
  useEffect(() => {
    if (val) setChecked(val);
  }, []);
  useEffect(() => {
    if (preVal) {
      setChecked(preVal[name]);
    }
  }, [retriveDataFlag]);
  useEffect(() => {
    dispatch(formDataAction.setFormData({ id: id, name: name, val: checked }));
  }, [checked]);
  const inputChangeHandler = (e) => {
    setChecked(e.target.checked);
  };
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center justify-center">
        <input
          type="checkbox"
          className="relative peer cursor-pointer  shrink-0 w-4 h-4 border rounded-[4px] appearance-none bg-Dark-700 border-Gray checked:bg-Gray-400 accent-primary"
          id={id}
          onChange={inputChangeHandler}
          checked={checked}
        />
        <svg
          className="absolute hidden w-3 h-3 pointer-events-none peer-checked:block"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <label
        htmlFor={id}
        className="text-sm cursor-pointer select-none text-White"
      >
        Torrent{" "}
        <span className="text-Gray-200">
          (check if download link is a torrent file)
        </span>
      </label>
    </div>
  );
};

export default Checkbox;
