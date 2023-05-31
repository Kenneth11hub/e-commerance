import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { handleTimer } from "../../utilities";

export default function TableCard({ item }) {
  const { catalogs } = useSelector(({ attendances }) => attendances),
    [attendances, setAttendances] = useState([]),
    [total, setTotal] = useState(0);

  useEffect(() => {
    if (catalogs.length > 0) {
      const newArr = catalogs.filter(
        catalog =>
          new Date(catalog.createdAt).toDateString() === item.toDateString()
      );

      setAttendances(newArr);

      setTotal(
        newArr.reduce(
          (total, item) => {
            var ans = 0;

            if (item.out) {
              ans =
                new Date(`09-08-2000, ${item.out}`) -
                new Date(`09-08-2000, ${item.in}`);
            }

            return total + ans;
          },

          0
        )
      );
    }
  }, [item, catalogs]);

  return (
    <tr className="text-center">
      <td title={item.toDateString()}>{item.getDate()}</td>
      {["in", "out"].map((time, tIndex) => (
        <td title={`time-${time}`} key={`${time}-${tIndex}`}>
          {attendances?.map((attendance, index) =>
            attendance[time] ? (
              <p key={`${time}-${index}`} className="mb-0">
                {attendance[time]}
              </p>
            ) : (
              "-"
            )
          )}
        </td>
      ))}
      <td title="Accumulated time">{handleTimer(total)}</td>
    </tr>
  );
}
