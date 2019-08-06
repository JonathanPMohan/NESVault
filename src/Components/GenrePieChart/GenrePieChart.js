import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Cell, Legend,
} from 'recharts';

import collectionRequests from '../../helpers/Data/collectionRequests';
import userRequests from '../../helpers/Data/userRequests';
import authRequests from '../../helpers/Data/authRequests';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class Example extends PureComponent {
  //   static jsfiddleUrl = 'https://jsfiddle.net/alidingling/c9pL8k61/';
  state = {
    myCartsGenres: [],
    filteredMyCartsGenres: [],
    currentUserObj: {},
    adventureTally: 0,
    sportsTally: 0,
  };

  getCollectionByGenre = () => {
    const userDbId = this.state.currentUserObj.id;
    let adventureTally = 0;
    let puzzleTally = 0;
    let sportsTally = 0;
    let rpgTally = 0;
    let fightingTally = 0;

    collectionRequests
      .getAllMyCartsGenres(userDbId)
      .then((myCartsGenres) => {
        myCartsGenres.forEach((cart) => {
          if (cart.genre === 'Action/Adventure') {
            adventureTally += 1;
          } else if (cart.genre === 'Puzzle') {
            puzzleTally += 1;
          } else if (
            cart.genre === 'Sports'
            || cart.genre === 'Football'
            || cart.genre === 'Basketball'
            || cart.genre === 'Racing'
            || cart.genre === 'Baseball'
            || cart.genre === 'Wrestling'
          ) {
            sportsTally += 1;
          } else if (cart.genre === 'RPG') {
            rpgTally += 1;
          } else if (cart.genre === 'Fighting') {
            fightingTally += 1;
          }
        });
        this.setState({ myCartsGenres });
        this.setState({ filteredMyCartsGenres: myCartsGenres });
        this.setState({ adventureTally });
        this.setState({ sportsTally });
        this.setState({ rpgTally });
        this.setState({ puzzleTally });
        this.setState({ fightingTally });
      })
      .catch((err) => {
        console.error('error with NESVault Collection Genre GET', err);
      });
  };

  componentDidMount() {
    const currentUid = authRequests.getCurrentUid();
    userRequests.getUserByFbId(currentUid).then((response) => {
      this.setState({
        currentUserObj: response,
      });
      this.getCollectionByGenre();
    });
  }

  render() {
    const data = [
      { name: 'Action/Adventure', value: this.state.adventureTally },
      { name: 'Sports', value: this.state.sportsTally },
      { name: 'RPG', value: this.state.rpgTally },
      { name: 'Puzzle', value: this.state.puzzleTally },
      { name: 'Fighting', value: this.state.fightingTally },
    ];

    return (
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
        {/* <PieChart name="Group A" data={data} fill="#8884d8" line shape="cross" /> */}
      </PieChart>
    );
  }
}

// export default GenrePieChart;
