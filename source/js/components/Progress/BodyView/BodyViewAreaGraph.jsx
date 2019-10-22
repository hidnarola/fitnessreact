import React, { Component } from "react";
import Table from "react-bootstrap/lib/Table";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  ResponsiveContainer
} from "recharts";
import CustomTooltip1 from "../CustomTooltip1";

class BodyViewAreaGraph extends Component {
  mounted = false;
  constructor(props) {
    super(props);
    this.state = {
      selectedView: "circumference",
      data: [
        {
          name: null,
          circumference: 40,
          reps: 24,
          sets: 24,
          averageLifted: 55
        },
        {
          name: "30/02/2019",
          circumference: 40,
          reps: 24,
          sets: 24,
          averageLifted: 55
        },
        {
          name: "09/03/2019",
          circumference: 30,
          reps: 13,
          sets: 22,
          averageLifted: 70
        },
        {
          name: "13/03/2019",
          circumference: 20,
          reps: 98,
          sets: 22,
          averageLifted: 30
        },
        {
          name: "16/03/2019",
          circumference: 27,
          reps: 39,
          sets: 20,
          averageLifted: 40
        },
        {
          name: null,
          circumference: 27,
          reps: 39,
          sets: 20,
          averageLifted: 40
        }
      ]
    };
  }
  setLabelY = (y = 280) =>
    setTimeout(() => {
      if (!this.mounted) return;
      const labels = document.querySelectorAll(
        "text.recharts-text.recharts-label"
      );
      console.warn(labels);
      labels && labels.length > 0
        ? labels.forEach(el => el.setAttribute("y", y))
        : this.setLabelY(y);
    }, 0);

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    this.setLabelY();
    const { selectedView, data } = this.state;
    return (
      <React.Fragment>
        <div
          className="exercise-area-graph"
          style={{
            width: "100%",
            height: 300,
            borderRadius: "5px",
            overflow: "hidden"
          }}
        >
          <div className="graph-sub-title">Circumference</div>
          <ResponsiveContainer style={{ background: "#d4dfe8" }}>
            <AreaChart
              data={data}
              margin={{
                top: 48,
                right: 0,
                left: 0,
                bottom: 0
              }}
              fillOpacity={1}
              style={{ background: "#d4dfe8" }}
              connectNulls={true}
            >
              <XAxis tick={false} axisLine={false} hide={true} dataKey="name" />
              <YAxis tick={false} axisLine={false} hide={true} />
              <Tooltip content={<CustomTooltip1 />} />
              <Area
                type="monotone"
                dataKey={selectedView}
                stroke="#5C7FFB"
                fill="#5C7FFB"
                fillOpacity={1}
                connectNulls={true}
                isAnimationActive={true}
                animationBegin={1}
                animationDuration={2000}
              >
                <LabelList
                  dataKey="name"
                  position="insideBottom"
                  style={{
                    fill: "#fff",
                    fontSize: "15px",
                    fontWeight: "600"
                  }}
                />
              </Area>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 exercise-graph-table">
          <Table responsive className="m-0">
            <thead>
              <tr>
                <th />
                <th>30/02/2019</th>
                <th>09/03/2019</th>
                <th>13/03/2019</th>
                <th>16/03/2019</th>
                <th>Total Change</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Circumference</td>
                <td>30 kg</td>
                <td>32 cm</td>
                <td>33 cm</td>
                <td>35 cm</td>
                <td>
                  <i className="fad fa-arrow-alt-up" /> 5 cm
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </React.Fragment>
    );
  }
}

export default BodyViewAreaGraph;
