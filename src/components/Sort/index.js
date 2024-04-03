import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { useDispatch} from "react-redux";
import { setSort } from '../../redux/slices/posts';

export const sortList = [
  { name: "Новые", sortProperty: "createdAt" },
  { name: "Популярные", sortProperty: "viewsCount" },
];

const Sort = (value) => {
  const dispatch = useDispatch();
  const [sortValue, setValue] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const selectListItem = (obj) => {
    dispatch(setSort(obj));
  };
  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={sortValue}
        aria-label="basic tabs example"
        onChange={handleChange}
      >
        {sortList.map((obj, i) => (
          <Tab
            onClick={() => selectListItem(obj)}
            label={obj.name}
            key={i}
          />
        ))}
      </Tabs>
    </>
  );
};

export default Sort;
