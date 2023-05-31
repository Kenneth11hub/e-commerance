import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TableCard from "./card";
import { FIND } from "../../redux/slices/attendances";
import DTRHeader from "./header";
import { handleTimer } from "../utilities";

export default function Attendances() {
  const { token } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ attendances }) => attendances),
    [today, setToday] = useState({}),
    [days, setDays] = useState([]),
    [totalMili, setTotalMili] = useState(0),
    [month, setMonth] = useState(0),
    [year, setYear] = useState(0),
    [years, setYears] = useState([]),
    [isFirst, setIsFirst] = useState(true),
    dispatch = useDispatch(),
    { id } = useParams();

  //setting default data for today
  useEffect(() => {
    const _today = new Date();
    // console.log(_today.toLocaleTimeString());
    setIsFirst(_today.getDate() <= 15); // check cutoff
    setMonth(_today.getMonth()); //set current month as default
    setYear(_today.getFullYear()); //set current year as default
  }, []);

  //query all attendance in database per user
  useEffect(() => {
    if (id) {
      dispatch(FIND({ id, token }));
    }
  }, [id]);

  //collect all available years
  useEffect(() => {
    if (catalogs.length > 0) {
      setYears(
        Array.from(
          new Set(
            catalogs.map(catalog => new Date(catalog.createdAt).getFullYear())
          )
        )
      );
    }
  }, [catalogs]);

  //fifth
  useEffect(() => {
    setToday(new Date(year, month, 1));
  }, [year, month]);

  //sixth
  useEffect(() => {
    if (today) {
      var _today = new Date(today),
        dates = [];

      while (_today.getMonth() === month) {
        dates.push(new Date(_today));
        _today.setDate(_today.getDate() + 1);
      }

      if (isFirst) {
        setDays(dates.splice(0, 15));
      } else {
        setDays(dates.splice(15, dates.length));
      }
    }
  }, [today, isFirst]);

  //calculation of total hours per cutoff
  useEffect(() => {
    if (days.length > 0) {
      setTotalMili(
        days.reduce((total, date) => {
          const newArr = catalogs.filter(
            catalog =>
              new Date(catalog.createdAt).toDateString() === date.toDateString()
          );

          return (
            total +
            newArr.reduce(
              (subTotal, item) => {
                var ans = 0;
                if (item.out) {
                  ans =
                    new Date(`09-08-2000, ${item.out}`) -
                    new Date(`09-08-2000, ${item.in}`);
                }

                return subTotal + ans;
              },

              0
            )
          );
        }, 0)
      );
    }
  }, [days, catalogs]);

  return (
    <MDBContainer fluid style={{ fontFamily: "serif" }}>
      <DTRHeader
        month={month}
        setMonth={setMonth}
        years={years}
        year={year}
        setYear={setYear}
        setIsFirst={setIsFirst}
        isFirst={isFirst}
        totalMili={totalMili}
      />

      <MDBTable align="middle" hover responsive color="light" small bordered>
        <caption className="pt-1">Daily Time Record</caption>
        <caption className="caption-top pb-1">
          Total of&nbsp;
          <b>{handleTimer(totalMili)}</b>&nbsp;for&nbsp;
          <b>{isFirst ? "1st" : "2nd"} cutoff</b>
        </caption>
        <MDBTableHead className="text-center">
          <tr>
            <th />
            <th scope="col">Arrival</th>
            <th scope="col">Departure</th>
            <th scope="col">Hours</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {days.map((day, index) => (
            <TableCard key={`days-${index}`} item={day} />
          ))}
        </MDBTableBody>
      </MDBTable>
    </MDBContainer>
  );
}
