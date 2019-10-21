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

class ExerciseViewAreaGraph extends Component {
  mounted = false;
  constructor(props) {
    super(props);
    this.state = {
      selectedView: "weightLifted",
      data: [
        {
          name: null,
          weightLifted: 40,
          reps: 24,
          sets: 24,
          averageLifted: 55
        },
        {
          name: "30/10/2000",
          weightLifted: 40,
          reps: 24,
          sets: 24,
          averageLifted: 55
        },
        {
          name: "30/10/2000",
          weightLifted: 30,
          reps: 13,
          sets: 22,
          averageLifted: 70
        },
        {
          name: "30/10/2000",
          weightLifted: 20,
          reps: 98,
          sets: 22,
          averageLifted: 30
        },
        {
          name: "30/10/2000",
          weightLifted: 27,
          reps: 39,
          sets: 20,
          averageLifted: 40
        },
        {
          name: null,
          weightLifted: 27,
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
          <div className="serving-select">
            <select
              className="form-control"
              onChange={e => this.setState({ selectedView: e.target.value })}
            >
              <option value="weightLifted">Weight Lifted</option>
              <option value="reps">Reps</option>
              <option value="sets">Sets</option>
              <option value="averageLifted">Average Lifted</option>
            </select>
          </div>
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
              <Tooltip />
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
                <th>19/10/2019</th>
                <th>19/10/2019</th>
                <th>19/10/2019</th>
                <th>19/10/2019</th>
                <th>Total Change</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Weight Lifted</td>
                <td>800 kg</td>
                <td>800 kg</td>
                <td>800 kg</td>
                <td>800 kg</td>
                <td>
                  <i className="fad fa-arrow-alt-up" /> 10 kg
                </td>
              </tr>
              <tr>
                <td>Reps</td>
                <td>800 kg</td>
                <td>800 kg</td>
                <td>800 kg</td>
                <td>800 kg</td>
                <td>
                  <i className="fad fa-arrow-alt-down" /> 10 kg
                </td>
              </tr>
              <tr>
                <td>Sets</td>
                <td>800 kg</td>
                <td>800 kg</td>
                <td>800 kg</td>
                <td>800 kg</td>
                <td>
                  <i className="fad fa-arrow-alt-up" /> 10 kg
                </td>
              </tr>
              <tr>
                <td>Average Lifted</td>
                <td>800 kg</td>
                <td>800 kg</td>
                <td>800 kg</td>
                <td>800 kg</td>
                <td>
                  <i className="fad fa-arrow-alt-down" /> 10 kg
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </React.Fragment>
    );
  }
}

export default ExerciseViewAreaGraph;
