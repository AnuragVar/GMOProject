import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface SubDepartment {
  name: string;
  checked: boolean;
}

interface Department {
  name: string;
  checked: boolean;
  sub_departments: SubDepartment[];
}

const jsonData: Department[] = [
  {
    name: "customer_service",
    checked: false,
    sub_departments: [
      { name: "support", checked: false },
      { name: "customer_success", checked: false },
    ],
  },
  {
    name: "design",
    checked: false,
    sub_departments: [
      { name: "graphic_design", checked: false },
      { name: "product_design", checked: false },
      { name: "web_design", checked: false },
    ],
  },
];

const SecondComponent: React.FC = () => {
  const [items, setItems] = useState<Department[]>(jsonData);

  function isEqual(arr1: any[], arr2: any[]): boolean {
    // Check if arrays have the same length
    if (arr1.length !== arr2.length) {
      return false;
    }

    // Check if each corresponding object in both arrays is equal
    for (let i = 0; i < arr1.length; i++) {
      if (JSON.stringify(arr1[i]) !== JSON.stringify(arr2[i])) {
        return false;
      }
    }

    return true;
  }
  // Effect to update department checkbox based on sub-departments
  useEffect(() => {
    // Calculate updated items based on current state
    const updatedItems = items.map((dept) => ({
      ...dept,
      checked: dept.sub_departments.every((sd) => sd.checked),
    }));

    // Only update state if there's a change to prevent infinite loop
    if (!isEqual(updatedItems, items)) {
      setItems(updatedItems);
    }
  }, [items]);

  const handleChange1 =
    (index: number, subIndex: number) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const updatedItems = [...items];
      updatedItems[index].sub_departments[subIndex] = {
        ...updatedItems[index].sub_departments[subIndex],
        checked: e.target.checked,
      };
      setItems(updatedItems);
    };

  const handleChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const updatedItems = [...items];
      updatedItems[index] = {
        ...updatedItems[index],
        checked: e.target.checked,
        sub_departments: updatedItems[index].sub_departments.map((sd) => ({
          ...sd,
          checked: e.target.checked,
        })),
      };
      setItems(updatedItems);
    };

  return (
    <div>
      <h1 className="text-3xl p-5 font-bold">Second Component -</h1>
      {items.map((data, index) => (
        <div key={index} className="flex items-start">
          <Checkbox checked={data.checked} onChange={handleChange(index)} />
          <Accordion className="w-full">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index + 1}-content`}
              id={`panel${index + 1}-header`}
            >
              <Typography>{data.name}</Typography>
            </AccordionSummary>
            <AccordionDetails className="flex flex-col gap-2">
              {data.sub_departments.map((sd, subIndex) => (
                <FormControlLabel
                  key={subIndex}
                  control={
                    <Checkbox
                      checked={sd.checked}
                      onChange={handleChange1(index, subIndex)}
                    />
                  }
                  label={`${sd.name}`}
                />
              ))}
            </AccordionDetails>
          </Accordion>
        </div>
      ))}
    </div>
  );
};

export default SecondComponent;
