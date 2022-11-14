import React from "react";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import Chart from "chart.js/auto";
import { Line, Doughnut, Bar } from "react-chartjs-2";

const Statics = ({ isLogin, isAdmin, adminId }) => {
  let data = {
    labels: ["1월", "2월", "3월", "4월", "5월", "6월"],
    datasets: [
      {
        type: "bar",
        label: "일반",
        backgroundColor: "#ead3b1",
        data: [
          35000000, 20000000, 54000000, 38000000, 50000000, 60000000, 70000000,
          80000000,
        ],
      },
      {
        type: "bar",
        label: "구독",
        backgroundColor: "#b29d82",
        data: [
          13000000, 28000000, 42000000, 61200000, 50000000, 60000000, 70000000,
          80000000,
        ],
      },
    ],
  };
  const md_data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        axis: "y",
        indexAxis: "y",
        type: "bar",
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const donut_data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        type: "doughnut",
        label: "My First Dataset",
        data: [10, 20, 30],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 3,
      },
    ],
  };

  let data2 = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        type: "line",
        label: "Dataset 1",
        borderColor: "#5e514d",
        borderWidth: 2,
        data: [1, 2, 3, 4, 5, 6],
      },
      {
        type: "line",
        label: "Dataset 2",
        borderColor: "#5e514d",
        borderWidth: 2,
        data: [6, 5, 4, 3, 2, 1],
      },
    ],
  };
  return (
    <>
      <Header isLogin={isLogin} isAdmin={isAdmin} adminId={adminId} />
      <div className="container">
        <br />
        <div style={{ display: "flex" }}>
          <div style={{ width: "50%" }}>
            월간 매출(구독/일반)
            <Line type="line" data={data} />
          </div>
          <div style={{ width: "50%" }}>
            회원 등급
            <Line type="doughnut" data={donut_data} />
          </div>
        </div>
        <br />
        <br />
        <div style={{ display: "flex" }}>
          <div style={{ width: "50%" }}>
            제품별 월간 매출
            <Bar type="bar" data={md_data} />
          </div>
          <div style={{ width: "50%" }}>
            연간 매출
            <Line type="line" data={data2} />
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default Statics;
